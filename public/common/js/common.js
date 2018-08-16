/**
 * 数値フォーマット　3桁ごとのカンマ区切り編集
 * @param v　数値
 * @returns 編集結果
 */
function num_format(v) {
	var s = ''+parseInt(v, 10);
	var r = '';
	while (s.length > 3) {
		r = ','+s.substr(s.length-3)+r;
		s = s.substr(0, s.length-3);
	}
	r = s + r;
	return r;
}

/**
 * FIT表示レイアウト計算
 * @param ow	外枠の幅
 * @param oh	外枠の高さ
 * @param iw	表示対象の幅
 * @param ih	表示対象の高さ
 * @returns 計算結果 left:左, top:上, width:幅, height:高さ
 */
function calcfitrect(ow, oh, iw, ih) {
	var fw = iw;
	var fh = ih;
	if (iw > ow || ih > oh) {
		var mw = iw / ow;
		var mh = ih / oh;
		if (mw > mh) {
			fw = ow;
			fh = parseInt(ih/mw, 10);
		} else {
			fw = parseInt(iw/mh, 10);
			fh = oh;
		}
	}
	var fl = parseInt((ow-fw)/2, 10);
	var ft = parseInt((oh-fh)/2, 10);
	return { left:fl, top:ft, width:fw, height:fh };
}

/**
 * カテゴリ選択ダイアログを表示する
 */
function showCategoryDlg(){
	// ダイアログの外側を触れなくするためのレイヤーを表示
	showBg();
	// カテゴリ選択ボックス表示
	$('#gnavi_categorybox').css({"z-index":dlgz++}).addClass('open');
}

/**
 * カテゴリ選択ダイアログを消す
 */
function hideCategoryDlg(){
	// カテゴリ選択ボックス非表示
	$('#gnavi_categorybox').removeClass('open');
	// ダイアログの外側を触れなくするためのレイヤーを消す
	removeBg();
}

/**
 * 商品名検索を実行する
 */
function kwsearch() {
	var kw = $('#txSearchKw').val();
	openUrl(baseUrl()+"list_catalog/search/1/15/"+encodeURIComponent(kw));
}

/**
 * 注文済みナビ 表示更新
 * @param order	注文内容データ
 */
function updatePriceBox(order) {
	if (cur_gou_key in order && order[cur_gou_key].sumsuu>0) {
		var o = order[cur_gou_key];
		// 合計欄更新
		$('#onav_sumsuu').text(num_format(o.sumsuu));
		$('#onav_sumhontai').text(num_format(o.sumhontai));
		$('#onav_sumzeikomi').text(num_format(o.sumzeikomi));
		// 注文済み商品一覧更新
		var $ul = $('#onav_orderlist');
		// 一覧クリア
		$ul.children().remove();
		// 行追加
		for (var k in o.orderitem) {
			var item = o.orderitem[k];
			var li = '<li><span class="mnum">'+item.mou_no+'</span><span class="tani">'+item.suu+'点</span><p class="pname">'+item.shnname+'</p></li>';
			$ul.append(li);
		}
		// 注文無し非表示
		$('#onav_empty').css('display','none');
		$('#onav_sumsuubox').css('display','block');
		$('#onav_sumhontaibox').css('display','block');
		$('#onav_sumzeikomibox').css('display','block');
		$('#onav_orderlist').css('display','block');
	} else {
		// 注文無し
		// 合計欄更新
		$('#onav_sumsuu').text('0');
		$('#onav_sumhontai').text('0');
		$('#onav_sumzeikomi').text('0');
		// 注文済み商品一覧更新
		var $ul = $('#onav_orderlist');
		// 一覧クリア
		$ul.children().remove();
		// 注文無し表示
		$('#onav_empty').css('display','block');
		$('#onav_sumsuubox').css('display','none');
		$('#onav_sumhontaibox').css('display','none');
		$('#onav_sumzeikomibox').css('display','none');
		$('#onav_orderlist').css('display','none');
	}
}

