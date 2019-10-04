
function $ ( selector, context ) {
	return ( context || document ).querySelector( selector );
}
function $$ ( selector, context ) {
	return [].slice.call( ( context || document ).querySelectorAll( selector ) );
}
// $$( ".button-box" ).forEach(function( el ) {
// 	if ( $$( "button", el ).length === 1 ) {
// 		$( "button", el ).style.cssText = "display:block;margin:0 auto;";
// 	}
// })

// $( "#container" ).style.display = "block";
// $$( "#button-box-1 button.shortcuts" ).forEach(function( btn, index ) {
// 	btn.onclick = function () {
// 		var type = [ "info", "success", "warn", "error" ];
// 		Dialog[ type[ index ] ]( type[ index ] + " 对话框", "内容区域" );
// 	}
// })
// $( "#shortcuts-ok-callback" ).onclick = function () {
// 	Dialog.info( "info 对话框", "内容区域" ).ok(function () {
// 		window.alert( "关闭了对话框" );
// 	})
// }
// $( "#shortcuts-ok-notclose" ).onclick = function () {
// 	Dialog.info( "info 对话框", "点击确定按钮后不会正常关闭对话框，此时需要手动调用关闭方法。（此示例中，点击确定 3 秒钟后关闭对话框）" ).okNotClose().ok(function ( okBtn ) {
// 		window.setTimeout(function () {
// 			Dialog.close();
// 		}, 3000);
// 	})
// }
// $( "#shortcuts-ok-notclose-with-word" ).onclick = function () {
// 	Dialog.info( "info 对话框", "点击确定按钮后不会正常关闭对话框，此时需要手动调用关闭方法。（此示例中，点击确定 3 秒钟后关闭对话框）" ).okNotClose().ok(function ( okBtn ) {
// 		okBtn.querySelector( "span" ).textContent = "3 秒后关闭...";
// 		okBtn.classList.add( "mini-dialog-ok-disabled" );
// 		window.setTimeout(function () {
// 			Dialog.close();
// 		}, 3000);
// 	})
// }
// $$( "#button-box-2 button" ).forEach(function( btn, index ) {
// 	btn.onclick = function () {
// 		switch ( index ) {
// 			case 0:
// 				Dialog( "内容" );
// 				break;
// 			case 1:
// 				Dialog( "标题", "内容" );
// 				break;
// 			case 2:
// 				Dialog( "标题", "内容", 800);
// 				break;
// 		}
// 	}
// })
// $$( "#button-box-3 button" ).forEach(function( btn, index ) {
// 	btn.onclick = function () {
// 		switch ( index ) {
// 			case 0:
// 				Dialog({
// 					title: "标题",
// 					content: "内容"
// 				});
// 				break;
// 			case 1:
// 				Dialog({
// 					title: "标题",
// 					content: "内容",
// 					width: 800
// 				});
// 				break;
// 			case 2:
// 				Dialog({
// 					title: "标题",
// 					content: "内容",
// 					contentBgColor: "#f5f5f5"
// 				});
// 				break;
// 		}
// 	}
// })
$( "#button-box-4 button" ).onclick = function () {
	this.textContent = "导航规划";
	Dialog({
		title: "两点间路线规划",
		content: "<input type='text' name='firsttrash' value=''><br><input type='text' name='secondtrash' value=''>",
		draggable: true,
		afterClose:function(){
			routePlanClick(1,2);
		}
	});
};
// $( "#button-box-4 p" ).onclick = function () {
// 	Dialog.close();
// }
// $( "#button-box-5 button" ).onclick = function () {
// 	Dialog({
// 		title: "标题",
// 		content: "内容",
// 		fullscreen: true
// 	});
// }
// $( "#button-box-6 button" ).onclick = function () {
// 	Dialog({
// 		title: "标题",
// 		content: "内容",
// 		autoClose: 5000
// 	});
// }
$( "#button-box-7 button" ).onclick = function ()
{
	Dialog({
		title: "1号垃圾点详情信息",
		width: 300,
		iframeContent: {
			src: "pop/sidebarPop.html",
			height: 500
		},
		showButton: false,
		draggable: true,
		scroll:false
	});
};

