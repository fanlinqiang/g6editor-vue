<template lang="pug">
.detail-panel-detail
    NodeDetail(:item="item", :graph="graph", v-if="type === 'node'")
    EdgeDetail(:item="item", :graph="graph", v-else-if="type === 'edge'")
</template>

<script>
import NodeDetail from './node-detail.vue';
import EdgeDetail from './edge-detail.vue';
export default {
    props: {
        graph: {
            type: Object,
            default: () => null
        }
    },
    components: { NodeDetail, EdgeDetail },
    data () {
        return {
            item: null
        };
    },
    created () {
        this.graph.on('itemSelectChange', this.handleItemSelectChange);
        this.graph.on('deleteItem', this.handleItemIsDestory);
    },
    beforeDestroy () {
        this.graph.off('itemSelectChange', this.handleItemSelectChange);
        this.graph.off('deleteItem', this.handleItemIsDestory);
    },
    mounted () {
        this.init();
    },
    methods: {
        init () {

        },
        handleItemSelectChange ({ target, select }) {
            this.item = select ? target : null;
        },
        handleItemIsDestory () {
        }
    },
    computed: {
        type () {
            let { item } = this;
            if (!item || item.destroyed) {
                return null;
            }
            return item && item.getType();
        }
    },
    filters: {

    },
    watch: {
    }
};
</script>

<style lang="sass" scoped>

</style>