function sendOrderMail() {
	showAct();

	$.ajax({
		"type": "POST",
		"url": "send_order_mail",
		"data": {},
		"dataType": "json",
		"success": function (data, textStatus, jqHXR) {
			var h = data.header;
			var a = data.applData;
			if (h.returnCode == "0") {
				// 正常 
				showMsgBox('ご確認', '注文内容を記載したメールを、ご登録のメールアドレスに送信しました。', null);
			} else {
				// TODO:エラー処理
				showErrorDlg('エラー', h.errMsg, null);
			}
			removeAct();
		},
		"error": function( jqXHR, textStatus, errorThrown){
			openUrl(baseUrl()+'syserr');
		}
	});

}

function showAgeVerifyDlg(_cnm, _cb_yes, _cb_no) {
	var dlg = '<div id="agecheckbox" class="agecheckbox">';
	dlg += '<div class="wrap">';
	dlg += '<h1>お酒のご注文は、<br />';
	dlg += _cnm+'が承ります。</h1>';
	dlg += '<p class="msg1">年齢認証が必要です。</p>';
	dlg += '<p class="msg2">20歳以上ですか？</p>';
	dlg += '</div>';
	dlg += '<div class="wrap_btm">';
	dlg += '<a href="javascript:void(0)" id="btn_ageverify_no">';
	dlg += '<img src="common/images/dialogbox_btn_no.png" alt="いいえ" class="hover" />';
	dlg += '</a>';
	dlg += '<a href="javascript:void(0)" id="btn_ageverify_yes">';
	dlg += '<img src="common/images/dialogbox_btn_yes.png" class="hover" alt="はい" />';
	dlg += '</a>';
	dlg += '<div class="msg3"><p>20歳未満のアルコール類の購入や飲酒は<br />法律で禁止されています。<br />法令に基づき年齢確認をさせていただいています。</p></div>';
	dlg += '</div>';
	dlg += '</div>';
	
	showBg();
	var $dlg = $(dlg);
	$dlg.css({
    	"z-index": dlgz++,
    	"display": "block"
	});
	$('#wrapper').append($dlg);
	setTimeout(function(){
		$('#btn_ageverify_no').focus();
	},1);
	$('#btn_ageverify_yes').on('click', function(evt) {
		$('#agecheckbox').remove();
		dlgz--;
		removeBg();
		_cb_yes();
	});
	$('#btn_ageverify_no').on('click', function(evt) {
		$('#agecheckbox').remove();
		dlgz--;
		removeBg();
		if (_cb_no != null) {
			_cb_no();
		}
	});
}


