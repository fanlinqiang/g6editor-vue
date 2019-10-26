/**
 * Created by linqiang on 2019/5/9.
 */
/*eslint-disable*/
import G6 from '@antv/g6';
const {each} = G6.Util;
import behaviors from '../behavior/index';
import nodes from '../node/index';
import edges from '../edge/index';

// 注册behavior
each(behaviors, (behavior, type) => {
    G6.registerBehavior(type, behavior);
});
// 注册节点
each(nodes, (node, type) => {
    G6.registerNode(type, ...node);
});
// 注册边
each(edges, (edge) => {
    G6.registerEdge(edge.value, ...edge.definition);
});
export default G6;
