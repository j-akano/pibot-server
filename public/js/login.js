var hostnmstr = location.hostname;
var SSL = (("https:" == document.location.protocol) ? true : false);
var pathstr = location.pathname;
var myRE = new RegExp("GCweb2test/");
var wk = pathstr;
var result = wk.match(myRE) ;
var setpath = ((result !== null) ? "/GCweb2test" : "/GCweb2");

$(function() {

	if ($.cookie('spgc')) {
		$('#txID').val($.cookie('spgc'));
	}
	if ($.cookie('spgcc')) {
		if ($.cookie('spgcc') == 'on') {
			$('#idcheck').attr('checked', true)
		}
	}

	function Mcheck() {
		var f = document.Form1;
		if ((f.txID.value == "") || (f.txPswd.value == "")) {
			alert("ID,パスワードを確認してください。");
			return false;
		} else {
			return true;
		}
	}

	var loginClicked = false;
	$('#Form1').on('submit', function(evt) {
		if (loginClicked) {
			evt.preventDefault();
		} else {
			if (!Mcheck()) {
				evt.preventDefault();
				return;
			}
			var $cc = $('#idcheck');
			if ($cc.length > 0) {
				if ($cc.prop('checked')) {
					$.cookie('spgc', $('#txID').val(), {
						expires : 30,
						path: setpath, domain: hostnmstr,secure : SSL
					});
					$.cookie('spgcc', 'on', {
						expires : 30,
						path: setpath, domain: hostnmstr,secure : SSL
					});
				} else {
					$.cookie('spgc', "", {
						expires : 30,
						path: setpath, domain: hostnmstr,secure : SSL
					});
					$.cookie('spgcc', 'off', {
						expires : 30,
						path: setpath, domain: hostnmstr,secure : SSL
					});
				}
			}

			loginClicked = true;
			showLoginMsg();
		}
	});

	function showLoginMsg() {
		showActDark();
//		var $act = $('#act');
		//var $msg = $('<div id="loginMsgBox"><div class="inner"><table><tr><td><p>ログイン処理中です。</p><p>しばらくお待ちください。</p></td></tr></table></div></div>');
//		$(document.body).append($msg);
$('#loginMsgBox').css("display","block");
	}

	var $loginmsg = $('<div id="loginMsgBox"><div class="inner"><table><tr><td><p>ログイン処理中です。</p><p>しばらくお待ちください。</p></td></tr></table></div></div>');
	$(document.body).append($loginmsg);
	$loginmsg.css("display","none");

	function hideLoginMsg() {
		loginClicked = false;
		$('#loginMsgBox').remove();
	}

	$(window).on('unload', function(evt) {
		hideLoginMsg();
	});
	$(window).on('pagehide', function(evt) {
		hideLoginMsg();
	});

});
