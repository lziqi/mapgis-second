//引入mapgis-ol库
document.write("<script language=javascript src='libs/MapGis_ol_product.js'></script>");
//引入jquery库
document.write("<script language=javascript src='libs/jquery-1.11.2.min.js'></script>");
//引入echarts
document.write("<script language=javascript src='http://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js'></script>");


function addLineResponse()
{
    let lineinfo = window.parent.document.getElementById("lineinfo").innerText;
    // alert(lineinfo);
    // let linePoint = [];

    lineinfo = lineinfo.substring(0,lineinfo.length-1);
    let longLangSet = lineinfo.split(";");
    let longLangNum = longLangSet.length;
    let lineSet = [];
    for(let i = 0;i<longLangNum;i++)
    {
        lineSet[i] = [Number(longLangSet[i].split(",")[0]),Number(longLangSet[i].split(",")[1])];
        lineSet[i] = ol.proj.fromLonLat([lineSet[i][0],lineSet[i][1]]);
    }

    addLine(lineSet);
}

function addLine(lineSet) {
    // let templine = new ol.Feature({
    //     geometry: new ol.geom.LineString([ol.proj.fromLonLat([114.3976306915,30.5192561211]), ol.proj.fromLonLat([114.4061493874,30.5186461177])])
    // });
    let templine = new ol.Feature({
        geometry: new ol.geom.LineString(lineSet)
    });


    //设置线的样式
    templine.setStyle(new ol.style.Style({
        //填充色
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        //边线颜色
        stroke: new ol.style.Stroke({
            color: '#000000',
            width: 5
        }),
        //形状
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            })
        })
    }));

    //实例化一个矢量图层Vector作为绘制层
    let source = new ol.source.Vector({
        features: [templine]
    });
    //创建一个图层
    let vector = new ol.layer.Vector({
        source: source
    });
    //将绘制层添加到地图容器中
    map.addLayer(vector);

    var aimPoint = lineSet[0];
    var view = map.getView();
    view.setCenter(aimPoint);
    view.setZoom(16);
}

function createLabelStyle(feature) {
    return new ol.style.Style({
        image: new ol.style.Icon(
            /** @type {olx.style.IconOptions} */
            ({
                //设置图标点
                anchor: [0.5, 60],
                //图标起点
                anchorOrigin: 'top-right',
                //指定x值为图标点的x值
                anchorXUnits: 'fraction',
                //指定Y值为像素的值
                anchorYUnits: 'pixels',
                //偏移
                offsetOrigin: 'top-right',
                // offset:[0,10],
                //图标缩放比例
                scale: 0.05,
                //透明度
                opacity: 0.75,
                //图标的url
                src: 'source/noun_combination_2750166.png'
            })),
        text: new ol.style.Text({
            //位置
            textAlign: 'center',
            //基准线
            textBaseline: 'middle',
            //文字样式
            font: 'normal 14px 微软雅黑',
            //文本内容
            text: feature.get('name'),
            //文本填充样式（即文字颜色）
            fill: new ol.style.Fill({ color: '#aa3300' }),
            stroke: new ol.style.Stroke({ color: '#ffcc33', width: 2 })
        })
    });
}


/**markerText
 * 动态创建popup的具体内容
 * @param {string} title
 */
