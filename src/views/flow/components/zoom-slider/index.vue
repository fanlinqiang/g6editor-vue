<template lang="pug">
.mini-map-slider
    el-slider(v-model="slider.value", :show-tooltip="false", @change="handleChange")
</template>

<script>
export default {
    props: {
        graph: {

        }
    },
    components: {},
    data () {
        return {
            slider: {
                value: 0,
                minZoom: 0,
                maxZoom: 100
            }
        };
    },
    created () {
        this.graph.on('wheelzoom', this.initSliderValue);
        this.graph.on('fitView', this.initSliderValue);
    },
    beforeDestroy () {
        this.graph.off('wheelzoom', this.initSliderValue);
        this.graph.off('fitView', this.initSliderValue);
    },
    mounted () {
        this.init();
    },
    methods: {
        init () {
            let graph = this.graph;
            let minZoom = graph.get('minZoom');
            let maxZoom = graph.get('maxZoom');
            Object.assign(this.slider, {
                minZoom,
                maxZoom
            });
            this.initSliderValue();
        },
        initSliderValue () {
            let { graph, slider: { minZoom, maxZoom } } = this;
            this.slider.value = Math.max((graph.getZoom() - minZoom) / (maxZoom - minZoom) * 100, 0);
        },
        format () {
            return null;
        },
        handleChange () {
            let graph = this.graph;
            let { value, minZoom, maxZoom } = this.slider;
            let currZoom = graph.getZoom();
            let ratio = (value / 100) * (maxZoom - minZoom) / currZoom; // 放大缩小的比例
            const canvas = graph.get('canvas');
            const width = graph.get('width');
            const height = graph.get('height');
            const point = { x: width / 2, y: height / 2 }; // 取画布中点作为需要放大的位置
            const pixelRatio = canvas.get('pixelRatio');
            const zoom = ratio * currZoom;
            if (zoom > maxZoom || zoom < minZoom) {
                return;
            }
            graph.zoom(ratio, { x: point.x / pixelRatio, y: point.y / pixelRatio });
            graph.paint();
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
.mini-map-slider
    padding: 0px 10px
    background-color: #fafafa
    .ivu-slider-button-wrap
        top: -7px
</style>
