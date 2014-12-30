'use strict';

angular.module('fledit').config(function ($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');
  // @src http://stackoverflow.com/questions/26824628/ui-router-state-current-wrapper-for-arbitary-state/26848546#26848546
  // This fn is called by StateBuilder each time a state is registered
  var decoratorFn = function($state, parent) {
    // The first arg is the internal state. Capture it and add an accessor to public state object.
    $state.self.$$state = function() { return $state; };
    // pass through to default .parent() function
    return parent($state);
  };
  // We fake the DI to avoid a bug with ngAnnotate
  // @src https://github.com/olov/ng-annotate/issues/82#issuecomment-63346833
  decoratorFn.$inject = ['$state', 'parent'];
  $stateProvider.decorator('views', decoratorFn);
});
