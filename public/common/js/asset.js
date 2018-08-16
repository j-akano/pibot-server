//---  1.5次
// ログアウトをajax化したためダイアログ背景抑止関連をcommon.jsより移動 2014/07/27
// Logout用関数追加	2014/07/27

$('document').ready(function(){


	/*ロールオーバー */
	$('.over').each(function(){
		$(this).hover(
			function(){
				var src = $(this).attr('src');
				var src_o = src.substr(0, src.lastIndexOf('.')) + '_on' + src.substring(src.lastIndexOf('.'));
				$(this).attr('src',src_o);
			},
			
			function(){
				var src = $(this).attr('src');
				$(this).attr('src',src.replace(/_on/,''));
			}
		);
		// preload
		var src = $(this).attr('src');
		$('<img src="'+src.substr(0, src.lastIndexOf('.')) + '_on' + src.substring(src.lastIndexOf('.'))+'"/>');
	});
	$('.overbg').each(function(){
		$(this).hover(
			function(){
				var src = $(this).css('background-image');
				var src_o = src.substr(0, src.lastIndexOf('.')) + '_on' + src.substring(src.lastIndexOf('.'));
				$(this).css('background-image',src_o);
			},
			
			function(){
				var src = $(this).css('background-image');
				$(this).css('background-image', src.replace(/_on/,''));
			}
		);
		// preload
		var src = $(this).css('background-image');
		$('<img src="'+src.substr(0, src.lastIndexOf('.')) + '_on' + src.substring(src.lastIndexOf('.'))+'"/>');
	});

	/*ロールオーバー フェードイン/アウト*/
	$(".hover").each(function(){
		$(this).hover(
			function(){$(this).fadeTo(10,0.6);},function(){$(this).fadeTo(300,1);}
		);
	});
	
	/* アンカー位置移動 */
	var anchor = document.location.hash;
	if(anchor != ''){
		var top = parseInt($(anchor).offset().top, 10);
		if(top > 45 ) {
			top = top - 45;
		}
		$('html,body').animate({scrollTop: top}, 100);
	}
	
	$('a[href^=#]').click(function(){
		if($(this).attr('class') != 'tab'){
			var href = $(this).attr("href");
			var target = $(href == "#" || href == "" ? 'html' : href);
			var top = parseInt(target.offset().top, 10);
			if(top > 45 ) {
				top = top - 45;
			}
			$('html,body').animate({scrollTop: top}, 100);
			return false;
		}
	});
	
	$('#header-button').on('click', function(evt) {
		var $c = $('#header-pulldown');
		var $b = $('#header-pulldown-body');
		if ($c.height() == 0) {
			$c.animate({height:$b.innerHeight()+'px'}, 400, 'swing');
		} else {
			$c.animate({height:'0px'}, 400, 'swing');
		}
	});
	

	$(document).keydown(function(evt){
		if (evt.which != 13) {
			// Enterキー以外でなければ何もしない
			return;
		}
		switch (document.activeElement.tagName.toLowerCase()) {
		case "a": {
			// <a>タグはデフォルトの処理を行う
			break;
		}
		case "input": {
			var ae = document.activeElement;
			if ($(ae).attr('type') && $(ae).attr('type').toLowerCase() == "image") {
				// <input type="image">タグ はデフォルトの処理を行う
				break;
			}
			if (ae.id == "txSearchKw") {
				// 商品名検索キーワード入力ボックス
				evt.preventDefault();
				$('#btnSearchKw').click();
				return;
			} else if ($(ae).hasClass("order_box")) {
				// 各種一覧、詳細の数量入力
				var $order_btn = $(ae).parents('.orderset').find('input.order_btn');
				if ($order_btn.length > 0) {
					evt.preventDefault();
					$order_btn.click();
					return;
				}
			} else if (ae.id == "txSuu") {
				// 注文内容変更の数量入力
				var $order_btn = $(ae).parents('.henkoubox').find('.wrap_btm a');
				if ($order_btn.length > 0) {
					evt.preventDefault();
					$order_btn.click();
					return;
				}
			} else if ($(ae).parents('form').length > 0) {
				// フォーム内の<input>タグはデフォルトの処理を行う
				break;
			} else {
				// 商品検索ボタンが押されたことになるのを回避するためにデフォルトの処理をキャンセル
				evt.preventDefault();
			}
			break;
		}
		default: {
			// 商品検索ボタンが押されたことになるのを回避するためにデフォルトの処理をキャンセル
			evt.preventDefault();
			break;
		}
		}
	});
	
	// トップスクロールボタンスタイル設定
	$('#float_scroll_top').css({
		"position":"fixed",
		"top":"50%",
		"left":"50%",
		"margin-left":"440px",
		"opacity":"0.8",
		"display":"none"
	}).hover(function(){
		$(this).animate({opacity:1}, 300);
	}, function(){
		$(this).animate({opacity:0.8}, 300);
	});
	// トップスクロールボタン状態更新
	function updateFloatScrollTopBtn(){
		var $btn = $('#float_scroll_top');
		var $wnd = $(window);
		if ($wnd.scrollTop() >= $wnd.height()*0.25){
			// 1/4画面分以上スクロールしていたら、ボタンを表示する
			$btn.css('display','block');
		} else {
			$btn.css('display','none');
		}
	}
	// ウインドウリサイズ、スクロールでトップスクロールボタンの表示状態更新
	$(window)
		.on('scroll', updateFloatScrollTopBtn)
		.on('resize', updateFloatScrollTopBtn);
	
	// 他のページに遷移する前に通信中メッセージを消す
	$(window).on('unload', function(evt) {
		removeAct();
		$('#actMsgBox').css('display', 'none');
	});
	$(window).on('pagehide', function(evt) {
		removeAct();
		$('#loadingMsgBox').css('display', 'none');
	});
	$(window).on('pagehide', function(evt) {
		removeAct();
		$('#actOrderOK').css('display', 'none');
	});
	// 通信中メッセージ作成
	var $actmsg = $('<div id="actMsgBox"><div class="inner"><table><tr><td>通信中...</td></tr></table></div></div>');
	$(document.body).append($actmsg);
	$actmsg.css('display','none');
	// 「ページ読込中」メッセージ作成
	var $loadingmsg = $('<div id="loadingMsgBox"><div class="inner"><table><tr><td>ページ読込中...</td></tr></table></div></div>');
	$(document.body).append($loadingmsg);
	$loadingmsg.css('display','none');
	// 注文受付メッセージ作成
	var $actOrderOK = $('<div id="actOrderOK"><div class="inner"><table><tr><td id="okshnmei">商品名</td></tr></table></div></div>');
	$(document.body).append($actOrderOK);
	$actOrderOK.css('display','none');
	// preload
	var preloadArray = ["dialogbox_bg_top.png","dialogbox_bg_bottom.png","dialogbox_bg_top_err.png","dialogbox_bg_bottom_err.png","dialogbox_pic1.png","dialogbox_pic_err.png","dialogbox_btn_yes.png","dialogbox_btn_no.png","dialogbox_close_l.png","gnavi_categorybox.png","gnavi_categorybox_body.png"];
	for (k in preloadArray) {
		$('<img src="'+baseUrl()+'common/images/'+preloadArray[k]+'"/>');
	}
});


