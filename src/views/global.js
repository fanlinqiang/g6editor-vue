/**
 * Created by linqiang on 2019/5/15.
 */
export default {
    version: '1.0.0',
    flowRect: {
        style: {
            fill: '#e7f8ff',
            stroke: '#050eee',
            size: [100, 50],
            radius: [4],
            cursor: 'move'
        },
        StateStyle: {
            selected: {
                lineWidth: 2,
                fill: '#94D5FD'
            }
        }
    },
    flowRhombus: {
        style: {
            fill: '#e7fffb',
            stroke: '#38d3c3',
            size: [80, 80],
            radius: [4],
            cursor: 'move'
        },
        StateStyle: {
            selected: {
                lineWidth: 2,
                fill: '#89E7DE'
            }
        }
    },
    flowCircle: {
        style: {
            fill: '#fff3e9',
            stroke: '#ffa860',
            size: [50, 50],
            cursor: 'move'
        },
        StateStyle: {
            selected: {
                lineWidth: 2,
                fill: '#fdd594'
            }
        }
    },
    flowEllipse: {
        style: {
            fill: '#F8F0FE',
            stroke: '#f265fe',
            size: [100, 50],
            radius: [4],
            cursor: 'move'
        },
        StateStyle: {
            selected: {
                lineWidth: 2,
                fill: '#f9a5fd'
            }
        }
    },
    flowSmooth: {
        style: {
            endArrow: {
                path: [
                    ['M', -2, 2],
                    ['L', 2, 0],
                    ['L', -2, -2],
                    ['A', 4, 4, 0, 0, 1, -2, 2],
                    ['Z']
                ],
                fill: 'red',
                d: 2
            }

        },
        StateStyle: {
            hoverActive: {
                stroke: 'blue'
            }
        }
    },
    flowSpline: {
        style: {

        },
        StateStyle: {
            hoverActive: {
                stroke: 'blue'
            }
        }
    },
    anchorPointStyle: {
        radius: 3.5,
        fill: '#fff',
        stroke: '#1890FF',
        lineAppendWidth: 12
    },
    anchorHotsoptStyle: {
        radius: 12,
        fill: '#1890FF',
        fillOpacity: 0.25
    },
    // 节点应用状态后的样式，默认仅提供 active 和 selected 用户可以自己扩展
    node: {
        StateStyle: {
            default: {
                lineWidth: 1
            },
            active: {
                fillOpacity: 0.8
            },
            selected: {
                lineWidth: 2
            }
        }
    },
    edge: {
        StateStyle: {
            default: {
                lineWidth: 1,
                stroke: '#333',
                size: '1',
                endArrow: true
            },
            active: {
                strokeOpacity: 0.8
            },
            selected: {
                lineWidth: 2
            }
        }
    },

    rootContainerClassName: 'root-container',
    nodeContainerClassName: 'node-container',
    edgeContainerClassName: 'edge-container',
    defaultNode: {
        shape: 'circle',
        style: {
            fill: '#fff'
        },
        size: 40,
        color: '#333'
    },
    defaultEdge: {
        shape: 'line',
        style: {},
        size: 1,
        color: '#333'
    },
    nodeLabel: {
        style: {
            fill: '#595959',
            textAlign: 'center',
            textBaseline: 'middle'
        },
        offset: 5 // 节点的默认文本不居中时的偏移量
    },
    edgeLabel: {
        style: {
            fill: '#595959',
            textAlign: 'center',
            textBaseline: 'middle'
        }
    },

    loopPosition: 'top',
    delegateStyle: {
        fill: '#F3F9FF',
        fillOpacity: 0.5,
        stroke: '#1890FF',
        strokeOpacity: 0.9,
        lineDash: [5, 5]
    },
    orbitGap: 10,
    nodeDefaultShape: 'flow-node',
    edgeDefaultShape: 'flow-smooth',
    groupDefaultShape: 'flow-group',
    nodeActivedOutterStyle: { lineWidth: 0 },
    groupSelectedOutterStyle: {
        stroke: '#E0F0FF',
        lineWidth: 2
    },
    nodeSelectedOutterStyle: {
        stroke: '#E0F0FF',
        lineWidth: 2
    },
    edgeActivedStyle: {
        stroke: '#1890FF',
        strokeOpacity: 0.92
    },
    nodeActivedStyle: {
        fill: '#F3F9FF',
        stroke: '#1890FF'
    },
    groupActivedStyle: { stroke: '#1890FF' },
    edgeSelectedStyle: {
        lineWidth: 2,
        strokeOpacity: 0.92,
        stroke: '#A3B1BF'
    },
    nodeSelectedStyle: {
        fill: '#F3F9FF',
        stroke: '#1890FF'
    },
    groupSelectedStyle: {
        stroke: '#1890FF',
        fillOpacity: 0.92
    },
    nodeStyle: {
        stroke: '#CED4D9',
        fill: '#FFFFFF',
        shadowOffsetX: 0,
        shadowOffsetY: 4,
        shadowBlur: 10,
        shadowColor: 'rgba(13, 26, 38, 0.08)',
        lineWidth: 1,
        radius: 4,
        fillOpacity: 0.92
    },
    edgeStyle: {
        stroke: '#A3B1BF',
        strokeOpacity: 0.92,
        lineWidth: 1,
        lineAppendWidth: 8,
        endArrow: !0
    },
    groupBackgroundPadding: [40, 10, 10, 10],
    groupLabelOffsetX: 10,
    groupLabelOffsetY: 10,
    edgeLabelStyle: {
        fill: '#666',
        textAlign: 'center',
        textBaseline: 'middle'
    },
    edgeLabelRectPadding: 4,
    edgeLabelRectStyle: { fill: 'white' },
    nodeLabelStyle: {
        fill: '#666',
        textAlign: 'center',
        textBaseline: 'middle'
    },
    groupStyle: {
        stroke: '#CED4D9',
        radius: 4
    },
    groupLabelStyle: {
        fill: '#666',
        textAlign: 'left',
        textBaseline: 'top'
    },
    multiSelectRectStyle: {
        fill: '#1890FF',
        fillOpacity: 0.08,
        stroke: '#1890FF',
        opacity: 0.1
    },
    dragNodeHoverToGroupStyle: {
        stroke: '#1890FF',
        lineWidth: 2
    },
    dragNodeLeaveFromGroupStyle: {
        stroke: '#BAE7FF',
        lineWidth: 2
    },

    anchorHotsoptActivedStyle: { radius: 14 },
    anchorPointHoverStyle: {
        radius: 4,
        fill: '#1890FF',
        fillOpacity: 1,
        stroke: '#1890FF'
    },
    nodeControlPointStyle: {
        radius: 4,
        fill: '#fff',
        shadowBlur: 4,
        shadowColor: '#666'
    },
    edgeControlPointStyle: {
        radius: 6,
        symbol: 'square',
        lineAppendWidth: 6,
        fillOpacity: 0,
        strokeOpacity: 0
    },
    nodeSelectedBoxStyle: { stroke: '#C2C2C2' },
    cursor: {
        panningCanvas: '-webkit-grabbing',
        beforePanCanvas: '-webkit-grab',
        hoverNode: 'move',
        hoverEffectiveAnchor: 'crosshair',
        hoverEdge: 'default',
        hoverGroup: 'move',
        hoverUnEffectiveAnchor: 'default',
        hoverEdgeControllPoint: 'crosshair',
        multiSelect: 'crosshair'
    },
    zIndex: {
        anchorPoint: 3,
        anchorHotsopt: 2,
        selectedBox: 1,
        controlPoint: 4
    },
    polylineEdgeStyle: {
        offset: 10,
        borderRadius: 5
    },
    addToGroupDelayTime: 400,
    outFromGroupDelayTime: 400
};
