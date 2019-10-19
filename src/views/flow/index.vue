<template lang="pug">
.editor-wrapper
    .layout-header
        //Toolbar(:graph="graph", v-if="graph")
    .layout-body
        .layout-body-left
            //ItemPanel
        .layout-body-center
            .draw-content#draw-content(ref="draw-content")
        .layout-body-right
            .detail-wrap
                .detail-title 详情
                .detail-container
            .mini-map-wrap
                .mini-map-title 缩略图
                .mini-map-container(ref="mini-map")
</template>
<script>
export default {
    data () {
        return {

        };
    }
};
</script>
<style lang="sass">
    @import "./css/_index"
</style>
