<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Fonts -->
    {{--
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" /> --}}
    @viteReactRefresh
    @vite('app/App.tsx')
    <script>
        document.addEventListener('DOMContentLoaded', function () {
                function getInitialColorScheme() {
                    try {
                        const saved = localStorage.getItem('mui-mode');
                        if (saved === 'light' || saved === 'dark') {
                            return saved;
                        }
                        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                            return 'dark';
                        }
                        return 'dark';
                    } catch {
                        return 'light';
                    }
                }

                const initialMode = getInitialColorScheme();
                document.documentElement.setAttribute('data-mui-color-scheme', initialMode);
            });
    </script>
</head>

<body>
    <div id="root"></div>
    <div id="portal"></div>
</body>

</html>