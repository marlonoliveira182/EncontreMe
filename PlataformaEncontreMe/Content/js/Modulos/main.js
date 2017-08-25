angular.module('encontreMe', ['ngRoute', 'ngAnimate'])
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
           .when('/painel', {
               templateUrl: '/AngularTemplates/painel.html',
               controller: 'painelController'
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

