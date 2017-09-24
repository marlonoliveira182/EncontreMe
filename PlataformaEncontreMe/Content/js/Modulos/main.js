angular.module('encontreMe', ['ngRoute', 'ngAnimate', 'infinite-scroll', 'meusServicos', 'ngMask','ngResource'])

    .config(function ($routeProvider) {
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
            .when('/perfil', {
                templateUrl: '/AngularTemplates/Perfil.html',
                controller: 'cadastroDesaparecidoController'
            });

        $routeProvider.otherwise({ redirectTo: '/index' });
    });














