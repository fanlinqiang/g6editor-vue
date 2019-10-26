/**
 * Created by linqiang on 2019/5/15.
 */
import G6 from '@antv/g6';
import base from './base';
const { mix, getControlPoint } = G6.Util;
export default [
    mix({}, base, {
        curvePosition: 0.5, // 弯曲的默认位置
        curveOffset: -20, // 弯曲度，沿着startPoint, endPoint 的垂直向量（顺时针）方向，距离线的距离，距离越大越弯曲
        getControlPoints (cfg) {
            let controlPoints = cfg.controlPoints; // 指定controlPoints
            if (!controlPoints || !controlPoints.length) {
                const { startPoint, endPoint } = cfg;
                const innerPoint = getControlPoint(startPoint, endPoint, this.curvePosition, this.curveOffset);
                controlPoints = [innerPoint];
            }
            return controlPoints;
        },
        getPath (points) {
            const path = [];
            path.push(['M', points[0].x, points[0].y]);
            path.push(['Q', points[1].x, points[1].y, points[2].x, points[2].y]);
            return path;
        }
    }), 'single-line'];
