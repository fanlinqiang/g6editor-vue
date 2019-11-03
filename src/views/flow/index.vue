<template lang="pug">
.editor-wrapper
    .layout-header
        Toolbar(:graph="graph", v-if="graph")
    .layout-body
        .layout-body-left
            ItemPanel
        .layout-body-center
            .draw-content#draw-content(ref="draw-content")
            NodeContextMenu(:graph="graph", v-if="graph")
        .layout-body-right
            .detail-wrap
                .detail-title 详情
                .detail-container
                    DetailPanel(:graph="graph", v-if="graph")
            .mini-map-wrap
                .mini-map-title 缩略图
                .mini-map-container(ref="mini-map")
                ZoomSlider(:graph="graph", v-if="graph")
</template>
<script>
import _ from 'lodash';
import Flow from './flow';
import Minimap from '@antv/g6/build/minimap';
import Grid from '../plugins/grid/index';
import elementResizeDetectorMaker from 'element-resize-detector';
import ItemPanel from './components/item-panel';
import NodeContextMenu from '../behavior/node-contextmenu/index.vue';
import DetailPanel from './components/detail-panel/index.vue';
import ZoomSlider from './components/zoom-slider/index.vue';
import Toolbar from './components/toolbar/index.vue';
export default {
    components: {
        ItemPanel,
        NodeContextMenu,
        DetailPanel,
        ZoomSlider,
        Toolbar
    },
    data () {
        return {
            graph: null,
            observer: elementResizeDetectorMaker(),
            throttled: null
        };
    },
    mounted () {
        this.init();
    },
    beforeDestroy () {
        this.observer.removeListener(this.$refs['draw-container'], this.handleChangeGraphSize);
        this.graph.destroy();
    },
    methods: {
        init () {
            this.initGraph({});
            this.initDebounce();
        },
        initGraph (data) {
            let plugins = this.initPlugin();
            let container = this.$refs['draw-content'];
            let { width, height } = this.getDomSize(container);
            let graph = new Flow.Graph({
                container,
                width,
                height,
                pixelRatio: window.devicePixelRatio,
                fitView: false, // 是否在初次渲染时将整个图适应画布缩放
                modes: { // 支持的 behavior
                    default: ['zoomGraph', 'drag-canvas', 'dragNodeMove', 'clickAddEdge', 'hoverItemActived', /* 'activate-relations', *//* 'click-anchor-add-edge', */'clickItemSelect', 'nodeContextMenu'],
                    drag: []
                },
                plugins
            });
            graph.data(data);
            graph.render();
            this.graph = graph;
            this.initDragAdd(container, graph);
        },
        // 初始化拖拽添加图形
        initDragAdd (container, graph) {
            container.ondragover = (ev) => {
                ev.preventDefault();
            };
            // 添加图形
            container.ondrop = (ev) => {
                let info = ev.dataTransfer.getData('info');
                if (info) {
                    info = JSON.parse(decodeURIComponent(info));
                    let { type, shape, label } = info;
                    let { clientX, clientY } = ev;
                    graph.add(type, _.assign({
                        x: 100,
                        y: 100,
                        shape,
                        label,
                        id: 'node_' + (new Date()).getTime()
                    }, graph.getPointByClient(clientX, clientY)));
                }
            };
        },
        // 初始化画布随窗口大小自适应
        initDebounce () {
            this.debounce = () => {
                this.timer && clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    let dom = this.$refs['draw-content'];
                    let { width } = this.getDomSize(dom);
                    let { height } = this.getDomSize(dom.querySelector('canvas'));
                    this.graph.changeSize(width, height);
                }, 100);
            };
            this.observer.listenTo(this.$refs['draw-content'], this.debounce);
        },
        // 初始化mini map
        initPlugin () {
            let container = this.$refs['mini-map'];
            let { width, height } = this.getDomSize(container);
            return [
                new Minimap({ container, size: [width, height] }),
                new Grid()
            ];
        },
        getDomSize (root) {
            return {
                width: (() => {
                    let stl = root.currentStyle || document.defaultView.getComputedStyle(root);
                    return ((root.clientWidth || parseInt(stl.width, 10)) - parseInt(stl.paddingLeft, 10) - parseInt(stl.paddingRight, 10)).toFixed(0) - 0;
                })(),
                height: (() => {
                    let stl = root.currentStyle || document.defaultView.getComputedStyle(root);
                    return ((root.clientHeight || parseInt(stl.height, 10)) - parseInt(stl.paddingTop, 10) - parseInt(stl.paddingBottom, 10)).toFixed(0) - 0;
                })()
            };
        },
        getXmindData () {
            let { edges, nodes } = this.graph.save();
            edges = _.flatMap(edges, (edge) => {
                return _.pick(edge, ['source', 'target', 'shape', 'sourceAnchor', 'label', 'targetAnchor']);
            });
            return { edges, nodes };
        }
    },
    computed: {

    },
    filters: {

    },
    watch: {

    }
};
</script>
<style lang="sass">
    @import "./css/_index"
</style>
