/**
 * Created by linqiang on 2019/5/15.
 */
import { getNearestPoint } from '../utils/index';
// import _ from 'lodash';
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
            'node:dblclick': 'onClick',
            'mousemove': 'onMousemove',
            keydown: 'onKeyDown'
        };
    },
    onClick (ev) {
        const node = ev.item;
        const graph = this.graph;
        const point = { x: ev.x, y: ev.y };
        // let model = _.get(node, '_cfg.model');
        let model = node.getModel();
        /* try {
            model = _.get(node, '_cfg.model');
        } catch (e) {
            model = node.getModel();
        } */
        // 如果在添加边的过程中，再次点击另一个节点，结束边的添加
        if (this.addingEdge && this.edge && !this.edge.destroyed) {
            let { id: target } = model;
            let { source } = this.edge.getModel();
            if (target === source) { // 不允许自闭环，删除这条边
                graph.remove(this.edge);
            } else { // 否则添加边
                graph.updateItem(this.edge, {
                    target,
                    targetAnchor: this.getNearestAuchorPointIndex(node, point)
                });
            }
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
    onMousemove (ev) {
        const point = { x: ev.x, y: ev.y };
        if (this.addingEdge && this.edge) {
            // 增加边的过程中，移动时边跟着移动
            this.graph.updateItem(this.edge, {
                target: point
            });
        }
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
