<template lang="pug">
.toolbar-wrapper
    Base(v-for="(item,index) in commands",
        :key="index",
        :icon="item.icon",
        :tooltip="item.tooltip",
        @click="item.click")
</template>

<script>
import Base from './base.vue';
import { getItemByState } from '../../../utils/index';
import G6 from '@antv/g6';
import _ from 'lodash';
const { Util: { modifyCSS } } = G6;
export default {
    props: {
        graph: {
            type: Object,
            default: () => (null)
        }
    },
    components: { Base },
    data () {
        return {
            commands: [
                {
                    name: 'delete',
                    icon: 'el-icon-delete',
                    tooltip: '删除',
                    click: () => {
                        this.handleCommand((selected, graph) => {
                            selected.forEach((item) => {
                                graph.remove(item);
                            });
                            graph.emit('deleteItem', selected);
                        });
                    }
                }, {
                    name: 'fit-map',
                    icon: 'el-icon-full-screen',
                    tooltip: '适应画布',
                    click: () => {
                        this.graph.fitView(); // 令画布内容适应视口。
                        this.graph.emit('fitView');
                    }
                },
                {
                    name: 'download-image', // 将当前画布内容生成图片后保存到本地
                    icon: 'el-icon-camera',
                    tooltip: '生成图片',
                    click: () => {
                        this.graph.downloadImage('' + (new Date()).getTime()); // 令画布内容适应视口。
                    }
                }, {
                    name: 'to-bottom',
                    icon: 'el-icon-document-remove',
                    tooltip: '置底',
                    click: () => {
                        this.handleCommand((selected) => {
                            selected.forEach((item) => {
                                item.toBack();
                            });
                        });
                    }
                }, {
                    name: 'to-top',
                    icon: 'el-icon-document-add',
                    tooltip: '置顶',
                    click: () => {
                        this.handleCommand((selected) => {
                            selected.forEach((item) => {
                                item.toFront();
                            });
                        });
                    }
                }, {
                    name: 'clear',
                    icon: 'el-icon-circle-close',
                    tooltip: '清空',
                    click: () => {
                        this.handleCommand((selected, graph) => {
                            graph.clear();
                        });
                    }
                }, {
                    name: 'grid',
                    icon: 'el-icon-s-grid',
                    tooltip: '网格',
                    click: () => {
                        this.handleCommand((selected, graph) => {
                            let grid = _.get(graph, '_cfg.plugins[1]._cfgs.container');
                            if (grid) {
                                modifyCSS(grid, {
                                    display: grid.style['display'] === 'none' ? 'block' : 'none'
                                });
                            }
                        });
                    }
                }

            ]
        };
    },
    mounted () {
        this.init();
    },
    methods: {
        init () {

        },
        // 处理命令
        handleCommand (callback, state = 'selected') {
            let graph = this.graph;
            let selected = getItemByState({ graph, state });
            const autoPaint = graph.get('autoPaint');
            graph.setAutoPaint(false);
            callback(selected, graph);
            graph.setAutoPaint(autoPaint);
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

<style lang="sass" scoped>
.toolbar-wrapper
    display: flex
    align-items: center
</style>