function showErrorDlg(_title, _errmsg, _cb_close) {
	var dlg = '<div id="error_dlg" class="henkoubox">';
	dlg += '<div class="wrap_err">';
	dlg += '<p class="err">';
	dlg += '<span class="stt">'+_title+'</span>';
	dlg += '<span class="txt">'+_errmsg.replace(/\n/g, '<br/>')+'</span>';
	dlg += '</p>';
	dlg += '</div>';
	dlg += '<div class="wrap_btm_err">';
	dlg += '<a href="javascript:void(0)" id="btn_errdlg_close">';
	dlg += '<img src="common/images/dialogbox_close_l.png" class="hover" alt="閉じる" />';
	dlg += '</a>';
	dlg += '</div>';
	dlg += '</div>';
	
	showBg();
	var $dlg = $(dlg);
	$dlg.css({
    	"z-index": dlgz++,
    	"display": "block"
	});
	$('#wrapper').append($dlg);
	setTimeout(function(){
		$('#btn_errdlg_close').focus();
	},1);
	$('#btn_errdlg_close').on('click', function(evt) {
		$('#error_dlg').remove();
		dlgz--;
		removeBg();
		if (_cb_close != null) {
			_cb_close();
		}
	});
}
function showMsgBox(_title, _msg, _cb_close) {
	
	var dlg = '<div id="alert_dlg" class="henkoubox">';
	dlg += '<div class="wrap">';
	dlg += '<p class="henkou_kanryou">';
	dlg += '<span class="stt">'+_title+'</span>';
	dlg += '<span class="txt">'+_msg.replace(/\n/g, '<br/>')+'</span>';
	dlg += '</p>';
	dlg += '</div>';
	dlg += '<div class="wrap_btm">';
	dlg += '<a href="javascript:void(0)" id="btn_msgbox_close">';
	dlg += '<img src="common/images/dialogbox_close_l.png" class="hover" alt="閉じる" />';
	dlg += '</a>';
	dlg += '</div>';
	dlg += '</div>';

	showBg();
	var $dlg = $(dlg);
	$dlg.css({
    	"z-index": dlgz++,
    	"display": "block"
	});
	$('#wrapper').append($dlg);
	setTimeout(function(){
		$('#btn_errdlg_close').focus();
	},1);
	$('#btn_msgbox_close').on('click', function(evt) {
		$('#alert_dlg').remove();
		dlgz--;
		removeBg();
		if (_cb_close != null) {
			_cb_close();
		}
	});
}

function showOrderOkDlg(_mou_no, _shnname, _suu) {
	var dlg = '<div id="orderok_dlg" class="allsetbox">';
	dlg += '<div class="wrap">';
	dlg += '<h6><span>ご注文を受付けました</span></h6>';
	dlg += '<table>';
	dlg += '<tr>';
	dlg += '<th>申込番号</th>';
	dlg += '<td>'+_mou_no+'</td>';
	dlg += '</tr>';
	dlg += '<tr>';
	dlg += '<th class="ss">商品名</th>';
	dlg += '<td class="ss">'+_shnname+'</td>';
	dlg += '</tr>';
	dlg += '<tr>';
	dlg += '<th>注文数</th>';
	dlg += '<td>'+_suu+'</td>';
	dlg += '</tr>';
	dlg += '</table>';
	dlg += '<p>※数量や割賦の設定は【注文内容を見る】画面で<br />　設定することができます。</p>';
	dlg += '</div>';
	dlg += '<div class="wrap_btm">';
	dlg += '<a href="javascript:void(0)" id="btn_orderok_close">';
	dlg += '<img src="common/images/btn_ok.png" alt="OK" class="hover" />';
	dlg += '</a>';
	dlg += '</div>';
	dlg += '</div>';

	showBg();
	var $dlg = $(dlg);
	$dlg.css({
    	"top": ($(document).scrollTop()+100)+"px",
    	"z-index": dlgz++,
    	"display": "block"
	});
	$('#wrapper').append($dlg);
	$('#btn_orderok_close').on('click', function(evt) {
		$('#orderok_dlg').remove();
		dlgz--;
		removeBg();
	});
}
function showConfirmDlg(_title, _msg, _cb_yes, _cb_no, _def_yes) {
	var dlg = '<div id="confirm_dlg" class="henkoubox">';
	dlg += '<div class="wrap">';
	dlg += '<p class="henkou_kanryou">';
	dlg += '<span class="stt">'+_title+'</span>';
	dlg += '<span class="txt">'+_msg.replace(/\n/g, '<br/>')+'</span>';
	dlg += '</p>';
	dlg += '</div>';
	dlg += '<div class="wrap_btm">';
	dlg += '<a href="javascript:void(0)" id="btn_confirm_no">';
	dlg += '<img src="common/images/dialogbox_btn_no.png" class="hover" alt="いいえ" />';
	dlg += '</a>';
	dlg += '<a href="javascript:void(0)" id="btn_confirm_yes">';
	dlg += '<img src="common/images/dialogbox_btn_yes.png" class="hover" alt="はい" />';
	dlg += '</a>';
	dlg += '</div>';
	dlg += '</div>';

	showBg();
	var $dlg = $(dlg);
	$dlg.css({
    	"z-index": dlgz++,
    	"display": "block"
	});
	$('#wrapper').append($dlg);
	if (typeof _def_yes !== "undefined" && _def_yes) {
		setTimeout(function(){
			$('#btn_confirm_yes').focus();
		},1);
	} else {
		setTimeout(function(){
			$('#btn_confirm_no').focus();
		},1);
	}
	$('#btn_confirm_yes').on('click', function(evt) {
		$('#confirm_dlg').remove();
		dlgz--;
		removeBg();
		_cb_yes();
	});
	$('#btn_confirm_no').on('click', function(evt) {
		$('#confirm_dlg').remove();
		dlgz--;
		removeBg();
		if (_cb_no != null) {
			_cb_no();
		}
	});
}

