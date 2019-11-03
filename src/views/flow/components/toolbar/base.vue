<template lang="pug">
.toolbar-item-wrapper(@click="$emit('click')")
    el-tooltip(:content="tooltip", placement="bottom", v-if="tooltip")
        i(:class="[icon]")
    i(:class="[icon]", v-else)
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            default: ''
        },
        tooltip: {
            type: String,
            default: ''
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
.toolbar-item-wrapper
    i
        display: inline-block
        font-size: 20px
        width: 27px
        height: 27px
        margin: 0 6px
        padding-top: 6px
        text-align: center
        border: 1px solid #fff
        cursor: pointer
</style>
