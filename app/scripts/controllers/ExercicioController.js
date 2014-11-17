
function ExercicioController ($scope, $rootScope){

	$scope.addTag = function () {	
		$rootScope.Exercicio.tags.push($scope.novaTag);
		$scope.novaTag = "";
	}

	$scope.removeTag = function (index) {
		$rootScope.Exercicio.tags.splice(index, 1);
	}

}