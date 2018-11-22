angular.module('myApp', ['ngRoute', 'ui.bootstrap']);


function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/indexPage/index.view.html',
            controller: 'indexCtrl'

        })
        .when('/mobile/read', {
            templateUrl: '/mobilesListPage/mobilesList.view.html',
            controller: 'mobilesListCtrl'
        })
        .when('/mobile/create', {
            templateUrl: '/createPage/create.view.html',
            controller: 'createCtrl'
        })
        .when('/mobile/update', {
            templateUrl: '/updatePage/update.view.html',
            controller: 'updateCtrl'
        })
        .when('/mobile/delete', {
            templateUrl: '/deletePage/delete.view.html',
            controller: 'deleteCtrl'
        })
        .when('/mobile/:mobileid', {
            templateUrl: '/mobileInfoPage/mobileInfo.view.html',
            controller: 'mobilesInfoCtrl',
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);

    //        $locationProvider.html5Mode({
    //          enabled: true,
    //          requireBase: false
    //        });
}

angular
    .module('myApp')
    .config(['$routeProvider', '$locationProvider', config]);
