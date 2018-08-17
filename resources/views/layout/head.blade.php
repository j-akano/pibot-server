@section('head')
<meta charset="UTF-8">
<base href="https://ww1.greencoop.or.jp/GCweb2/"/>
<title>@yield('title') | cly7796.net</title>
<meta name="description" itemprop="description" content="@yield('description')">
<meta name="keywords" itemprop="keywords" content="@yield('keywords')">
<link href="common/css/reset.css" rel="stylesheet" type="text/css" media="all" />
<link href="common/css/base_gcweb.css" rel="stylesheet" type="text/css" media="all" />
<script src="common/js/jquery-1.11.1.min.js" type="text/javascript"></script>
<script src="common/js/jquery.cookie.js" type="text/javascript"></script>
<script src="common/js/asset.js" type="text/javascript"></script>
<!--<script type="text/javascript" src="common/js/heightLine.js"></script>-->
<script src="common/js/common.js" type="text/javascript"></script>
@yield('pageCss')
@yield('pageJs')
@endsection

