/**
 * Created by linqiang on 2019/5/15.
 */
import G6 from '@antv/g6';
import base from './base';
const { mix } = G6.Util;
export default [
    mix({}, base, {
        curvePosition: [1 / 2, 1 / 2],
        getControlPoints (cfg) {
            const { startPoint, endPoint } = cfg;
            const innerPoint1 = {
                x: startPoint.x,
                y: (endPoint.y - startPoint.y) * this.curvePosition[0] + startPoint.y
            };
            const innerPoint2 = {
                x: endPoint.x,
                y: (endPoint.y - startPoint.y) * this.curvePosition[1] + startPoint.y
            };
            const controlPoints = [innerPoint1, innerPoint2];
            return controlPoints;
        }
    }), 'cubic'];
