/**
 * Created by linqiang on 2019/5/15.
 */
import G6 from '@antv/g6';
import base from './base';
const { mix } = G6.Util;
export default [
    mix({}, base, {
        drawShape (cfg, group) {
            const shapeType = this.shapeType;
            const shapeCfg = this.getShapeStyle(cfg);
            const shape = group.addShape(shapeType, {
                attrs: shapeCfg
            });
            return shape;
        },
        getShapeStyle (cfg) {
            const size = this.getSize(cfg);
            const rx = size[0] / 2;
            const ry = size[1] / 2;
            const style = this.getDefaultStyle();
            return mix({}, {
                x: 0, // 节点的位置在上层确定，所以这里仅使用相对位置即可
                y: 0,
                rx, // size 一般可以提供宽高信息
                ry
            }, style, cfg.style);
        },
        getAnchorPoints () {
            return [
                [0.5, 0], [0, 0.5], [1, 0.5], [0.5, 1]
            ];
        }
    }), 'ellipse'
];
