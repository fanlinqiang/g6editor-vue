/**
 * Created by linqiang on 2019/5/16.
 */
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g; /*eslint-disable-line*/
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

function camelCase (name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
}
// getStyle
export function getStyle (element, styleName) {
    if (!element || !styleName) {
        return null;
    }
    styleName = camelCase(styleName);
    if (styleName === 'float') {
        styleName = 'cssFloat';
    }
    try {
        const computed = document.defaultView.getComputedStyle(element, '');
        return element.style[styleName] || computed ? computed[styleName] : null;
    } catch (e) {
        return element.style[styleName];
    }
}
// 查找相距最近的点
export function getNearestPoint (points, curPoint) {
    let nearestPoint = points[0];
    let minDistance = pointDistance(points[0], curPoint);
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const distance = pointDistance(point, curPoint);
        if (distance < minDistance) {
            nearestPoint = point;
            minDistance = distance;
        }
    }
    return nearestPoint;
}

function pointDistance (p1, p2) {
    return (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y);
}
// 获取某些状态下的item
export function getItemByState ({ graph, state = 'selected', itemType = ['node', 'edge'] }) {
    let items = [];
    itemType.forEach(type => {
        items = items.concat(graph.findAllByState(type, state));
    });
    return items;
}
