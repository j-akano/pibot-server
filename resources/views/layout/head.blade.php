@section('head')
<meta charset="utf-8">
<meta name="description" itemprop="description" content="@yield('description')">
<meta name="keywords" itemprop="keywords" content="@yield('keywords')">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>@yield('title') | GCweb ｜ グリーンコープ</title>
<link href="common/css/reset.css" rel="stylesheet" type="text/css" media="all" />
<link href="common/css/base.css" rel="stylesheet" type="text/css" media="all" />
<link href="css/single.css" rel="stylesheet" type="text/css" media="all" />
<link href="common/css/responsive.css" rel="stylesheet" type="text/css" media="all" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
@yield('pageCss')
@yield('pageJs')
@endsection

