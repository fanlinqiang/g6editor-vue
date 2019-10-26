/**
 * Created by linqiang on 2019/5/15.
 */
import G6 from '@antv/g6';
import base from './base';
const { mix } = G6.Util;
export default [
    mix({}, base, {
        shapeType: 'polygon',
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
            const style = this.getDefaultStyle();
            const width = size[0];
            const height = size[1];
            return mix({}, style, {
                points: [ // 节点的位置在上层确定，所以这里仅使用相对位置即可
                    [0, height / 2],
                    [width / 2, 0],
                    [0, 0 - height / 2],
                    [0 - width / 2, 0]
                ]
            }, cfg.style);
        },
        getAnchorPoints () {
            return [
                [0.5, 0], [0, 0.5], [1, 0.5], [0.5, 1]
            ];
        }
    }), 'diamond'];
