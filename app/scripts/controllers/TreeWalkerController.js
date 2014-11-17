function TreeWalkerController ($scope, $rootScope, $http, $resource) {
    
    $scope.tiposRegex = new Array($rootScope.tipos.length);
    for(i in $rootScope.tipos){
        $scope.tiposRegex[$rootScope.tipos[i].tipo] = $rootScope.tipos[i].regex;
    };
    
    $scope.nos = [];
    $http.get('config/asa.json').then(
        function (res){
            $scope.nos = res.data;
        }
    );
    
    // Parâmetros do manifesto
    if($scope.treewalker.manifesto === undefined){ // Caso não tenha manifesto, busca nas configurações
        $http.get('config/treewalkers.json').success(
            function (treewalkers) {
                for(var t in treewalkers){                    
                    if(treewalkers[t].nome == $scope.treewalker.nome){
                        $http.get('config/' + treewalkers[t].manifesto).success(
                            function (manifesto){
                                $scope.treewalker.manifesto = manifesto;
                                $scope.mpar = $scope.treewalker.manifesto.parametros;
                            }
                        );
                    }
                }
            }
        );
    } else {
        $scope.mpar = $scope.treewalker.manifesto.parametros;
    }
    
    $scope.removeTreeWalkerContexto = function () {
		var index = $scope.lista.indexOf($scope.treewalker);
		$scope.lista.splice(index, 1);
	};
    
    $scope.loadNosAsa = function (query) {
        return $resource('config/asa.json').query().$promise;
    };
    
    $scope.getRegex = function (p) {
        var item = _.findWhere($rootScope.tipos, {tipo: p.tipo});
        return new RegExp(item.regex);
    }

}