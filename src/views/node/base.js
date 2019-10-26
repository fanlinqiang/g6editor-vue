/**
 * Created by linqiang on 2019/5/17.
 */
import G6 from '@antv/g6';
import Global from '../global';
import _ from 'lodash';
const CLS_SHAPE_SUFFIX = '-shape';
const CLS_LABEL_SUFFIX = '-label';
const { each, mix, isArray } = G6.Util;
export default {
    /**
     * 绘制节点/边，包含文本
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {G.Group} group 节点的容器
     * @return {G.Shape} 绘制的图形
     */
    draw (cfg, group) {
        const shape = this.drawShape(cfg, group);
        shape.set('className', this.itemType + CLS_SHAPE_SUFFIX);
        if (cfg.label) {
            const label = this.drawLabel(cfg, group);
            label.set('className', this.itemType + CLS_LABEL_SUFFIX);
        }
        this.init(cfg, shape, group);
        // todo update item通过getKeyShape()获取对应方法
        shape.init = () => { //
            return this.init(cfg, shape, group);
        };
        return shape;
    },
    init (cfg, shape, group) {
        this.drawAnchorPoints(shape, group);
        shape.size = this.getSize(cfg); // 保存size
    },
    getSize (cfg) {
        const style = this.getDefaultStyle();
        let size = cfg.size || style.size;
        if (!isArray(size)) {
            size = [size, size];
        }
        return size;
    },
    showAnchors (shape) {
        shape.hideAnchorsTimer && clearTimeout(shape.hideAnchorsTimer);
        shape.anchorShapes && shape.anchorShapes.forEach(function (anchor) {
            anchor.show();
        });
    },
    hideAnchors (shape) {
        shape.hideAnchorsTimer = setTimeout(() => {
            shape.anchorShapes && shape.anchorShapes.forEach(function (anchor) {
                anchor.hide();
            });
        }, 500);
    },
    getType () {
        return this.type;
    },
    // 清除锚点
    clearAnchor (shape) {
        shape.anchorShapes && shape.anchorShapes.forEach(function (anchor) {
            anchor.remove();
        });
        shape.anchorShapes = [];
    },
    // 画锚点
    drawAnchorPoints (shape, group) {
        let { minX, minY, width, height } = shape.getBBox();
        let anchorPoints = this.getAnchorPoints().map((item, index) => {
            return {
                x: minX + item[0] * width,
                y: minY + item[1] * height,
                index
            };
        });
        this.clearAnchor(shape);
        each(anchorPoints, (point) => {
            let anchorMarker = group.addShape('marker', {
                attrs: mix(
                    {
                        symbol: 'circle',
                        x: point.x,
                        y: point.y,
                        r: 20,
                        cursor: 'point'
                    },
                    Global.anchorPointStyle
                )
                /* freezePoint: point,
                item: this,
                index,
                eventPreFix: 'anchor',
                zIndex: Global.zIndex.anchorPoint */
            });
            anchorMarker.toFront();
            anchorMarker.hide(); // 默认隐藏
            shape.anchorShapes.push(anchorMarker);
        });
    },
    drawLabel (cfg, group) {
        const labelCfg = cfg.labelCfg || {};
        const labelStyle = this.getLabelStyle(cfg, labelCfg, group);
        const label = group.addShape('text', {
            attrs: labelStyle
        });
        return label;
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
            case 'hoverActive': {
                let shape = item.getKeyShape();
                if (value) {
                    this.showAnchors(shape);
                } else {
                    this.hideAnchors(shape);
                }
                break;
            }
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
