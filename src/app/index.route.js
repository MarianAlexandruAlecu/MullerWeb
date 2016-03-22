(function () {
    'use strict';

    angular
        .module('creative')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'main',
                abstract: true
            })
            .state('main.homepage', {
                url: '/',
                templateUrl: 'app/homepage/homepage.html',
                controller: 'HomepageController',
                controllerAs: 'home'
            });

        $urlRouterProvider.otherwise('/');
    }

})();