function addFeatrueInfo(info) {
    var content = document.getElementById("popup-content");

    //为x新增blank空余一段
    var elementBlank = document.createElement("div");
    elementBlank.className = "markerBlank";
    content.appendChild(elementBlank);

    //x新增marker
    var elementMarker = document.createElement('div');
    elementMarker.className = "marker";
    content.appendChild(elementMarker);

    //新增a元素
    var elementA = document.createElement('a');
    elementA.className = "markerTitle";
    elementA.href = info.att.titleURL;
    //elementA.innerText = info.att.title;
    elementA.innerText = info.att.title;
    // 新建的div元素添加a子节点
    elementMarker.appendChild(elementA);
    //新增div元素
    // var elementDiv = document.createElement('div');
    // elementDiv.className = "markerText";
    // //elementDiv.innerText = info.att.text;
    // setInnerText(elementDiv, info.att.text);
    // // 为content添加div子节点
    // content.appendChild(elementDiv);
    //新增img元素
    var elementImg = document.createElement('img');
    elementImg.className = "markerImg";
    elementImg.src = info.att.imgURL;
    elementMarker.appendChild(elementImg);
    // 为content添加img子节点 content.appendChild(elementImg);


    //添加图标
    var elementGraph = document.createElement('div');
    elementGraph.id = "graph";
    elementGraph.className = "markerGraph";
    content.appendChild(elementGraph);


    for (var i = 0; i < 4; i++) {
        var elementRow = document.createElement("div");
        elementRow.className = "row";
        elementGraph.appendChild(elementRow);
    }


    //写title
    for (var i = 0; i < 4; i++) {
        var elementRow = elementGraph.children[i];
        //添加是哪种垃圾桶的title
        var elementTrashTitle = document.createElement("div");
        elementTrashTitle.className = "trashTitle";
        if (i == 0)
            elementTrashTitle.innerText = "可回收垃圾";
        else if (i == 1)
            elementTrashTitle.innerText = "厨余垃圾";
        else if (i == 2)
            elementTrashTitle.innerText = "其他垃圾";
        else if (i == 3)
            elementTrashTitle.innerText = "有害垃圾";

        elementRow.appendChild(elementTrashTitle);
        for (var j = 0; j < 3; j++) {
            var elementTrash = document.createElement("div");
            elementTrash.className = "trash";
            elementRow.appendChild(elementTrash);

            var elementTrashText = document.createElement("div");
            elementTrashText.className = "trashText";
            elementTrash.appendChild(elementTrashText);

            var elementTrashGraph = document.createElement("div");
            elementTrashGraph.className = "trashGraph";
            elementTrash.appendChild(elementTrashGraph);

        }
    }


    var data = info.att.text;
    var handledData = data.split("&");
    for (var i = 0; i < 4; i++) {
        if (handledData[i] == "-1")
            continue;
        var splitData = handledData[i].split("|");
        var trashNum = splitData.length;
        for (var j = 0; j < trashNum; j++) {
            var currentTrash = splitData[j].split(" ")[0];
            var allTrash = splitData[j].split(" ")[2];

            //寻找到对应的地点添加
            var tempRow = elementGraph.children[i];
            var tempTrash = tempRow.children[j + 1];
            var tempText = tempTrash.childNodes[0];
            tempText.innerText = (j + 1).toString() + "号垃圾桶";
            var tempGraph = tempTrash.childNodes[1];


            var dom = tempGraph;
            var myChart = echarts.init(dom);
            var option = null;
            var e = Math.round(currentTrash / allTrash * 100);

            option = {
                title: {
                    show: true,
                    text: e + '%',
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        fontSize: '8',
                        color: 'black',
                        fontWeight: 'normal'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{d}%",
                    show: false
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    show: false
                },
                series: {
                    name: '',
                    type: 'pie',
                    radius: ['65%', '85%'],
                    avoidLabelOverlap: true,
                    hoverAnimation: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [{
                        value: e,
                        name: ''
                    },
                        {
                            value: 100 - e,
                            name: ''
                        }
                    ]
                }

            };

            myChart.setOption(option);
        }
    }
}





/**
 * 动态设置元素文本内容（兼容）
 */
function setInnerText(element, text) {
    if (typeof element.textContent == "string") {
        element.textContent = text;
    } else {
        element.innerText = text;
    }
}


var data;

function getData(id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            data = xmlhttp.responseText;
        }
    };
    xmlhttp.open("GET", "/getTrashInfo?id=" + id, true);
    xmlhttp.send();
}

