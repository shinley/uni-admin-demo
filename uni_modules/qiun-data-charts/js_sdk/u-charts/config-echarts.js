/*
 * uCharts®
 * 高性能跨平台图表库，支持H5、APP、小程序（微信/支付宝/百度/头条/QQ/360）、Vue、Taro等支持canvas的框架平台
 * Copyright (c) 2021 QIUN®秋云 https://www.ucharts.cn All rights reserved.
 * Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
 * 复制使用请保留本段注释，感谢支持开源！
 *
 * uCharts®官方网站
 * https://www.uCharts.cn
 *
 * 开源地址:
 * https://gitee.com/uCharts/uCharts
 *
 * uni-app插件市场地址：
 * http://ext.dcloud.net.cn/plugin?id=271
 *
 */

// 通用配置项

// 主题颜色配置：如每个图表类型需要不同主题，请在对应图表类型上更改color属性
const color = ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc', ...
	generateHslaColors(100, 50, 1, 20), ...generateHslaColors(60, 50, 1, 20), ...generateHslaColors(30, 50, 1, 20)
];

function generateHslaColors(saturation, lightness, alpha, amount) {
	let colors = []
	let huedelta = Math.trunc(360 / amount)
	for (let i = 0; i < amount; i++) {
		let hue = i * huedelta
		if (hue) {
			colors.push(`hsla(${hue},${saturation}%,${lightness}%,${alpha})`)
		}
	}
	return colors
}
const cfe = {
	//demotype为自定义图表类型
	"type": ["pie", "ring", "rose", "funnel", "line", "column", "area", "radar", "gauge", "candle", "demotype"],
	//增加自定义图表类型，如果需要categories，请在这里加入您的图表类型例如最后的"demotype"
	"categories": ["line", "column", "area", "radar", "gauge", "candle", "demotype"],
	//instance为实例变量承载属性，option为eopts承载属性，不要删除
	"instance": {},
	"option": {},
	//下面是自定义format配置，因除H5端外的其他端无法通过props传递函数，只能通过此属性对应下标的方式来替换
	"formatter": {
		'tooltipCustom': function(item, category, index, opts) {
			// console.log(item, category, index, opts);
			const item0 = item[0]
			let val = ''
			item.forEach(data=>{
				val += `\n${data.seriesName} : ${data.data}`
			})
			return `${item0.name}${val}`
		},
		"tooltipDemo1": function(res) {
			let result = ''
			for (let i in res) {
				if (i == 0) {
					result += res[i].axisValueLabel + '年销售额'
				}
				let value = '--'
				if (res[i].data !== null) {
					value = res[i].data
				}
				// #ifdef H5
				result += '\n' + res[i].seriesName + '：' + value + ' 万元'
				// #endif

				// #ifdef APP-PLUS
				result += '<br/>' + res[i].marker + res[i].seriesName + '：' + value + ' 万元'
				// #endif
			}
			return result;
		},
		legendFormat: function(name) {
			return "自定义图例+" + name;
		},
		yAxisFormatDemo: function(value, index) {
			return value + '元';
		},
		seriesFormatDemo: function(res) {
			return res.name + '年' + res.value + '元';
		}
	},
	//这里演示了自定义您的图表类型的option，可以随意命名，之后在组件上 type="demotype" 后，组件会调用这个花括号里的option，如果组件上还存在eopts参数，会将demotype与eopts中option合并后渲染图表。
	"demotype": {
		"color": color,
		//在这里填写echarts的option即可

	},
	//下面是自定义配置，请添加项目所需的通用配置
	"column": {
		"color": color,
		"title": {
			"text": ''
		},
		"tooltip": {
			"trigger": 'axis'
		},
		"grid": {
			"top": 30,
			"bottom": 50,
			"right": 15,
			"left": 40
		},
		"legend": {
			"left": 'left',
			"padding": [0, 0, 200, 0]
		},
		"toolbox": {
			"show": false,
		},
		"xAxis": {
			"type": 'category',
			"axisLabel": {
				"color": '#666666'
			},
			"axisLine": {
				"lineStyle": {
					"color": '#CCCCCC'
				}
			},
			"boundaryGap": true,
			"data": []
		},
		"yAxis": {
			"type": 'value',
			"axisTick": {
				"show": false,
			},
			"axisLabel": {
				"color": '#666666'
			},
			"axisLine": {
				"show": false,
				"lineStyle": {
					"color": '#CCCCCC'
				}
			},
		},
		"seriesTemplate": {
			"name": '',
			"type": 'bar',
			"data": [],
			"barWidth": 30,
			"label": {
				"show": false,
				"color": "#666666",
				"position": 'top',
			},
		},
	},
	"line": {
		"color": color,
		"title": {
			"text": ''
		},
		"tooltip": {
			"trigger": 'axis'
		},
		"grid": {
			"top": 30,
			"bottom": 50,
			"right": 15,
			"left": 40
		},
		"legend": {
			"bottom": 'left',
		},
		"toolbox": {
			"show": false,
		},
		"xAxis": {
			"type": 'category',
			"axisLabel": {
				"color": '#666666'
			},
			"axisLine": {
				"lineStyle": {
					"color": '#CCCCCC'
				}
			},
			"boundaryGap": true,
			"data": []
		},
		"yAxis": {
			"type": 'value',
			"axisTick": {
				"show": false,
			},
			"axisLabel": {
				"color": '#666666'
			},
			"axisLine": {
				"lineStyle": {
					"color": '#CCCCCC'
				}
			},
		},
		"seriesTemplate": {
			"name": '',
			"type": 'line',
			"data": [],
			"barwidth": 20,
			"label": {
				"show": true,
				"color": "#666666",
				"position": 'top',
			},
		},
	},
	"area": {
		"color": color,
		"title": {
			"text": ''
		},
		"tooltip": {
			"trigger": 'axis',
		},
		"grid": {
			"top": 50,
			"bottom": 30,
			"right": 60,
			"left": 60
		},
		"legend": {
			"type": 'scroll',
			"orient": 'horizontal',
			"left": 'left',
			"padding": [0, 30, 10, 30],
			"itemGap": 20
		},
		"toolbox": {
			"show": false,
		},
		"xAxis": {
			"type": 'category',
			"axisLabel": {
				"color": '#666666'
			},
			"axisLine": {
				"lineStyle": {
					"color": '#CCCCCC'
				}
			},
			"boundaryGap": false,
			"data": []
		},
		"yAxis": {
			"type": 'value',
			"axisTick": {
				"show": false,
			},
			"axisLabel": {
				"color": '#666666'
			},
			"axisLine": {
				"show": false,
				"lineStyle": {
					"color": '#CCCCCC'
				}
			},
		},
		"notMerge": true,
		"seriesTemplate": color.map(item => {
			return {
				"data": [],
				"type": 'line',
				"name": "",
				"color": item,
				"smooth": true,
				// "showSymbol": false,
				"areaStyle": {
					"color": {
						"x": 0,
						"y": 0,
						"x2": 0,
						"y2": 1,
						"colorStops": [{
							"offset": 0,
							"color": item, // 0% 处的颜色
						}, {
							"offset": 1,
							"color": '#FFFFFF' // 100% 处的颜色
						}],
						"global": false // 缺省为 false
					}
				},
				"label": {
					"show": false,
					"color": "#666666",
					"position": 'top',
				},
			}
		})
	},
	"pie": {
		"color": color,
		"title": {
			"text": ''
		},
		"tooltip": {
			"trigger": 'item'
		},
		"grid": {
			"top": 40,
			"bottom": 30,
			"right": 15,
			"left": 15
		},
		"legend": {
			"bottom": 'left',
		},
		"seriesTemplate": {
			"name": '',
			"type": 'pie',
			"data": [],
			"radius": '50%',
			"avoidLabelOverlap": "true",
			"label": {
				"show": true,
				"color": "#666666",
				"position": 'top',
			},
		},
	},
	"ring": {
		"color": color,
		"title": {
			"text": ''
		},
		"tooltip": {
			"trigger": 'item'
		},
		"grid": {
			"top": 0,
			"bottom": 0,
			"right": 15,
			"left": 15
		},
		"legend": {
			"type": "scroll",
			"top": 'left'
		},
		"seriesTemplate": {
			"name": '',
			"type": 'pie',
			"data": [],
			"radius": ['30%', '45%'],
			"avoidLabelOverlap": true,
			"label": {
				"show": true,
				"color": "#666666",
				"position": "bottom",
			},
			"labelLine": {
				"show": true
			},
		},
	},
	"rose": {
		"color": color,
		"title": {
			"text": ''
		},
		"tooltip": {
			"trigger": 'item'
		},
		"legend": {
			"top": 'bottom'
		},
		"seriesTemplate": {
			"name": '',
			"type": 'pie',
			"data": [],
			"radius": "55%",
			"center": ['50%', '50%'],
			"rosetype": 'area',
		},
	},
	"funnel": {
		"color": color,
		"title": {
			"text": ''
		},
		"tooltip": {
			"trigger": 'item',
			"formatter": "{b} : {c}%"
		},
		"legend": {
			"top": 'bottom'
		},
		"seriesTemplate": {
			"name": '',
			"type": 'funnel',
			"left": '10%',
			"top": 60,
			"bottom": 60,
			"width": '80%',
			"min": 0,
			"max": 100,
			"minSize": '0%',
			"maxSize": '100%',
			"sort": 'descending',
			"gap": 2,
			"label": {
				"show": true,
				"position": 'inside'
			},
			"labelLine": {
				"length": 10,
				"lineStyle": {
					"width": 1,
					"type": 'solid'
				}
			},
			"itemStyle": {
				"bordercolor": '#fff',
				"borderwidth": 1
			},
			"emphasis": {
				"label": {
					"fontSize": 20
				}
			},
			"data": [],
		},
	},
	"gauge": {
		"color": color,
		"tooltip": {
			"formatter": '{a} <br/>{b} : {c}%'
		},
		"seriesTemplate": {
			"name": '业务指标',
			"type": 'gauge',
			"detail": {
				"formatter": '{value}%'
			},
			"data": [{
				"value": 50,
				"name": '完成率'
			}]
		},
	},
	"candle": {
		"xAxis": {
			"data": []
		},
		"yAxis": {},
		"color": color,
		"title": {
			"text": ''
		},
		"dataZoom": [{
				"type": 'inside',
				"xAxisIndex": [0, 1],
				"start": 10,
				"end": 100
			},
			{
				"show": true,
				"xAxisIndex": [0, 1],
				"type": 'slider',
				"bottom": 10,
				"start": 10,
				"end": 100
			}
		],
		"seriesTemplate": {
			"name": '',
			"type": 'k',
			"data": [],
		},
	}
}

function deviceWidth() {
	const device = uni.getSystemInfoSync()
	const type = cfe.area
	if (device.windowWidth < 500) {
		type.grid = {
			right: 20,
			left: 50
		}
		type.seriesTemplate.forEach(item => {
			item.showSymbol = false
		})
	}
}

deviceWidth()

export default cfe;