function showDetail(datakbn,mou_no) {
	if (typeof back_param === "undefined") {
		// 戻り先指定用変数未定義（マイページ）
		openUrl(baseUrl()+"detail/item/"+datakbn+"/"+mou_no);
	} else {
		// 戻り先指定用変数各種リスト系
		openUrl(baseUrl()+"detail/item/"+datakbn+"/"+mou_no+"/"+back_param);
	}
}

var fav_item = null;
function setFavorite(datakbn,mou_no) {
	fav_item = {"nen":cur_nen,"gou":cur_gou,"datakbn":datakbn,"mou_no":mou_no};
	showAct();
	$.ajax({
		"type": "POST",
		"url": "set_fav",
		"data": fav_item,
		"dataType": "json",
		"success": function (data, textStatus, jqHXR) {
			removeAct();
			var h = data.header;
			var a = data.applData;
			if (h.returnCode == "0") {
				// 正常
				// お気に入り登録済み状態にする
				$('a.setfav').each(function(idx){
					var a = this.id.split(/_/);
					if (fav_item.datakbn == a[1] && fav_item.mou_no == a[2]) {
						$(this).replaceWith('<img src="common/images/icon_favorite_off.png" alt="お気に入りに登録済み" />');
					}
				});
				showMsgBox('', 'お気に入りに登録しました。', null);
			} else {
				// TODO:エラー処理
				showErrorDlg('エラー', h.errMsg, null);
			}
		},
		"error": function( jqXHR, textStatus, errorThrown){
			openUrl('syserr');
		}
	});
}
////////////　　　注文内容確認画面でのお気に入り登録
function setFavoriteConf(datakbn,mou_no) {

//	"-"付の場合には下4桁を使用する
	fav_item = {"datakbn":datakbn,"mou_no":mou_no};
	if (mou_no.length > 6) {
      //
      
      set_mou_no = mou_no.substr(3, 4);
  }else{
      set_mou_no = mou_no;
	}
	set_fav_item = {"datakbn":datakbn,"mou_no":set_mou_no};
	showAct();
	$.ajax({
		"type": "POST",
		"url": "set_fav",
		"data": set_fav_item,
		"dataType": "json",
		"success": function (data, textStatus, jqHXR) {
			removeAct();
			var h = data.header;
			var a = data.applData;
			if (h.returnCode == "0") {
				// 正常
				// お気に入り登録済み状態にする
				$('a.setfav').each(function(idx){
					var a = this.id.split(/_/);
					if (fav_item.datakbn == a[1] && fav_item.mou_no == a[2]) {
//						$(this).replaceWith('<span>【お気に入り登録済み】</span>');
						$(this).replaceWith('');
					}
				});
				showMsgBox('', 'お気に入りに登録しました。', null);
			} else {
				// TODO:エラー処理
				showErrorDlg('エラー', h.errMsg, null);
			}
		},
		"error": function( jqXHR, textStatus, errorThrown){
			openUrl('syserr');
		}
	});
}
