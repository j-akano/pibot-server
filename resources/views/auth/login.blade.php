@extends('layout.common')
 
@section('title', 'ログイン ｜ GCweb')
@section('keywords', '')
@section('description', '')
@section('pageCss')
@endsection
@section('pageJs')
	<script src="js/jquery.cookie.js" type="text/javascript"></script>
	<script src="js/asset.js"></script>
	<script src="js/login.js"></script>
@endsection
 
@include('layout.head')
 
@include('layout.header')
 
@section('content')
	<div id="main-single" class="container clearfix">
		<h2 class="login_title">IDとパスワードを入力して【ログイン】ボタンをクリックしてください。</h2>
		<!-- ログインフォーム -->
		<div id="login_box">
			<div class="loginbody">
				<form name="Form1" id="Form1" method="post" action="login/submit">
					{{ csrf_field() }}
					<span class="font-color_red font-size_small">※必須</span><br>
					<input name="userid" type="text" id="userid" maxlength="8" placeholder="ログインID（半角数字）"><br>
					<span class="font-color_red font-size_small">※必須</span><br>
					<input name="password" type="password" id="password" maxlength="32" placeholder="パスワード（半角英数字）"><br>
					<label><input name="" type="checkbox" value="" id="idcheck" />
					<p class="chktxt">IDの入力を次回より省略する</p></label><br />
					<div class="align_center tpm25"><input type="image" class="btn_login" src="images/btn_login.png" alt="ログイン" id="sbLogin"></div>
					<ul class="tpm25 login_helpe">
						<li><a href="user_remind" class="help">パスワードをお忘れの方</a></li>
						<li><a href="user_contact" class="help">ログインできない場合は「お問い合わせ」へ</a></li>
					</ul>
				</form>
			</div>
		</div>
		<!-- 登録ボタン -->
		<div id="register_box">
			<div class="register_box_in">
				<h3><img src="images/reg_ttl02.png" alt="ID・パスワードの取得はこちら"></h3>
				<p>既に組合員の方で、はじめての方はご利用登録をお願いします。</p>
				<div class="align_center"><a href="register"><img src="images/btn_gcweb.png" alt="GCwebに登録"></a></div>
			</div>
			<div class="register_box_in">
				<h3><img src="images/reg_ttl01.png" alt="グリーンコープに加入されていない方"></h3>
				<p>GCwebのご利用には、グリーンコープへの加入が必要です。</p>
				<div class="align_center"><a href="https://www.gcmail.greencoop.or.jp/GCmail_PC/GMR_PC/GMR01010.aspx"><img src="images/btn_sample.png" alt="資料・サンプルのお申込み"></a></div>
			</div>
		</div>

		<!--br><font color="red">本日（７月９日）、ＧＣｗｅｂに障害が発生していましたが、１３時５０分頃復旧いたしました。大変ご迷惑をおかけいたしました。</font><br-->

		<!-- メンテナンス -->
		<aside>
			<div class="mente">

				<!--h2><span class="tt">ＧＣｗｅｂ休止のご案内</span></h2>
				<table>
					<tbody>
						<tr>
							<th class="about">日程</th>
							<th class="about">時間</th>
							<th>内容</th>
						</tr>
						<tr>
							<td>６月１７日（日）</td>
							<td>午前７～１６時</td>
							<td class="system">サーバーメンテナンスに伴う作業の為、左記の期間ＧＣｗｅｂのご利用を休止とさせていただきます。<br>
　　　　　　　　　　　　　　　　　　　　　　　　　　　　伴って１４号（６／１７開始）のＷＥＢ限定企画は１７時開始とさせていただきます。<br>
　　　　　　　　　　　　　　　　　　　　　　　　　　　　ご迷惑をおかけしますが、よろしくお願いいたします。</td>
						</tr>
					</tbody>
				</table-->

				<h2><span class="tt">定期メンテナンスのお知らせ</span></h2>
				<table>
					<tbody>
						<tr>
							<th class="about">曜日</th>
							<th class="about">時間</th>
							<th>内容</th>
						</tr>
						<tr>
							<td>各曜日（月曜日～日曜日）</td>
							<td>午前4～5時</td>
							<td class="system">システムメンテナンス</td>
						</tr>
						<tr>
							<td colspan="3" class="system"><span class="txtred">※</span>システムの保守・改善、傷害復旧のため不定期でメンテナンスを実施する場合がございます。</td>
						</tr>
					</tbody>
				</table>
			</div>
		</aside>
	</div>
@endsection
 
@include('layout.sub')
 
@section('pageSub')
    <p id="page_side_bar"></p>
@endsection
 
@include('layout.footer')