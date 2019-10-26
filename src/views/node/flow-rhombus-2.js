/**
 * Created by linqiang on 2019/5/15.
 */
import G6 from '@antv/g6';
import Global from '../global';
import base from './base';
const { mix } = G6.Util;
const { nodeFlowRhombus } = Global;
export default [
    mix({}, base, {
        drawShape (cfg, group) {
            const shapeType = this.shapeType;
            const shapeCfg = this.getShapeStyle(cfg);
            const shape = group.addShape(shapeType, {
                attrs: shapeCfg
            });
            shape.scale(0.8);
            shape.rotate(Math.PI / 4);
            return shape;
        },
        getShapeStyle (cfg) {
            const { style } = nodeFlowRhombus;
            const size = cfg.size || style.size;
            const width = size[0];
            const height = size[1];
            return mix({}, style, {
                x: 0 - width / 2, // 节点的位置在上层确定，所以这里仅使用相对位置即可
                y: 0 - height / 2,
                width,
                height
            }, cfg.style);
        },
        getAnchorPoints () {
            return [
                [0.5, 0], [0, 0.5], [1, 0.5], [0.5, 1]
            ];
        }
    }), 'rect'];
