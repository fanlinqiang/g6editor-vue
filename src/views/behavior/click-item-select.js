import G6 from '@antv/g6';
import { getItemByState } from '../utils/index';
const { each } = G6.Util;

export default {
    getDefaultCfg () {
        return {
            multiple: true,
            keyCode: 17
        };
    },
    getEvents () {
        return {
            'node:click': 'onClick',
            'edge:click': 'onClick',
            'canvas:click': 'onCanvasClick',
            keyup: 'onKeyUp',
            keydown: 'onKeyDown'
        };
    },
    onClick (e) {
        const self = this;
        let { item } = e;
        // let itemType = item.getType(); // node | edge
        const graph = self.graph;
        const autoPaint = graph.get('autoPaint');
        graph.setAutoPaint(false);
        if (!self.keydown || !self.multiple) {
            const selected = getItemByState({ graph });
            each(selected, i => {
                if (i !== item) {
                    graph.setItemState(i, 'selected', false);
                }
            });
        }
        let selected = item.hasState('selected');
        if (selected) {
            if (self.shouldUpdate(e)) {
                graph.setItemState(item, 'selected', false);
            }
            graph.emit('itemSelectChange', { target: item, select: false });
        } else {
            if (self.shouldUpdate.call(e)) {
                graph.setItemState(item, 'selected', true);
            }
            graph.emit('itemSelectChange', { target: item, select: true });
        }
        graph.setAutoPaint(autoPaint);
        graph.paint();
    },
    onCanvasClick () {
        const graph = this.graph;
        const autoPaint = graph.get('autoPaint');
        graph.setAutoPaint(false);
        const selected = getItemByState({ graph });
        each(selected, i => {
            graph.setItemState(i, 'selected', false);
        });
        graph.paint();
        graph.setAutoPaint(autoPaint);
    },
    onKeyDown (e) {
        const code = e.keyCode || e.which;
        if (code === this.keyCode) {
            this.keydown = true;
        } else {
            this.keydown = false;
        }
    },
    onKeyUp () {
        this.keydown = false;
    }
};
