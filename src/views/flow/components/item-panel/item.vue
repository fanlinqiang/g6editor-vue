<template lang="pug">
li.shape-item(draggable, ref="shape")
    img(:src="getIcon(item.icon)")
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    },
    components: {},
    data () {
        return {};
    },
    mounted () {
        this.init();
    },
    methods: {
        init () {
            let dom = this.$refs['shape'];
            dom.ondragstart = this.handleDragStart;
            dom.ondragend = this.handleDragEnd;
        },
        handleDragStart (ev) {
            ev.dataTransfer.setData('info', encodeURIComponent(JSON.stringify(this.item)));
        },
        handleDragEnd (ev) {
            ev.dataTransfer.clearData('info');
            return false;
        },
        getIcon (name) {
            return require(`./images/${name}`);
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
.shape-item
    width: 100%
    cursor: pointer
    margin-bottom: 16px
    position: relative
    text-align: center
    &:hover
        background-color: #f0f2f2
    img
        width: 100px
</style>
