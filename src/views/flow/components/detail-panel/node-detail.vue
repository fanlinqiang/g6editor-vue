<template lang="pug">
.item-detail-wrapper
    .details-row.row
        .details-col 大小：
        .details-col
            el-button-group
                el-button(type="primary", size="mini", icon="el-icon-minus", @click="handleResizeItem(-1)")
                el-button(type="primary", size="mini", icon="el-icon-plus", @click="handleResizeItem(1)")
    .details-row.mt-10
        .details-col 标签：
        .details-col.mt-10
            el-input(v-model="node.label", @change="handleConfirmLabel")
</template>

<script>
import _ from 'lodash';
const Definition = {
    label: '',
    size: ''
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
            node: _.cloneDeep(Definition),
            rules: {
                loading: false,
                none: false,
                data: []
            }
        };
    },
    created () {
        this.init();
    },
    mounted () {

    },
    methods: {
        init (val) {
            let item = val || this.item;
            let model = _.assign({}, Definition, item.getModel());
            if (!model.size) {
                model.size = this.item.getKeyShape().size;
            }
            this.node = model;
        },
        handleConfirmLabel (val) {
            this.graph.update(this.item, _.assign(this.node, {
                label: _.trim(val)
            }));
        },
        handleResizeItem (symbol) {
            let { size } = this.node;
            size = size.map((item) => {
                return item + (symbol * 2);
            });
            this.node.size = size;
            const graph = this.graph;
            const autoPaint = graph.get('autoPaint');
            graph.setAutoPaint(false);
            graph.update(this.item, {
                size
            });
            this.item.getKeyShape().init();
            graph.setAutoPaint(autoPaint);
            graph.paint();
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
