/**
 * Created by linqiang on 2019/5/15.
 */
import { getNearestPoint } from '../utils/index';
export default {
    getDefaultCfg () {
        return {
            keyCode: 27,
            edge: null,
            addingEdge: false
        };
    },
    getEvents () {
        return {
            // 'node:click': 'onClick',
            'anchor:mousemove': 'onMousemove',
            'click': 'onAnchorClick',
            keydown: 'onKeyDown'
        };
    },
    onAnchorClick () {
    },
    onClick (ev) {
        const node = ev.item;
        const graph = this.graph;
        const point = { x: ev.x, y: ev.y };
        const model = node.getModel();
        // 如果在添加边的过程中，再次点击另一个节点，结束边的添加
        if (this.addingEdge && this.edge) {
            graph.updateItem(this.edge, {
                target: model.id,
                targetAnchor: this.getNearestAuchorPointIndex(node, point)
            });
            this.edge = null;
            this.addingEdge = false;
        } else {
            // 点击节点，触发增加边
            this.edge = graph.addItem('edge', {
                source: model.id,
                sourceAnchor: this.getNearestAuchorPointIndex(node, point),
                target: point,
                shape: 'flow-spline'
            });
            this.addingEdge = true;
        }
    },
    onMousemove () {

    },
    // 获取当前连接节点最近的锚点索引
    getNearestAuchorPointIndex (node, point) {
        const anchorPoints = node.getAnchorPoints();
        return getNearestPoint(anchorPoints, point).index;
    },
    onKeyDown (e) {
        const code = e.keyCode || e.which;
        if (code === this.keyCode && this.addingEdge) {
            this.graph.remove(this.edge);
        }
    }
};
