<template lang="pug">
ul.item-panel-wrapper
    Item(v-for="(item, index) in items", :item="item", :key="index")
</template>

<script>
import Item from './item.vue';
export default {
    props: {},
    components: { Item },
    data () {
        return {
            items: [
                {
                    icon: 'start.svg',
                    type: 'node',
                    label: 'start',
                    shape: 'flow-circle'
                }, {
                    icon: 'decision.svg',
                    type: 'node',
                    label: 'decision',
                    shape: 'flow-rhombus'
                }, {
                    icon: 'normal.svg',
                    type: 'node',
                    label: 'normal',
                    shape: 'flow-rect'
                }, {
                    icon: 'model.svg',
                    type: 'node',
                    label: 'model',
                    shape: 'flow-ellipse'
                }
            ]
        };
    },
    mounted () {
        this.init();
    },
    methods: {
        init () {

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
.item-panel-wrapper
    display: flex
    flex-direction: column
    align-items: center
    padding: 24px 0
</style>
