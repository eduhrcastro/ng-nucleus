(() => {
  angular.module('sample').controller('HomeCtrl', [
    '$log',
    function (
      $log
    ) {
      $log.log('test of the directive')
    }])
})()
