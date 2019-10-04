//引入mapgis-ol库
document.write("<script language=javascript src='libs/MapGis_ol_product.js'></script>");
//引入jquery库
document.write("<script language=javascript src='libs/jquery-1.11.2.min.js'></script>");

//引入amap
// document.write("<script language=javascript src='https://webapi.amap.com/maps?v=1.4.15&key=1a6b1d09cfcd0ae34708c5fc2f003fc9'></script>");

// document.write("<script language=javascript src='https://cache.amap.com/lbs/static/addToolbar.js'></script>");

var map;




function Load()
{
    /**
     * 实例化Map对象加载地图,默认底图加载MapQuest地图
     */
    var gaodeMapLayer = new ol.layer.Tile({
        title: "高德地图",
        source: new ol.source.XYZ({
            url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
            wrapX: false
        })
    });




//设置高德地图图层属性
    map = new ol.Map({
        layers: [gaodeMapLayer],
        view: new ol.View({
            center: [12958752, 4848452],
            projection: 'EPSG:3857',
            zoom: 8,
            minZoom: 2
        }),
        target: 'mapCon',
    });
    $('#mapCon').data('map',map);


//添加一个控件
// var elementPort = document.createElement("div");
// elementPort.id = "LEFT";
// map.getViewport().appendChild(elementPort);
//     var viewport = map.getViewport();
//     $(viewport).append('<div id="LEFT">分享</div>');



    var point1 = ol.proj.fromLonLat([114.3976370000, 30.5202200000]);//114.3976370000,30.5202200000
    var point2 = ol.proj.fromLonLat([114.4027120000, 30.5205530000]);
//示例标注点北京市的信息对象
    var featureInfo = {
        geo: point1,
        att: {
            //标注信息的标题内容
            title: "1号垃圾桶",
            //标注详细信息链接
            titleURL: "http://www.baidu.com/s?wd=",
            //标注内容简介
            text: "a",
            //标注的图片
            imgURL: "source/current.jpg"
        }
    };
    var featureInfo2 = {
        geo: point2,
        att: {
            title: "2号垃圾桶",
            titleURL: "http://www.baidu.com/s?wd=",
            text: "b",
            imgURL: "source/trash2.jpg"
        }
    };
//实例化Vector要素，通过矢量图层添加到地图容器中
    var iconFeature1 = new ol.Feature({
        //坐标点
        geometry: new ol.geom.Point(point1),
        //名称属性
        id: 1,
        name: '1号垃圾桶'
    });
    var iconFeature2 = new ol.Feature({
        geometry: new ol.geom.Point(point2),
        id: 2,
        name: '2号垃圾桶'
    });
    iconFeature1.setStyle(createLabelStyle(iconFeature1));
    iconFeature2.setStyle(createLabelStyle(iconFeature2));
//矢量标注的数据源
    var vectorSource = new ol.source.Vector({
        features: [iconFeature1, iconFeature2]
    });
//矢量标注图层
    var vectorLayer = new ol.layer.Vector({
        source: vectorSource
    });
    map.addLayer(vectorLayer);

    /**
     * 实现popup的html元素
     */
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');

    /**
     * 在地图容器中创建一个Overlay
     */
    var popup = new ol.Overlay(
        /** @type {olx.OverlayOptions} */
        ({
            //要转换成overlay的HTML元素
            element: container,
            //当前窗口可见
            autoPan: true,
            //Popup放置的位置
            positioning: 'bottom-center',
            //是否应该停止事件传播到地图窗口
            stopEvent: false,
            autoPanAnimation: {
                //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度
                duration: 250
            }
        }));

    var mapTest = $('#mapCon').data('map');
    mapTest.addOverlay(popup);

    /**
     * 添加关闭按钮的单击事件（隐藏popup）
     * @return {boolean} Don't follow the href.
     */
    closer.onclick = function () {
        //未定义popup位置
        popup.setPosition(undefined);
        //失去焦点
        closer.blur();
        return false;
    };

    /**
     * 为map添加点击事件监听，渲染弹出popup
     */
    map.on('click', function (evt) {
        //判断当前单击处是否有要素，捕获到要素时弹出popup
        var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) { return feature; });
        if (feature) {
            //清空popup的内容容器
            content.innerHTML = '';
            //在popup中加载当前要素的具体信息2
            getData(feature.values_.id);
            if (!data == "") {
                //var splitData = data.split("&");
                var recycleData = data.split("&")[0];
                var kitchenData = data.split("&")[1];
                var otherData = data.split("&")[2];
                var harmData = data.split("&")[3];

                featureInfo.att.text = "";
                var featureText = "";
                featureInfo.att.title = feature.values_.id;
                featureInfo.att.title += "号垃圾桶";
                featureText = data;


                featureInfo.att.text = featureText;
                addFeatrueInfo(featureInfo);
                if (popup.getPosition() == undefined) {
                    //设置popup的位置
                    popup.setPosition(featureInfo.geo);
                }
            }

        }
    });
    /**
     * 为map添加鼠标移动事件监听，当指向标注时改变鼠标光标状态
     */
    map.on('pointermove', function (e) {
        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });

    var view = map.getView();
    view.setCenter(point1);

}