/**
 * Created by linqiang on 2019/5/17.
 */
import G6 from '@antv/g6';
import Global from '../global';
import _ from 'lodash';
const { mix } = G6.Util;
export default {
    getShapeStyle (cfg) {
        let style = this.getDefaultStyle();
        const size = cfg.size || style.size;
        cfg = this.getPathPoints(cfg);
        const startPoint = cfg.startPoint;
        const endPoint = cfg.endPoint;
        const controlPoints = this.getControlPoints(cfg);
        let points = [startPoint]; // 添加起始点
        // 添加控制点
        if (controlPoints) {
            points = points.concat(controlPoints);
        }
        // 添加结束点
        points.push(endPoint);
        const path = this.getPath(points);
        return mix({}, style, {
            lineWidth: size,
            path
        }, cfg.style);
    },
    getType () {
        return this.type;
    },
    /**
     * 设置节点的状态，主要是交互状态，业务状态请在 draw 方法中实现
     * 单图形的节点仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
     * @override
     * @param  {String} name 状态名称
     * @param  {Object} value 状态值
     * @param  {G6.Item} item 节点
     */
    setState (name, value, item) {
        switch (name) {
            default: {
                const shape = item.get('keyShape');
                if (!shape) {
                    return;
                }
                const stateStyle = this.getStateStyle(name);
                if (value) { // 如果设置状态,在原本状态上叠加绘图属性
                    item.getStateStyle(stateStyle);
                    shape.attr(stateStyle);
                } else { // 取消状态时重置所有状态，依次叠加仍有的状态
                    const style = this.getDefaultStyle();
                    shape.attr(style);
                }
            }
        }
    },
    getDefaultStyle () {
        const self = this;
        let style = _.get(Global, `${_.camelCase(self.getType())}.style`);
        let globalStyle = _.get(Global, `${self.itemType}.StateStyle.default`, {});
        return mix({}, globalStyle, style);
    },
    getStateStyle (state) {
        const self = this;
        let style = _.get(Global, `${_.camelCase(self.getType())}.StateStyle.${state}`);
        let globalStyle = _.get(Global, `${self.itemType}.StateStyle.${state}`, {});
        return mix({}, globalStyle, style);
    }
};
