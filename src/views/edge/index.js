/**
 * Created by linqiang on 2019/5/15.
 */
import flowSmooth from './flow-smooth';
import flowSpline from './flow-spline';
import flowPolylineHorizontal from './flow-polyline-horizontal';
import flowPolylineVertical from './flow-polyline-vertical';
/* import flowCubicHorizontal from './flow-cubic-horizontal';
import flowCubicVertical from './flow-cubic-vertical'; */
import flowQuadratic from './flow-quadratic';
export default [
    {
        label: '曲线',
        value: 'flow-smooth',
        definition: flowSmooth
    }, {
        label: '直线',
        value: 'flow-spline',
        definition: flowSpline
    }, {
        label: '折线-横向',
        value: 'flow-polyline-horizontal',
        definition: flowPolylineHorizontal
    }, {
        label: '折线-纵向',
        value: 'flow-polyline-vertical',
        definition: flowPolylineVertical
    },
    /* {
        label: 'flow-cubic-horizontal',
        value: 'flow-cubic-horizontal',
        definition: flowCubicHorizontal
    }, {
        label: 'flow-cubic-vertical',
        value: 'flow-cubic-vertical',
        definition: flowCubicVertical
    }, */{
        label: '平滑',
        value: 'flow-quadratic',
        definition: flowQuadratic
    }
];
