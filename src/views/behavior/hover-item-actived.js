/**
 * Created by linqiang on 2019/5/15.
 */
import G6 from '@antv/g6';
const { each } = G6.Util;

export default {
    getDefaultCfg () {
        return {};
    },
    getEvents () {
        return {
            'node:mouseenter': 'onMouseEnter',
            'node:mouseleave': 'onMouseLeave',
            'edge:mouseenter': 'onMouseEnter',
            'edge:mouseleave': 'onMouseLeave'
        };
    },
    onMouseEnter (e) {
        const self = this;
        const item = e.item;
        const graph = self.graph;
        const autoPaint = graph.get('autoPaint');
        graph.setAutoPaint(false);
        if (!self.keydown || !self.multiple) {
            const nodes = graph.findAllByState('node', 'hoverActive');
            each(nodes, node => {
                if (node !== item) {
                    graph.setItemState(node, 'hoverActive', false);
                }
            });
        }
        if (item.hasState('nodeHoverActive')) {
            if (self.shouldUpdate(e)) {
                graph.setItemState(item, 'hoverActive', false);
            }
            // graph.emit('itemhoverchange', { target: item, hover: false });
        } else {
            if (self.shouldUpdate(e)) {
                graph.setItemState(item, 'hoverActive', true);
            }
            // graph.emit('itemhoverchange', { target: item, hover: true });
        }
        graph.setAutoPaint(autoPaint);
        graph.paint();
    },
    onMouseLeave (e) {
        const self = this;
        const item = e.item;
        const graph = self.graph;
        graph.setItemState(item, 'hoverActive', false);
    }
};
