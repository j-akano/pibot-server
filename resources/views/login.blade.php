@extends('layout.common')
 
@section('title', 'ログイン ｜ GCweb')
@section('keywords', '')
@section('description', '')
@section('pageCss')
<link href="css/user_main.css" rel="stylesheet" type="text/css" media="all" />
<link href="css/login.css" rel="stylesheet" type="text/css" media="all" />
@endsection
@section('pageJs')
<script src="js/login.js" type="text/javascript"></script>
@endsection
 
@include('layout.head')
 
@include('layout.header')
 
@section('content')
    <h4 class="login"><span>IDとパスワードを入力して【ログイン】ボタンをクリックしてください。</span></h4>
    <!-- wrapper -->
    <div id="wrapper">
      <!-- login_left -->
      <div id="login_left">
        <form name="Form1" ID="Form1" method="POST" action="login/submit">
        <table class="green">
          <tr>
            <th><span class="tt">ID</span><span class="kome">※必須</span></th>
            <td class="txID"><input name="txID" type="text" id="txID" maxlength="8" ime-mode="disabled" value=""/><p class="komekai"><span class="txtred">※</span>半角数字で入力してください。</p></td>
          </tr>
          <tr>
            <th><span class="tt">パスワード</span><span class="kome">※必須</span></th>
            <td class="txID"><input name="txPswd" type="password" id="txPswd" maxlength="32"/><p class="komekai"><span class="txtred">※</span>半角英数字で入力してください。</p></td>
          </tr>
        </table>
          <div class="txErrmsg">
			          </div>
          <p class="btn">
            <input type="image" src="images/user/btn_login.png" alt="ログイン" id="sbLogin" />
            <br />
          <a href="user_remind"><img src="images/user/btn_wasure.png" alt="パスワードをお忘れの方" /></a> </p>
        </form>
        <h5><span><img src="common/images/icon_maru_gray.png" />ログインができない場合</span></h5>
        <p class="formcheck"><span>大文字入力になっていませんか？試しに英文字を入力してください。</span>
            <input name="chk" type="text" class="chk" maxlength="2" />
        </p>
        <p class="formcheck_kome">※大文字→小文字入力への変更は、<br />
          　
          [Shift]キーを押しながら[Caps Lock]キーを押します。（Windowsの場合）</p>
        <p class="btn2"><a href="javascript:openwinHelp();"><img src="images/user/btn_loginhelp.png" alt="ログインヘルプ" /></a></p>
      </div>
      <!-- /login_left -->
      <!-- login_right -->
      <div id="login_right">
        <h6><img src="images/user/tt_idpass.png" alt="IDとパスワードの取得はこちら" /></h6>
        <p class="idpass"> <span>インターネット注文をご利用するには、<br />
          GCwebへの登録が必要です。</span> <a href="https://www.greencoop.or.jp/gcweb/Touroku1.html" target="_blank"><img src="images/user/btn_touroku.png" alt="GCwebに登録する" /></a> </p>
        <h6><img src="images/user/tt_greencoop.png" alt="グリーンコープに加入されていない方" /></h6>
        <p class="idpass"> <span>インターネット注文をご利用するには、<br />
          GCwebへの登録が必要です。</span> <a href="https://www.gcmail.greencoop.or.jp/GCmail_PC/GMR_PC/GMR01010.aspx" target="_blank"><img src="images/user/btn_sample.png" alt="資料・サンプルのお申し込み" /></a> </p>
        <!-- GCメールについて -->
        <div class="aboutmail">
          <p class="about"><span>★</span> GCweb・GCmail サービスについて</p>
          <ul>
            <li><a href="javascript:openwinKiyaku();">GCwebサービスの利用規約について</a></li>
            <li class="dot"><a href="javascript:openwinPrivacy();">GCwebサービスの個人情報の取り扱いについて</a></li>
            <li><a href="https://www.gcmail.greencoop.or.jp/GCmail_PC/GMU_PC/about/kiyaku.html" target="_blank">GCmailサービスの利用規約について</a></li>
            <li><a href="https://www.gcmail.greencoop.or.jp/GCmail_PC/GMU_PC/about/kiyaku.html" target="_blank">GCmailサービスの個人情報の取り扱いについて</a></li>
          </ul>
        </div>
        <!-- /GCメールについて -->
      </div>
      <!-- /login_right -->
      
      <!-- メンテナンス -->
      <div class="mente">
        <h6><span class="tt">定期メンテナンスのお知らせ</span></h6>
        <table>
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
        </table>
        <ul>
          <li class="title">●知っててください！</li>
          <li class="txt">毎週日曜15時（ＷＥＢ限定企画の注文開始）から約３０～４０分の間は、大勢のご利用者が一度に集中しすぎて、つながらない、途中で止まる、<br />
などが発生して注文できない事があります。<br />
            また、限定企画では数量の少ない人気商品はすぐに完売になります。 <br />
            「しばらく待ってやっとつながっても、その時は既に完売」という事がありますので、ご理解の上でのご利用をお願いします。</li>
          <li class="txt">「お気に入り」「ブックマーク」等に登録する場合は、このページをご登録ください。  障害時の案内が表示されます。</li>
        </ul>
      </div>
      <!-- /メンテナンス -->
      
      <!-- norton -->
      <div class="top_norton"> <a href="#"><img src="images/user/norton.png" alt="norton" /></a> <p>このサイトは、プライバシー保護のため、<br />
SSL暗号化通信を導入しています。</p></div>
      <!-- /norton -->
      
      <!-- サポート -->
      <div id="support_wrap">
      <div class="support">
        <h6><img src="images/user/png_toi.png" alt="お問合せ" /></h6>
        <ul>
          <li class="tel">
            <p class="title">GCweb サポートセンター</p>
            <p class="txt"><span class="freedial">0120-81-4989<span>（フリーダイヤル）</span></span><span class="time">受付時間／月～土の9:00～17:00（日・祝はお休みです）</span></p>
          </li>
          <li class="mail">
            <p class="title">メールでのお問い合わせ</p>
            <p class="txt"><span class="mailadd"><a href="mailto:gcweb@gcmail.greencoop.or.jp">gcweb@gcmail.greencoop.or.jp</a></span><span class="kome">※組合員番号、組合員名、所属生協、お問合せ内容を明記の上、ご送信ください</span></p>
          </li>
        </ul>
      </div>
      </div>
      <!-- /サポート -->
    </div>
    <!-- /wrapper -->
@endsection
 
@include('layout.sub')
 
@section('pageSub')
    <p id="page_side_bar"></p>
@endsection
 
@include('layout.footer')