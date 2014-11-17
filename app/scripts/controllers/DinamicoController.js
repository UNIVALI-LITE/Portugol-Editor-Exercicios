function DinamicoController ($scope, $rootScope){

	$scope.addEntrada = function (caso) {
        if(!caso.formCasoValorEV || caso.formCasoValorE == "")
            return;
		var tipo  = caso.formCasoTipoE;
		var valor = caso.formCasoValorE;
		caso.entradas.push({'tipo': tipo, 'valor': valor});
		caso.formCasoValorE = "";
	};

	$scope.removeEntrada = function (caso, index) {
		caso.entradas.splice(index, 1);
	};

	$scope.addSaida = function (caso) {
        if(!caso.formCasoValorSV || caso.formCasoValorS == "")
            return;
		var tipo  = caso.formCasoTipoS;
		var valor = caso.formCasoValorS;
		caso.saidas.push({'tipo': tipo, 'valor': valor});
		caso.formCasoValorS = "";
	};
	
	$scope.removeSaida = function (caso, index) {
		caso.saidas.splice(index, 1);
	};

	$scope.addCaso = function () {
		$rootScope.Exercicio.casos.push({entradas: [], saidas: []});
	};

	$scope.removeCaso = function (index) {
		swal({ title: "Você tem certeza?", 
			   text: "Você tem certeza que deseja excluir este caso de teste?",
			   type: "warning", 
			   showCancelButton: true,
			   confirmButtonColor: "#DD6B55",
			   confirmButtonText: "Sim!",
			   cancelButtonText: "Cancelar",
			   closeOnConfirm: true },
			   function(){$scope.removeCasoSemPergunta(index);}
			);
	};
    
    $scope.verificaInput = function (tipo, caso) {
        if(tipo == 'e'){ // entrada
            var tipo = _.findWhere($rootScope.tipos, {tipo: caso.formCasoTipoE});
            if (tipo) {
                caso.formCasoValorEV = (new RegExp(tipo.regex)).test(caso.formCasoValorE);
            }
        } else { // saida
            var tipo = _.findWhere($rootScope.tipos, {tipo: caso.formCasoTipoS});
            if (tipo) {
                caso.formCasoValorSV = (new RegExp(tipo.regex)).test(caso.formCasoValorS);
            }
        }
    }

	$scope.removeCasoSemPergunta = function (index) {
	   	$rootScope.Exercicio.casos.splice(index, 1);
	    swal("Excluído!", "O caso de teste foi excluído com sucesso!", "success");
	    $rootScope.$digest();
	};

}