//---   ログアウトをajax化したためcommom.jsより移動　（全画面で使用のため）
// 通信中　二度押し防止用レイヤー表示（ほとんど透明）
var dlgz = 2000;
var bkbgid = [];

/**
 * 画面遷移時のクリック防止レイヤー表示
 */
function showOpenUrlBg(){
	var $overlay = $('<div id="act"></div>');
	$overlay.css({
		"background-color": "black",
		"position": "fixed",
		"top": "0",
		"right": "0",
		"bottom": "0",
		"left": "0",
		"opacity": "0.1",
		"z-index": 999999
	});
	$(document.body).append($overlay);
}

/**
 * 通信中表示
 */
function showAct() {
	//2014/06/02 add st
	var $actnow = document.activeElement; 
	if ($actnow != null) {
		var a = document.activeElement.tagName.toLowerCase();
		if (a == "html" || a == "body"){
		}
		else{
			$actnow.blur();
		}
	}
	//2014/06/02 add end ->
	var $overlay = $('<div id="act"></div>');
	$overlay.css({
		"background-color": "black",
		"position": "fixed",
		"top": "0",
		"right": "0",
		"bottom": "0",
		"left": "0",
		"opacity": "0.1",
		"z-index": 1000
	});
	$(document.body).append($overlay);
	$('#actMsgBox').css('display', 'block');
}
// 注文受付ダイアログ
function showOrderok(_shnmei) {
	//2014/06/02 add st
	var $actnow = document.activeElement; 
	if ($actnow != null) {
		var a = document.activeElement.tagName.toLowerCase();
		if (a == "html" || a == "body"){
		}
		else{
			$actnow.blur();
		}
	}
	//2014/06/02 add end ->
	var $okshnmei = $('#okshnmei');
	$okshnmei.html( _shnmei + "<br />ご注文を受付けました。");
	var $overlay = $('<div id="act"></div>');
	$overlay.css({
		"background-color": "black",
		"position": "fixed",
		"top": "0",
		"right": "0",
		"bottom": "0",
		"left": "0",
		"opacity": "0.02",
		"z-index": 1000
	});
	$(document.body).append($overlay);
	$('#actOrderOK').css('display', 'block');
	setTimeout(function(){removeActOrder()},1500);
}
/**
 * クリック防止用レイヤーを表示して、指定URLに遷移する
 */
