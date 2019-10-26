<template lang="pug">
    .item-detail-wrapper
        .details-row
            .details-col 标签：
            .details-col
                el-input(v-model="edge.label", @change="handleConfirmLabel")
        .details-row.mt-10
            .details-col 样式：
            .details-col.mt-10
                el-select(v-model="edge.shape", @change="handleChangeShape")
                    el-option(v-for="item in typeList", :value="item.value", :key="item.value", :label="item.label")
</template>

<script>
import _ from 'lodash';
import edges from '../../../edge/index';
const Definition = {
    label: '',
    shape: ''
};
export default {
    props: {
        item: {
            type: Object,
            default: () => ({})
        },
        graph: {
            type: Object,
            default: () => null
        }
    },
    components: {},
    data () {
        return {
            edge: {},
            typeList: edges
        };
    },
    mounted () {
        this.init();
    },
    methods: {
        init (val) {
            let item = val || this.item;
            let model = _.assign({}, Definition, item.getModel());
            this.edge = model;
        },
        handleConfirmLabel (val) {
            this.graph.update(this.item, {
                label: _.trim(val)
            });
        },
        handleChangeShape () {
            let { shape } = this.edge;
            this.graph.update(this.item, {
                shape
            });
        }
    },
    computed: {

    },
    filters: {

    },
    watch: {
        item (val) {
            this.init(val);
        }
    }
};
</script>

<style lang="sass" scoped>
    @import "item-detail"
</style>
