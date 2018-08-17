<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
@yield('head')
</head>
<body>
@yield('header')
    <div id="app">
		<div class="container">
			<a class="navbar-brand" href="{{ url('/') }}">
				{{ config('app.name', 'Laravel') }}
			</a>
			<!-- Authentication Links -->
			@guest
				<a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
				<a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
			@else
				<a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
					{{ Auth::user()->name }} <span class="caret"></span>
				</a>

				<a class="dropdown-item" href="{{ route('logout') }}"
				   onclick="event.preventDefault();
								 document.getElementById('logout-form').submit();">
					{{ __('Logout') }}
				</a>

				<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
					@csrf
				</form>
			@endguest
		</div>

        <main class="py-4">
            @yield('content')
        </main>
    </div>
@yield('footer')
</body>
</html>