function openUrl(url) {
	//2014/06/02 add st
	var $actnow = document.activeElement; 
	if ($actnow != null) {
		var a = document.activeElement.tagName.toLowerCase();
		if (a == "html" || a == "body"){
		}
		else{
			$actnow.blur();
		}
	}
	//2014/06/02 add end ->
	showOpenUrlBg();
	$('#loadingMsgBox').css('display', 'block');
	if (url.match(/^https?:\/\//)) {
		window.open(url, "_self");
	} else {
		window.open(baseUrl()+url, "_self");
	}
}
function showActDark() {
	var $overlay = $('<div id="act"></div>');
	$overlay.css({
		"background-color": "black",
		"position": "fixed",
		"top": "0",
		"right": "0",
		"bottom": "0",
		"left": "0",
		"opacity": "0.1",
		"z-index": 1000
	});
	$(document.body).append($overlay);
}

//通信中　二度押し防止用レイヤーを消す
function removeAct() {
	$('#act').remove();
	$('#actMsgBox').css('display', 'none');
}
function removeActOrder() {
	$('#act').remove();
	$('#actOrderOK').css('display', 'none');
}

// ダイアログの外側を触れなくするためのレイヤー表示（ほとんど透明）
function showBg() {
	var id="bkbg"+dlgz;
	var $overlay = $('<div id="'+id+'"></div>');
	$overlay.css({
		"background-color": "white",
		"position": "fixed",
		"top": "0",
		"right": "0",
		"bottom": "0",
		"left": "0",
		"opacity": "0.01",
		"z-index": dlgz++
	});
	bkbgid.push(id);
	$(document.body).append($overlay);
}

//ダイアログの外側を触れなくするためのレイヤーを消す
function removeBg() {
	var id = bkbgid.pop();
	$('#'+id).remove();
	dlgz--;
}


//--------------------------各種共通リンク
//   共通エラー処理
function cmnError(errCode,errMsg) {
//エラーコード判別
	switch ('' + errCode) {
		case '-1':
			// 2重ログインエラー
			openUrl('html/error/double.html');
			break;					
		case '-2': 
				// セッションタイムアウト
				openUrl('html/error/timeout.html');
			break;
		case '-3':	// ERR_DENIED_ORDER
		case '-7':	// ERR_CANNOT_DATA
		case '-8':	// ERR_CANNOT_CONNECT
		case '-9':	// ERR_INCOLLECT_DATA
			showErrorDlg('エラー', errMsg, function() {
				// システムエラー表示
				openUrl('syserr');
			});
			break;
		default:{
			//その他のエラーは各画面内に戻って処理
				return true;
		}
	}
  return false;
}

function baseUrl() {
	return window.location.href.replace(/^(https?:\/\/[^\/]+\/[^\/]+\/)(.*)/, '$1');
}
function Logout() {
	  showAct();
	  $.ajax({
		"type": "POST",
		"url": "logout",
		"data": {},
		"dataType": "json",
		"success": function (data, textStatus, jqHXR) {
			var h = data.header;
			var a = data.applData;
			removeAct();
			switch (''+h.returnCode) {
				case '2':{
				//チェックボックス付完了画面の表示 
					LogoutForm();
					break;
					}
				case '3': {
				//メール有効化の警告メッセージ
         showMailConfirm();
					break;
					}
				default:{
    			window.location.href=baseUrl()+"login.html"
					break;
				}
			}
		},
		"error": function( jqXHR, textStatus, errorThrown){
					window.location.href=baseUrl()+"login.html"  //エラーもログイン画面へ
		}
	  });
		
}
function LogoutForm() {
	// フォーム作成
	var dlg = '<div class="henkoubox" id="logoutok">';
	dlg += '<div class="wrap">';
	dlg += '<div class="logout">';
	dlg += '<h1>●注文内容をメールで送信しました。●</h1>';
	dlg += '<h2>以後、このメッセージを表示したくない場合は、<br />';
	dlg += '下のチェックボックスにチェックを入れて<br />';
	dlg += '【閉じる】をクリックしてください。</h2>';

	dlg += '<p class="msg"><label><input name="sendflg" type="checkbox" class="numcheck sendflg" value="3" />&nbsp;以後、このメッセージを表示しない。</label></p>';
	dlg += '</div>';
	dlg += '<p class="copy jisage">※ログアウト時に注文内容をメールで送る、送らないは、登録情報の変更で設定できます。</p>';
	dlg += '</div>';
	dlg += '<div class="wrap_btm"><a href="javascript:void(0)"  id="btn_logoutOK_close"><img src="common/images/dialogbox_close_l.png" class="hover" alt="閉じる" /></a>';
	dlg += '</div>';
	dlg += '</div>';
	showBg();
	var $dlg = $(dlg);

	$dlg.css({
    	"top": ($(document).scrollTop()+80)+"px",
    	"z-index": dlgz++,
    	"display": "block"
	});
	$('#wrapper').append($dlg);
	$('#btn_logoutOK_close').on('click', function(evt) {
		var sendflg = $('.sendflg');
		var sendflgval =0;
		if (sendflg.is(':checked')) {
       sendflgval = 3;
		}
		$('#logoutok').remove();

		dlgz--;
		removeBg();
    if (sendflgval == 3) {
				set_logoutmail();
		}else{
    		window.location.href=baseUrl()+"login.html"
		}
	});
}
function set_logoutmail() {
	  showAct();
//注文内容は送らない設定固定なのでdataの中身なし
	  $.ajax({
		"type": "POST",
		"url": "logout/mailflg_set",
		"data": {},
		"dataType": "json",
		"success": function (data, textStatus, jqHXR) {
			window.location.href=baseUrl()+"login.html"  //結果は無視してログイン画面へ
		},
		"error": function( jqXHR, textStatus, errorThrown){
				window.location.href=baseUrl()+"login.html"  //エラーもログイン画面へ
		}
	  });
		
}
function showMailConfirm() {
	// フォーム作成
	var dlg = '<div class="henkoubox" id="mailconfirm">';
	dlg += '<div class="wrap">';
	dlg += '<p class="henkou_kanryou font14">メールアドレスが未登録または、有効化手続きが未了の為、注文内容メールの送信は行っていません。<br />';
	dlg += '<br />';
	dlg += 'メールアドレスの登録・有効化手続きについては、<br />';
	dlg += 'GCwebのログイン後＞「登録情報の変更」＞「メールアドレスの変更＆有効化手続き」';
	dlg += 'から設定を行ってください。';

	dlg += '</p>';
	dlg += '</div>';
	dlg += '<div class="wrap_btm"><a href="javascript:void(0)" id="btn_showMailConfirm"><img src="common/images/dialogbox_close_l.png" class="hover" alt="閉じる" /></a>';
	dlg += '</div>';
	dlg += '</div>';

	showBg();
	var $dlg = $(dlg);

	$dlg.css({
    	"z-index": dlgz++,
    	"display": "block"
	});
	$('#wrapper').append($dlg);
	$('#btn_showMailConfirm').on('click', function(evt) {
		$('#mailconfirm').remove();
		dlgz--;
		removeBg();
    window.location.href=baseUrl()+"login.html"

	});
return;
}

//ご利用ガイドの表示
function openwinGuide (){
  newwin=window.open(baseUrl()+"html/guide3/HTML5/pc.html#/page/1","GuideWindow","toolbar=1,directories=0,menubar=1,location=0,status=1,scrollbars=1,resizable=1,copyhistory=0,width=1004,height=850");

}
//ログインヘルプ
function openwinHelp (){
//  alert("ログインヘルプを表示します");
	window.open(baseUrl()+'html/help/loginhelp.html', '_self');

}
function openwinKiyaku (){
	window.open(baseUrl()+'html/annai/kiyaku.html', '_blank');
}
function openwinPrivacy (){
	window.open(baseUrl()+'html/annai/privacy.html', '_blank');

}
function openwinStory (){
  alert("商品物語を表示します");

}
function openwinNewsList (){
	window.open(baseUrl()+'html/news/index.html', '_blank');

}
function openwinKantan (){
	window.open('http://www.greencoop.or.jp/gckantan/index.html', '_blank');


}
function openwinSP (){
	window.open(baseUrl()+'sp_mypage', '_self');

}
function openwinScroll (){
   newwin=window.open("link_scroll","ScrollWindow","toolbar=1,directories=0,menubar=1,location=0,status=1,scrollbars=1,resizable=1,copyhistory=0,width=1016,height=850");

}
function openwinScroll_test (){
   newwin=window.open("link_scroll/honban","ScrollWindow2","toolbar=1,directories=0,menubar=1,location=0,status=1,scrollbars=1,resizable=1,copyhistory=0,width=1016,height=850");

}

