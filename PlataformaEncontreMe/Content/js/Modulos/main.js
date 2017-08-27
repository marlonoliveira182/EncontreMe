angular.module('encontreMe', ['ngRoute', 'ngAnimate', 'infinite-scroll', 'meusServicos'])

    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/AngularTemplates/Index.html',
                controller: 'indexController'
            });
        $routeProvider
            .when('/index', {
                templateUrl: '/AngularTemplates/Index.html',
                controller: 'indexController'
            });

        $routeProvider
            .when('/cadastroDesaparecido', {
                templateUrl: '/AngularTemplates/cadastroDesaparecido.html',
                controller: 'cadastroDesaparecidoController'
            });

        $routeProvider
            .when('/cadastro', {
                templateUrl: '/AngularTemplates/cadastro.html',
                controller: 'cadastroController'
            });

        $routeProvider
            .when('/teste', {
                templateUrl: '/AngularTemplates/teste.html',
                controller: 'testeController'
            });

        $routeProvider.otherwise({ redirectTo: '/index' });




    });














