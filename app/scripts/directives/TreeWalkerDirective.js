angular.module("Editor")

.directive('treewalker', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/treewalker.html',
        scope: {
	        treewalker: '=tw',
	        manifesto: '=m',
	        lista: '=lista'
	     },
        controller: 'TreeWalkerController'
    };
});