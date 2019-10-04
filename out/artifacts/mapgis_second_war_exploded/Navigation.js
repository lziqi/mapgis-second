document.write("<script language=javascript src='OnLoad.js'></script>");

document.write("<script language=javascript src='libs/jquery-1.11.2.min.js'></script>");


var map;

function addMainLine(lineSet)
{
    // var map = jQuery('#mapCon').data('map');
    // jQuery('#mainHTML').attr('lineSet',lineSet);

    // jQuery('#mainHTML').contentWindow.postMessage("message","addMap.js");
    jQuery('#mainHTML')[0].contentWindow.addLineResponse();
}

var routePlanClick = function(startPoint,endPoint)
{
    var getRoute = function()
    {
        var polyline="";
        jQuery.ajax({
            url: "https://restapi.amap.com/v3/direction/driving",
            contentType: "charset=UTF-8",
            data: {
                // id: id,
                origin:"114.3976370000, 30.5202200000",
                destination:"114.4027120000, 30.5205530000",
                output:"json",
                key:"46633fd7f1a22c3d2d9249ade3abc44e"
            },
            async:false,
            type: "GET",
            dataType: "json",
            success: function(data)
            {
                // var polyline="";
                if(data.status == 1)
                {
                    let steps = data.route.paths[0].steps;
                    jQuery.each(steps, function(index)
                    {
                        polyline = polyline + steps[index].polyline +";";
                    });
                    polyline.substring(0,polyline.length-1);
                }
            }
        });
        return polyline;
    };
    var res = getRoute();
    // alert(res);
    // console.log(polyline);

    //地图显示线
    // jQuery("#mainHTML").contents().find("")
    //创建一个线
    document.getElementById("lineinfo").innerText = res;
    let longLangSet = res.split(";");
    let longLangNum = longLangSet.length;
    let lineSet = [];
    for(let i = 0;i<longLangNum;i++)
    {
        lineSet[i] = [longLangSet[i].split(",")[0],longLangSet[i].split(",")[1]];
    }

    // map = jQuery("#mainHTML").contents().find("#mapCon");
    // var iframe = document.getElementById("mainHTML");
    // var iframeWindow = iframe.contentWindow.document;
    // map = jQuery(iframeWindow).find("#mapCon").data("trueid");
    // map = jQuery('#MainHTML').contents().find('#mapCon');
    addMainLine(lineSet);
};