angular.module("Editor")

.directive('barra', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/barradirective.html',
        scope: {
	        estilo: '=estilo'
	     },
        controller: 'BarraController'
    };
});