$( "#button-box-8 button" ).onclick = function ()
{
	Dialog({
		title: "2号垃圾点详情信息",
		width: 300,
		iframeContent: {
			src: "pop/sidebarPop2.html",
			height: 500
		},
		showButton: false,
		draggable: true,
		scroll:false
	});
};

$( "#button-box-9 button" ).onclick = function ()
{
	Dialog({
		title: "垃圾识别",
		width: 500,
		iframeContent: {
			src: "trashGraph.html",
			height: 500
		},
		showButton: false,
		draggable: true,
		scroll:false
	});
};

$( "#button-box-10 button" ).onclick = function ()
{
	Dialog({
		title: "垃圾识别",
		width: 500,
		iframeContent: {
			src: "trashGraph.html",
			height: 500
		},
		showButton: false,
		draggable: true,
		scroll:false
	});
};
// $( "#button-box-8 button" ).onclick = function () {
// 	Dialog({
// 		width: 1100,
// 		imageContent: {
// 			src: "1.jpg",
// 			height: 600
// 		},
// 		showButton: false,
// 		showTitle: false,
// 		maskClose: true
// 	});
// }
// $( "#button-box-9 button" ).onclick = function () {
// 	Dialog({
// 		width: 700,
// 		imageContent: {
// 			src: [ "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg" ],
// 			height: 400
// 		},
// 		showButton: false,
// 		showTitle: false,
// 		maskClose: true
// 	});
// }
// $( "#button-box-10 button" ).onclick = function () {
// 	Dialog({
// 		width: 800,
// 		videoContent: {
// 			src: "https://blz-videos.nosdn.127.net/1/HearthStone/f6cd63b590d416821d3e27e0.mp4",
// 			height: 450
// 		},
// 		showButton: false,
// 		showTitle: false,
// 		maskClose: true
// 	});
// }
// $( "#button-box-11 button" ).onclick = function () {
// 	Dialog({
// 		title: "标题",
// 		content: "内容",
// 		ok: {
// 			waiting: true,
// 			waitingText: "等一会",
// 			callback: function() {
// 				setTimeout(function() {
// 					Dialog.close();
// 				}, 3000)
// 			}
// 		}
// 	});
// }
// $( "#button-box-12 button" ).onclick = function () {
// 	Dialog({
// 		title: "标题",
// 		content: "内容",
// 		ok: {
// 			callback: function() {
// 				alert( "确定" );
// 			}
// 		},
// 		cancel: {
// 			callback: function() {
// 				alert( "取消" );
// 			}
// 		}
// 	});
// }
// $( "#button-box-13 button" ).onclick = function () {
// 	Dialog({
// 		title: "标题",
// 		content: "内容",
// 		afterOpen: function() {
// 			alert( "打开了对话框" );
// 		},
// 		afterClose: function() {
// 			alert( "关闭了对话框" );
// 		}
// 	});
// }
// $( "#button-box-14" ).onclick = function ( event ) {
// 	var cls = event.target.className;
// 	switch ( cls ) {
// 		case "a":
// 			Dialog({
// 				content: "隐藏了标题区域",
// 				showTitle: false
// 			});
// 		break;
// 		case "b":
// 			Dialog({
// 				title: "标题",
// 				content: "隐藏了标题区域",
// 				showButton: false
// 			});
// 		break;
// 		case "c":
// 			Dialog({
// 				content: "隐藏了标题和按钮，可以点击遮罩层关闭对话框。<br>此时可以最大程度上自定义对话框布局了。",
// 				showTitle: false,
// 				showButton: false,
// 				maskClose: true
// 			});
// 		break;
// 	}
// }
// $( "#waiting" ).onclick = function () {
// 	Dialog.waiting( "处理中，请等待..." );
// 	window.setTimeout(function () {
// 		Dialog.close();
// 	}, 3300)
// }
// $( "#waiting-countdown" ).onclick = function () {
// 	Dialog.waiting(function ( $text ) {
// 		var timer = null;
// 		var num = 6;
// 		var fn = function () {
// 			num--;
// 			$text.innerHTML = "处理中，请等待...<br>" + num;
// 			if ( !num ) {
// 				window.clearInterval( timer );
// 				Dialog.close();
// 			}
// 		}
// 		fn();
// 		timer = window.setInterval( fn, 1000 );
// 	});
// }