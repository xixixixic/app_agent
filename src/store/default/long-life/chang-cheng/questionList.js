let changchengquestion = {
    'healthToldVersion': '104',
    'financialToldVersion': '105',
    'healthQuestion': [
        {
            'num': 1,
            'code': 'P401',
            'iselectcode': '',
            'aselectcode': '',
            'question': '身高体重?',
            'remark': '(被保险人)身高厘米,体重公斤;(投保人)身高厘米体重公斤?',
            'status': false
        }, {
            'num': 2,
            'code': 'P402',
            'iselectcode': '',
            'aselectcode': '',
            'question': '您是否目前或曾经有吸烟习惯?',
            'remark': '您是否目前或曾经有吸烟习惯?',
            'queList': {
                'flag': true,
                'listAdd': [
                    {
                        'qus': '是否已戒烟',
                        'placeholder': '',
                        'unit': ''
                    }
                ],
                'listYes': [
                    {
                        'qus': '日吸烟量',
                        'placeholder': '10',
                        'unit': ''
                    },
                    {
                        'qus': '吸烟年限',
                        'placeholder': '5',
                        'unit': ''
                    },
                    {
                        'qus': '戒烟年限',
                        'placeholder': '2',
                        'unit': ''
                    },
                    {
                        'qus': '原因',
                        'placeholder': '健康',
                        'unit': ''
                    }
                ],
                'listMore': [
                    {
                        'qus': '日吸烟量',
                        'placeholder': '10',
                        'unit': ''
                    },
                    {
                        'qus': '吸烟年限',
                        'placeholder': '5',
                        'unit': ''
                    }
                ],
                'listNo': false
            },
            'status': false
        }, {
            'num': 3,
            'code': 'P403',
            'iselectcode': '',
            'aselectcode': '',
            'question': '您是否目前或曾经有饮白酒、洋酒等烈性酒的习惯?',
            'remark': '您是否目前或曾经有饮白酒、洋酒等烈性酒的习惯?',
            'queList': {
                'flag': true,
                'listAdd': [
                    {
                        'qus': '是否已戒酒',
                        'placeholder': ''
                    }
                ],
                'listYes': [
                    {
                        'qus': '日饮酒量',
                        'placeholder': '10',
                        'unit': ''
                    },
                    {
                        'qus': '饮酒年限',
                        'placeholder': '5',
                        'unit': ''
                    },
                    {
                        'qus': '戒酒年限',
                        'placeholder': '2',
                        'unit': ''
                    },
                    {
                        'qus': '原因',
                        'placeholder': '健康',
                        'unit': ''
                    }
                ],
                'listMore': [
                    {
                        'qus': '日饮酒量',
                        'placeholder': '10',
                        'unit': ''
                    },
                    {
                        'qus': '饮酒年限',
                        'placeholder': '5',
                        'unit': ''
                    }
                ],
                'listNo': false
            },
            'status': false
        }, {
           'num': 4,
           'code': 'P404',
           'iselectcode': '',
           'aselectcode': '',
           'question': '您在过去6个月内是否曾有过下列症状：反复头痛、眩晕、晕厥、咯血、胸痛、呼吸困难、呕血、黄疸、便血、听力下降、耳鸣、复视、视力明显下降、原因不明的皮肤或粘膜或齿龈出血、原因不明的发热、体重下降（3个月内超过5公斤）、原因不明的肌肉萎缩、身体的其他感觉异常或活动障碍等?',
           'remark': '您在过去6个月内是否曾有过下列症状：反复头痛、眩晕、晕厥、咯血、胸痛、呼吸困难、呕血、黄疸、便血、听力下降、耳鸣、复视、视力明显下降、原因不明的皮肤或粘膜或齿龈出血、原因不明的发热、体重下降（3个月内超过5公斤）、原因不明的肌肉萎缩、身体的其他感觉异常或活动障碍等?',
           'queList': {
                'listYes': [
                    {
                        'qus': '疾病名称',
                        'placeholder': '头疼',
                        'unit': ''
                    },
                    {
                        'qus': '发病时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '治疗方法',
                        'placeholder': '吃药',
                        'unit': ''
                    },
                    {
                        'qus': '治疗医院',
                        'placeholder': '协和医院',
                        'unit': ''
                    },
                    {
                        'qus': '最后治疗时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '现在情况',
                        'placeholder': '良好',
                        'unit': ''
                    }
                ],
                'listNo': false
            },
            'status': 'false'
        }, {
           'num': 5,
           'code': 'P405',
           'iselectcode': '',
           'aselectcode': '',
           'question': '您在过去两年内是否做过血压、血液化验、心电图、X光、B超、超声心动图、CT、核磁共振、内窥镜及活体组织检查?',
           'remark': '您在过去两年内是否做过血压、血液化验、心电图、X光、B超、超声心动图、CT、核磁共振、内窥镜及活体组织检查?',
           'queList': {
                'listYes': [
                    {
                        'qus': '疾病名称',
                        'placeholder': '血液化验',
                        'unit': ''
                    },
                    {
                        'qus': '发病时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '治疗方法',
                        'placeholder': '化验',
                        'unit': ''
                    },
                    {
                        'qus': '治疗医院',
                        'placeholder': '协和医院',
                        'unit': ''
                    },
                    {
                        'qus': '最后治疗时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '现在情况',
                        'placeholder': '良好',
                        'unit': ''
                    }
                ],
                'listNo': false
            }
        }, {
            'num': 6,
            'code': 'P406',
            'iselectcode': '',
            'aselectcode': '',
            'question': '您过去五年内是否曾住院诊疗?',
            'remark': '您过去五年内是否曾住院诊疗?',
            'queList': {
                 'listYes': [
                    {
                        'qus': '疾病名称',
                        'placeholder': '肠胃炎',
                        'unit': ''
                    },
                    {
                        'qus': '发病时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '治疗方法',
                        'placeholder': '住院',
                        'unit': ''
                    },
                    {
                        'qus': '治疗医院',
                        'placeholder': '协和医院',
                        'unit': ''
                    },
                    {
                        'qus': '最后治疗时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '现在情况',
                        'placeholder': '良好',
                        'unit': ''
                    }
                 ],
                 'listNo': false
             }
         }, {
            'num': 7,
            'code': '',
            'question': '您是否目前或曾经患有，或被怀疑患有下列疾病?'
         }, {
            'num': 7.1,
            'code': 'P407',
            'iselectcode': '',
            'aselectcode': '',
            'question': '(1)哮喘、慢性支气管炎、支气管扩张、肺气肿、肺结核、肺纤维化等呼吸系统疾病;',
            'remark': '(1)哮喘、慢性支气管炎、支气管扩张、肺气肿、肺结核、肺纤维化等呼吸系统疾病;',
            'queList': {
                    listYes: [
                        {
                            'qus': '疾病名称',
                            'placeholder': '慢性支气管炎',
                            'unit': ''
                        },
                        {
                            'qus': '发病时间',
                            'placeholder': '2016',
                            'unit': '年'
                        },
                        {
                            'qus': '治疗方法',
                            'placeholder': '吃药',
                            'unit': ''
                        },
                        {
                            'qus': '治疗医院',
                            'placeholder': '协和医院',
                            'unit': ''
                        },
                        {
                            'qus': '最后治疗时间',
                            'placeholder': '2016',
                            'unit': '年'
                        },
                        {
                            'qus': '现在情况',
                            'placeholder': '良好',
                            'unit': ''
                        }
                    ],
                    listNo: false
                }

         }, {
            'num': 7.2,
            'code': 'P408',
            'iselectcode': '',
            'aselectcode': '',
            'question': '(2)脑出血、脑梗塞、短暂性脑缺血、脑血管瘤、多发性硬化、重症肌无力、帕金森氏综合症、癫痫、精神分裂症、抑郁症等神经系统及精神疾病;',
            'remark': '(2)脑出血、脑梗塞、短暂性脑缺血、脑血管瘤、多发性硬化、重症肌无力、帕金森氏综合症、癫痫、精神分裂症、抑郁症等神经系统及精神疾病;',
            'queList': {
                    'listYes': [
                        {
                            'qus': '疾病名称',
                            'placeholder': '脑梗塞',
                            'unit': ''
                        },
                        {
                            'qus': '发病时间',
                            'placeholder': '2016',
                            'unit': '年'
                        },
                        {
                            'qus': '治疗方法',
                            'placeholder': '吃药',
                            'unit': ''
                        },
                        {
                            'qus': '治疗医院',
                            'placeholder': '协和医院',
                            'unit': ''
                        },
                        {
                            'qus': '最后治疗时间',
                            'placeholder': '2016',
                            'unit': '年'
                        },
                        {
                            'qus': '现在情况',
                            'placeholder': '良好',
                            'unit': ''
                        }
                    ],
                    'listNo': false
                }
         }, {
            'num': 7.3,
            'code': 'P409',
            'iselectcode': '',
            'aselectcode': '',
            'question': '(3)高血压、冠心病、风湿性心脏病、心脏瓣膜病、先天性心脏病、心肌病、主动脉瘤、心律失常等心血管疾病;',
            'remark': '(3)高血压、冠心病、风湿性心脏病、心脏瓣膜病、先天性心脏病、心肌病、主动脉瘤、心律失常等心血管疾病;',
            'queList': {
                'listYes': [
                    {
                        'qus': '疾病名称',
                        'placeholder': '高血压',
                        'unit': ''
                    },
                    {
                        'qus': '发病时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '治疗方法',
                        'placeholder': '吃药',
                        'unit': ''
                    },
                    {
                        'qus': '治疗医院',
                        'placeholder': '协和医院',
                        'unit': ''
                    },
                    {
                        'qus': '最后治疗时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '现在情况',
                        'placeholder': '良好',
                        'unit': ''
                    }
                ],
                'listNo': false
            }
         }, {
            'num': 7.4,
            'code': 'P410',
            'iselectcode': '',
            'aselectcode': '',
            'question': '(4)肝炎、肝炎病毒携带、肝硬化、消化道溃疡/出血/穿孔、结肠炎、胰腺炎等消化系统疾病;',
            'remark': '(4)肝炎、肝炎病毒携带、肝硬化、消化道溃疡/出血/穿孔、结肠炎、胰腺炎等消化系统疾病;',
            'queList': {
                'listYes': [
                    {
                        'qus': '疾病名称',
                        'placeholder': '肝硬化',
                        'unit': ''
                    },
                    {
                        'qus': '发病时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '治疗方法',
                        'placeholder': '吃药',
                        'unit': ''
                    },
                    {
                        'qus': '治疗医院',
                        'placeholder': '协和医院',
                        'unit': ''
                    },
                    {
                        'qus': '最后治疗时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '现在情况',
                        'placeholder': '良好',
                        'unit': ''
                    }
                ],
                'listNo': false
            }
         }, {
            'num': 7.5,
            'code': 'P411',
            'iselectcode': '',
            'aselectcode': '',
            'question': '(5)血尿、蛋白尿、肾炎、肾病综合症、肾衰竭、肾囊肿、膀胱疾病、前列腺疾病等泌尿生殖系统疾病;',
            'remark': '(5)血尿、蛋白尿、肾炎、肾病综合症、肾衰竭、肾囊肿、膀胱疾病、前列腺疾病等泌尿生殖系统疾病;',
            'queList': {
                'listYes': [
                    {
                        'qus': '疾病名称',
                        'placeholder': '肾衰竭',
                        'unit': ''
                    },
                    {
                        'qus': '发病时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '治疗方法',
                        'placeholder': '吃药',
                        'unit': ''
                    },
                    {
                        'qus': '治疗医院',
                        'placeholder': '协和医院',
                        'unit': ''
                    },
                    {
                        'qus': '最后治疗时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '现在情况',
                        'placeholder': '良好',
                        'unit': ''
                    }
                ],
                'listNo': false
            }
         }, {
            'num': 7.6,
            'code': 'P412',
            'iselectcode': '',
            'aselectcode': '',
            'question': '(6)糖尿病、痛风、甲状腺疾病、脑垂体疾病、肾上腺疾病、白血病、血友病、再生障碍性贫血、紫癜等内分泌、代谢及血液系统疾病;',
            'remark': '(6)糖尿病、痛风、甲状腺疾病、脑垂体疾病、肾上腺疾病、白血病、血友病、再生障碍性贫血、紫癜等内分泌、代谢及血液系统疾病;',
            'queList': {
                'listYes': [
                    {
                        'qus': '疾病名称',
                        'placeholder': '糖尿病',
                        'unit': ''
                    },
                    {
                        'qus': '发病时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '治疗方法',
                        'placeholder': '注射治疗',
                        'unit': ''
                    },
                    {
                        'qus': '治疗医院',
                        'placeholder': '协和医院',
                        'unit': ''
                    },
                    {
                        'qus': '最后治疗时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '现在情况',
                        'placeholder': '良好',
                        'unit': ''
                    }
                ],
                'listNo': false
            }
         }, {
            'num': 7.7,
            'code': 'P413',
            'iselectcode': '',
            'aselectcode': '',
            'question': '(7)类风湿性关节炎、风湿病、强直性脊柱炎、白塞氏病、系统性红斑狼疮、肌肉营养不良症、免疫缺陷病（艾滋病或艾滋病病毒携带）等骨骼、肌肉、结缔组织疾病;',
            'remark': '(7)类风湿性关节炎、风湿病、强直性脊柱炎、白塞氏病、系统性红斑狼疮、肌肉营养不良症、免疫缺陷病（艾滋病或艾滋病病毒携带）等骨骼、肌肉、结缔组织疾病;',
            'queList': {
                'listYes': [
                    {
                        'qus': '疾病名称',
                        'placeholder': '类风湿',
                        'unit': ''
                    },
                    {
                        'qus': '发病时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '治疗方法',
                        'placeholder': '理疗',
                        'unit': ''
                    },
                    {
                        'qus': '治疗医院',
                        'placeholder': '协和医院',
                        'unit': ''
                    },
                    {
                        'qus': '最后治疗时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '现在情况',
                        'placeholder': '良好',
                        'unit': ''
                    }
                ],
                'listNo': false
            }
         }, {
            'num': 7.8,
            'code': 'P414',
            'iselectcode': '',
            'aselectcode': '',
            'question': '(8)中耳炎、白内障、青光眼、视神经或视网膜病变等眼、耳、鼻、喉或口腔疾病;',
            'remark': '(8)中耳炎、白内障、青光眼、视神经或视网膜病变等眼、耳、鼻、喉或口腔疾病;',
            'queList': {
                'listYes': [
                    {
                        'qus': '疾病名称',
                        'placeholder': '白内障',
                        'unit': ''
                    },
                    {
                        'qus': '发病时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '治疗方法',
                        'placeholder': '滴药',
                        'unit': ''
                    },
                    {
                        'qus': '治疗医院',
                        'placeholder': '协和医院',
                        'unit': ''
                    },
                    {
                        'qus': '最后治疗时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '现在情况',
                        'placeholder': '良好',
                        'unit': ''
                    }
                ],
                'listNo': false
            }
         }, {
            'num': 7.9,
            'code': 'P415',
            'iselectcode': '',
            'aselectcode': '',
            'question': '(9)恶性肿瘤、尚未证实为良性或恶性的肿瘤、息肉、肿块、囊肿、赘生物;',
            'remark': '(9)恶性肿瘤、尚未证实为良性或恶性的肿瘤、息肉、肿块、囊肿、赘生物;',
            'queList': {
                'listYes': [
                    {
                        'qus': '疾病名称',
                        'placeholder': '囊肿',
                        'unit': ''
                    },
                    {
                        'qus': '发病时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '治疗方法',
                        'placeholder': '开刀',
                        'unit': ''
                    },
                    {
                        'qus': '治疗医院',
                        'placeholder': '协和医院',
                        'unit': ''
                    },
                    {
                        'qus': '最后治疗时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '现在情况',
                        'placeholder': '良好',
                        'unit': ''
                    }
                ],
                'listNo': false
            }
         }, {
            'num': '7.10',
            'code': 'P416',
            'iselectcode': '',
            'aselectcode': '',
            'question': '(10)先天性疾病、遗传性疾病、脑外伤后遗症、内脏损伤、急/慢性中毒或职业病等;',
            'remark': '(10)先天性疾病、遗传性疾病、脑外伤后遗症、内脏损伤、急/慢性中毒或职业病等;',
            'queList': {
                'listYes': [
                    {
                        'qus': '疾病名称',
                        'placeholder': '先天性疾病',
                        'unit': ''
                    },
                    {
                        'qus': '发病时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '治疗方法',
                        'placeholder': '吃药',
                        'unit': ''
                    },
                    {
                        'qus': '治疗医院',
                        'placeholder': '协和医院',
                        'unit': ''
                    },
                    {
                        'qus': '最后治疗时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '现在情况',
                        'placeholder': '良好',
                        'unit': ''
                    }
                ],
                'listNo': false
            }
         }, {
            'num': 7.11,
            'code': 'P417',
            'iselectcode': '',
            'aselectcode': '',
            'question': '(11)以上未提及的疾病或症状;',
            'remark': '(11)以上未提及的疾病或症状;',
            'queList': {
                'listYes': [
                    {
                        'qus': '疾病名称',
                        'placeholder': '骨折',
                        'unit': ''
                    },
                    {
                        'qus': '发病时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '治疗方法',
                        'placeholder': '住院',
                        'unit': ''
                    },
                    {
                        'qus': '治疗医院',
                        'placeholder': '协和医院',
                        'unit': ''
                    },
                    {
                        'qus': '最后治疗时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '现在情况',
                        'placeholder': '良好',
                        'unit': ''
                    }
                ],
                'listNo': false
            }
         }, {
            'num': 8,
            'code': 'P418',
            'iselectcode': '',
            'aselectcode': '',
            'question': '身体残疾情况：您是否智能障碍?是否失明、聋哑、跛行、小儿麻痹后遗症？是否有脊柱、胸廓、四肢、五官、手指、足趾畸形或功能障碍?',
            'remark': '身体残疾情况：您是否智能障碍?是否失明、聋哑、跛行、小儿麻痹后遗症？是否有脊柱、胸廓、四肢、五官、手指、足趾畸形或功能障碍?',
            'queList': {
                'listYes': [
                    {
                        'qus': '疾病名称',
                        'placeholder': '身体残疾',
                        'unit': ''
                    },
                    {
                        'qus': '发病时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '治疗方法',
                        'placeholder': '理疗',
                        'unit': ''
                    },
                    {
                        'qus': '治疗医院',
                        'placeholder': '协和医院',
                        'unit': ''
                    },
                    {
                        'qus': '最后治疗时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '现在情况',
                        'placeholder': '良好',
                        'unit': ''
                    }
                ],
                'listNo': false
            }
         }, {
            'num': 9,
            'code': 'P419',
            'iselectcode': '',
            'aselectcode': '',
            'question': '您是否使用过任何成瘾药物,如镇静安眠剂、迷幻药、吸食有机溶剂或毒品?',
            'remark': '您是否使用过任何成瘾药物,如镇静安眠剂、迷幻药、吸食有机溶剂或毒品?',
            'queList': {
                'listYes': [
                    {
                        'qus': '疾病名称',
                        'placeholder': '焦虑症',
                        'unit': ''
                    },
                    {
                        'qus': '发病时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '治疗方法',
                        'placeholder': '镇静安眠剂',
                        'unit': ''
                    },
                    {
                        'qus': '治疗医院',
                        'placeholder': '协和医院',
                        'unit': ''
                    },
                    {
                        'qus': '最后治疗时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '现在情况',
                        'placeholder': '良好',
                        'unit': ''
                    }
                ],
                'listNo': false
            }
         }, {
            'num': 10,
            'code': 'P420',
            'iselectcode': '',
            'aselectcode': '',
            'question': '您的父母、子女、兄弟姐妹中，是否有人患有癌症、糖尿病、多囊肝、多囊肾、血友病、精神疾病及其他遗传性疾病?',
            'remark': '您的父母、子女、兄弟姐妹中，是否有人患有癌症、糖尿病、多囊肝、多囊肾、血友病、精神疾病及其他遗传性疾病?',
            'queList': {
                'listYes': [
                    {
                        'qus': '疾病名称',
                        'placeholder': '癌症',
                        'unit': ''
                    },
                    {
                        'qus': '发病时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '治疗方法',
                        'placeholder': '开刀',
                        'unit': ''
                    },
                    {
                        'qus': '治疗医院',
                        'placeholder': '协和医院',
                        'unit': ''
                    },
                    {
                        'qus': '最后治疗时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '现在情况',
                        'placeholder': '良好',
                        'unit': ''
                    }
                ],
                'listNo': false
            }
         }, {
            'num': 11,
            'code': '',
            'question': '女性告知(≥14周岁填写)'
         }, {
            'num': 11.1,
            'code': 'P421',
            'iselectcode': '',
            'aselectcode': '',
            'question': '(1)您现在是否怀孕?',
            'remark': '(1)您现在是否怀孕?',
            'queList': {
                'listYes': [
                    {
                        'qus': '怀孕周数',
                        'placeholder': '10',
                        'unit': ''
                    }
                ],
                'listNo': false
            }
         }, {
            'num': 11.2,
            'code': 'P422',
            'iselectcode': '',
            'aselectcode': '',
            'question': '(2)是否患有或曾经患有阴道不规则出血、子宫肌瘤、子宫内膜异位症、卵巢囊肿、乳腺包块或肿块等女性疾病?',
            'remark': '(2)是否患有或曾经患有阴道不规则出血、子宫肌瘤、子宫内膜异位症、卵巢囊肿、乳腺包块或肿块等女性疾病?',
            'queList': {
                'listYes': [
                    {
                        'qus': '疾病名称',
                        'placeholder': '子宫肌瘤',
                        'unit': ''
                    },
                    {
                        'qus': '发病时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '治疗方法',
                        'placeholder': '开刀',
                        'unit': ''
                    },
                    {
                        'qus': '治疗医院',
                        'placeholder': '协和医院',
                        'unit': ''
                    },
                    {
                        'qus': '最后治疗时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '现在情况',
                        'placeholder': '良好',
                        'unit': ''
                    }
                ],
                'listNo': false
            }
         }, {
            'num': 11.3,
            'code': 'P423',
            'iselectcode': '',
            'aselectcode': '',
            'question': '(3)是否被建议做宫颈涂片、乳房超声、X光、活检等?',
            'remark': '(3)是否被建议做宫颈涂片、乳房超声、X光、活检等?',
            'queList': {
                'listYes': [
                    {
                        'qus': '疾病名称',
                        'placeholder': '乳腺癌',
                        'unit': ''
                    },
                    {
                        'qus': '发病时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '治疗方法',
                        'placeholder': '开刀',
                        'unit': ''
                    },
                    {
                        'qus': '治疗医院',
                        'placeholder': '协和医院',
                        'unit': ''
                    },
                    {
                        'qus': '最后治疗时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '现在情况',
                        'placeholder': '良好',
                        'unit': ''
                    }
                ],
                'listNo': false
            }
         }, {
            'num': 12,
            'code': '',
            'question': '两周岁以下儿童（含两周岁）告知'
         }, {
            'num': 12.1,
            'code': 'P424',
            'iselectcode': '',
            'aselectcode': '',
            'question': '出生孕周身高体重?',
            'remark': '出生孕周身高体重?'
         }, {
            'num': 12.2,
            'code': 'P425',
            'iselectcode': '',
            'aselectcode': '',
            'question': '(2)是否多胎、早产、难产、先天性疾病、遗传性疾病或畸形、体重不增或增长缓慢?',
            'remark': '(2)是否多胎、早产、难产、先天性疾病、遗传性疾病或畸形、体重不增或增长缓慢?',
            'queList': {
                'listYes': [
                    {
                        'qus': '疾病名称',
                        'placeholder': '早产',
                        'unit': ''
                    },
                    {
                        'qus': '发病时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '治疗方法',
                        'placeholder': '住院',
                        'unit': ''
                    },
                    {
                        'qus': '治疗医院',
                        'placeholder': '协和医院',
                        'unit': ''
                    },
                    {
                        'qus': '最后治疗时间',
                        'placeholder': '2016',
                        'unit': '年'
                    },
                    {
                        'qus': '现在情况',
                        'placeholder': '良好',
                        'unit': ''
                    }
                ],
                'listNo': false
            }
        }
    ],
    'financialQuestion': [
            {
            'num': 1,
            'code': 'P501',
            'iselectcode': '',
            'aselectcode': '',
            'question': '每月固定收入',
            'remark': '每年固定收入'
            }, {
                'num': 2,
                'code': 'P502',
                'question': '您是否持有有效机动车驾驶执照?',
                'remark': '您是否持有有效机动车驾驶执照?',
                'queList': {
                    'listYes': [
                        {
                            'qus': '驾照类型',
                            'placeholder': 'C',
                            'unit': ''
                        }
                        ],
                    'listNo': false
                    }
            }, {
                'num': 3,
                'code': 'P503',
                'iselectcode': '',
                'aselectcode': '',
                'question': '您是否拥有公费医疗、社会医疗保险或其他费用补偿型医疗保险?',
                'remark': '您是否拥有公费医疗、社会医疗保险或其他费用补偿型医疗保险?',
                'queList': {
                'listYes': [
                    {
                        'qus': '保险类型',
                        'placeholder': '寿险',
                        'unit': ''
                    }
                    ],
                    'listNo': ''
                    }
            }, {
                'num': 4,
                'code': 'P504',
                'iselectcode': '',
                'aselectcode': '',
                'question': '您是否已购买或正在向其他保险公司申请购买（指提交投保申请但保险公司还未正式签单）人身保险合同?',
                'remark': '您是否已购买或正在向其他保险公司申请购买（指提交投保申请但保险公司还未正式签单）人身保险合同?',
                'queList': {
                'listYes': [
                    {
                        'qus': '保险公司名称',
                        'placeholder': '中国人寿',
                        'unit': ''
                    },
                    {
                        'qus': '险种名称',
                        'placeholder': '重疾保险',
                        'unit': ''
                    },
                    {
                        'qus': '保险金额',
                        'placeholder': '500000',
                        'unit': '万'
                    },
                    {
                        'qus': '日期',
                        'placeholder': '2018',
                        'unit': '年'
                    }
                    ],
                    'listNo': false
               }
            }, {
                'num': 5,
                'code': 'P505',
                'iselectcode': '',
                'aselectcode': '',
                'question': '您在过去投保人身保险时，或在申请保全复效时，是否被拒保、延期、加费、或对条款做特别约定，或申请过理赔?',
                'remark': '您在过去投保人身保险时，或在申请保全复效时，是否被拒保、延期、加费、或对条款做特别约定，或申请过理赔?',
                'queList': {
                'listYes': [
                    {
                        'qus': '保险公司名称',
                        'placeholder': '中国人寿',
                        'unit': ''
                    },
                    {
                        'qus': '险种名称',
                        'placeholder': '重疾保险',
                        'unit': ''
                    },
                    {
                        'qus': '索赔金额',
                        'placeholder': '500000',
                        'unit': '万'
                    },
                    {
                        'qus': '日期',
                        'placeholder': '2020',
                        'unit': '年'
                    },
                    {
                        'qus': '原因',
                        'placeholder': '保障健康',
                        'unit': ''
                    },
                    {
                        'qus': '结果',
                        'placeholder': '良好',
                        'unit': ''
                    }
                    ],
                    'listNo': false
            }
            }, {
                'num': 6,
                'code': 'P506',
                'iselectcode': '',
                'aselectcode': '',
                'question': '您是否有参加飞行、潜水、跳伞、武术、拳击、赛车、特技表演、赛马等危险运动的爱好?',
                'remark': '您是否有参加飞行、潜水、跳伞、武术、拳击、赛车、特技表演、赛马等危险运动的爱好?',
                'queList': {
                'listYes': [
                    {
                        'qus': '运动',
                        'placeholder': '跳伞',
                        'unit': ''
                    },
                    {
                        'qus': '频次',
                        'placeholder': '5',
                        'unit': ''
                    }
                    ],
                    'listNo': false
            }
            }, {
                'num': 7,
                'code': 'P507',
                'iselectcode': '',
                'aselectcode': '',
                'question': '您是否计划1年以内前往其他国家或地区?',
                'remark': '您是否计划1年以内前往其他国家或地区?',
                'queList': {
                'listYes': [
                    {
                        'qus': '计划前往地',
                        'placeholder': '美国',
                        'unit': ''
                    },
                    {
                        'qus': '时间',
                        'placeholder': '2018',
                        'unit': '年'
                    }
                    ],
                    'listNo': false
                }
            }, {
                'num': 8,
                'code': 'P508',
                'iselectcode': '',
                'aselectcode': '',
                'question': '您是否负债超过200万元(自用房屋及车辆贷款除外)?',
                'remark': '您是否负债超过200万元(自用房屋及车辆贷款除外)?',
                'queList': {
                'listYes': [
                    {
                        'qus': '详细描述',
                        'placeholder': '详细描述',
                        'unit': ''
                    }
                    ],
                    'listNo': false
                }
            }
    ]
}

export default {
    changchengquestion
}