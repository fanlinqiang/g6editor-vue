/**
 * Created by linqiang on 2019/7/25.
 */
export default {
    getDefaultCfg () {
        return {

        };
    },
    getEvents () {
        return {
            'node:contextmenu': 'contextmenu',
            'node:mouseleave': 'mouseleave'
        };
    },
    contextmenu (ev) {
        let { canvasX, canvasY, item } = ev;
        let position = {
            left: canvasX + 'px',
            top: canvasY + 'px'
        };
        this.graph.emit('handleOpenNodeContextmenu', { position, item });
    },
    mouseleave () {
        this.graph.emit('handleCloseNodeContextmenu');
    }

};
