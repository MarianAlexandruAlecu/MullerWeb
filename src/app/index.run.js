(function() {
  'use strict';

  angular
    .module('creative')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
