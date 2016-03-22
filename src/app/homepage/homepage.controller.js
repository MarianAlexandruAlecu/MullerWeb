(function () {
    'use strict';

    angular
        .module('creative')
        .controller('HomepageController', HomepageController);

    /* @ngInject */
    function HomepageController($log) {
        var vm = this,
            NAME = 'HomepageController:';

        activate();

        function activate() {
            $log.debug(NAME, 'Init');
        }
    }


})();