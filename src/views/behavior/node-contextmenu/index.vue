<template lang="pug">
ul.node-context-menu(:style="wrapStyle")
    li.menu-item(@click="handleDelete")
        i.el-icon-delete
        span 删除
    li.menu-item(@click="handleToBack")
        i.el-icon-document-remove
        span 置底
    li.menu-item(@click="handleToFront")
        i.el-icon-document-add
        span 置顶

</template>

<script>
import _ from 'lodash';
export default {
    props: {
        graph: {

        }
    },
    components: {},
    data () {
        return {
            wrapStyle: {
                left: 0,
                top: 0,
                'z-index': -1
            },
            node: null
        };
    },
    created () {
        this.graph.on('handleOpenNodeContextmenu', this.handleOpenNodeContextmenu);
        this.graph.on('handleCloseNodeContextmenu', this.handleCloseNodeContextmenu);
    },
    beforeDestroy () {
        this.graph.off('handleOpenNodeContextmenu', this.handleOpenNodeContextmenu);
        this.graph.off('handleCloseNodeContextmenu', this.handleCloseNodeContextmenu);
    },
    mounted () {
        this.init();
    },
    methods: {
        init () {

        },
        handleOpenNodeContextmenu ({ position, item }) {
            _.assign(this.wrapStyle, position, { 'z-index': 999 });
            this.node = this.graph.findById(item.getModel().id);
        },
        handleCloseNodeContextmenu () {
            _.assign(this.wrapStyle, { 'z-index': -1 });
            this.node = null;
        },
        handleDelete () {
            this.graph.remove(this.node);
            this.handleCloseNodeContextmenu();
        },
        handleToBack () {
            this.node && this.node.toBack();
            _.assign(this.wrapStyle, { 'z-index': -1 });
        },
        handleToFront () {
            this.node && this.node.toFront();
            _.assign(this.wrapStyle, { 'z-index': -1 });
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
.node-context-menu
    position: absolute
    list-style: none
    padding: 10px 5px
    left: -100px
    background: #ffffff
    border-radius: 4px
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15)
    .menu-item
        display: flex
        align-items: center
        justify-content: center
        padding: 5px 12px
        cursor: pointer
        transition: all 0.3s
        user-select: none
        span
            margin-left: 10px

</style>
