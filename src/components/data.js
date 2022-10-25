const data = {
    "nodes": [
        {
            "type": "node",
            "size": "72*72",
            "shape": "flow-circle",
            "color": "#FA8C16",
            "label": "开始",
            "stateId": "Start1",
            "stateType": "Start",
            "stateProps": {
                "StateMachine": {
                    "Name": "infoAudit",
                    "Comment": "人工信审流程入口",
                    "Version": "0.0.3"
                }
            },
            "x": 313.875,
            "y": 73,
            "id": "0ba89c98"
        },
        {
            "type": "node",
            "size": "80*72",
            "shape": "flow-rhombus",
            "color": "#13C2C2",
            "label": "是否反欺诈",
            "stateId": "InfoAuditChoice",
            "stateType": "Choice",
            "x": 313.875,
            "y": 191.5,
            "id": "fcf70430"
        },
        {
            "type": "node",
            "size": "110*48",
            "shape": "flow-rect",
            "color": "#1890FF",
            "label": "反欺诈",
            "stateId": "AntiFraud",
            "stateType": "ServiceTask",
            "stateProps": {
                "ServiceName": "taskAssignServiceStrategy",
                "ServiceMethod": "assign",
                "Input": [
                    {
                        "serviceName": "systemAntiFraudHandler",
                        "root": "$.#root"
                    }
                ],
                "Output": {},
                "Status": {},
                "Retry": []
            },
            "x": 51,
            "y": 441.5,
            "id": "45d27571"
        },
        {
            "type": "node",
            "size": "110*48",
            "shape": "flow-rect",
            "color": "#1890FF",
            "label": "初审",
            "stateId": "FirstApprove",
            "stateType": "ServiceTask",
            "stateProps": {
                "ServiceName": "taskAssignServiceStrategy",
                "ServiceMethod": "assign",
                "Input": [
                    {
                        "serviceName": "firstApproveHandler",
                        "root": "$.#root"
                    }
                ],
                "Output": {},
                "Status": {},
                "Retry": []
            },
            "x": 217.375,
            "y": 442,
            "id": "c46d7170"
        },
        {
            "type": "node",
            "size": "72*72",
            "shape": "flow-circle",
            "color": "#05A465",
            "label": "结束",
            "stateId": "Succeed",
            "stateType": "Succeed",
            "x": 328.875,
            "y": 760.5,
            "id": "e2c13210"
        },
        {
            "type": "node",
            "size": "110*48",
            "shape": "flow-rect",
            "color": "#1890FF",
            "label": "商用车核价前置",
            "stateId": "CommercialCarPrePricingApproval",
            "stateType": "ServiceTask",
            "stateProps": {
                "ServiceName": "taskAssignServiceStrategy",
                "ServiceMethod": "assign",
                "Input": [
                    {
                        "serviceName": "commercialCarPrePricingHandler",
                        "root": "$.#root"
                    }
                ],
                "Output": {},
                "Status": {},
                "Retry": []
            },
            "x": 671.375,
            "y": 435,
            "id": "86f07b5b"
        },
        {
            "type": "node",
            "size": "80*72",
            "shape": "flow-rhombus",
            "color": "#13C2C2",
            "label": "是否面核",
            "stateId": "videoFaceChoice",
            "stateType": "Choice",
            "x": 313.375,
            "y": 330,
            "id": "a7e42f8c"
        },
        {
            "type": "node",
            "size": "110*48",
            "shape": "flow-rect",
            "color": "#1890FF",
            "label": "视频面核",
            "stateId": "VideoFaceApprove",
            "stateType": "ServiceTask",
            "stateProps": {
                "ServiceName": "taskAssignServiceStrategy",
                "ServiceMethod": "assign",
                "Input": [
                    {
                        "serviceName": "videoFaceApproveHandler",
                        "root": "$.#root"
                    }
                ],
                "Output": {},
                "Status": {},
                "Retry": []
            },
            "x": 451.875,
            "y": 434.5,
            "id": "7b53c4e1"
        }
    ],
    "edges": [
        {
            "source": "0ba89c98",
            "sourceAnchor": 2,
            "target": "fcf70430",
            "targetAnchor": 0,
            "id": "afb9ccb1"
        },
        {
            "source": "fcf70430",
            "sourceAnchor": 3,
            "target": "45d27571",
            "targetAnchor": 0,
            "id": "50abf320",
            "stateProps": {
                "Expression": "[systemAntiFraudFlag]=='1'",
                "Default": false
            },
            "label": "是",
            "shape": "flow-polyline"
        },
        {
            "source": "fcf70430",
            "sourceAnchor": 2,
            "target": "a7e42f8c",
            "targetAnchor": 0,
            "id": "374a2acf",
            "stateProps": {
                "Expression": "[systemAntiFraudFlag]=='0' && [productType]!='052500006'",
                "Default": false
            },
            "label": "否",
            "shape": "flow-polyline"
        },
        {
            "source": "45d27571",
            "sourceAnchor": 2,
            "target": "e2c13210",
            "targetAnchor": 0,
            "id": "74d765f1"
        },
        {
            "source": "c46d7170",
            "sourceAnchor": 2,
            "target": "e2c13210",
            "targetAnchor": 0,
            "id": "173b515b"
        },
        {
            "source": "fcf70430",
            "sourceAnchor": 1,
            "target": "86f07b5b",
            "targetAnchor": 0,
            "id": "341d6b21",
            "stateProps": {
                "Expression": "[systemAntiFraudFlag]=='0' && [productType]=='052500006'",
                "Default": false
            },
            "label": "否且是商用车产品",
            "shape": "flow-polyline"
        },
        {
            "source": "86f07b5b",
            "sourceAnchor": 2,
            "target": "e2c13210",
            "targetAnchor": 0,
            "id": "505261b4"
        },
        {
            "source": "a7e42f8c",
            "sourceAnchor": 3,
            "target": "c46d7170",
            "targetAnchor": 0,
            "id": "d7d431d4",
            "stateProps": {
                "Expression": "[videoFaceFlag]=='0'",
                "Default": false
            },
            "label": "否",
            "shape": "flow-polyline"
        },
        {
            "source": "a7e42f8c",
            "sourceAnchor": 1,
            "target": "7b53c4e1",
            "targetAnchor": 0,
            "id": "48c16c83",
            "stateProps": {
                "Expression": "[videoFaceFlag]=='1'",
                "Default": false
            },
            "label": "是",
            "shape": "flow-polyline"
        },
        {
            "source": "7b53c4e1",
            "sourceAnchor": 2,
            "target": "e2c13210",
            "targetAnchor": 0,
            "id": "16355f13"
        }
    ]
}

export default data