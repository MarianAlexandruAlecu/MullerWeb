(function() {
    'use strict';

    angular
        .module('creative')
        .directive('footerBottom', footerBottom);

    /** @ngInject */
    function footerBottom() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/footer/footer.html',
            scope: {
                creationDate: '='
            },
            controller: NavbarController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function NavbarController() {
            var vm = this;
        }
    }

})();
