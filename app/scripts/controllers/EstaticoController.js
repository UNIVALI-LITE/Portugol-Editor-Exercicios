function EstaticoController ($scope, $rootScope, $route, $location, TreeWalkers) {

	$scope.treewalkers = [];

	// Carrega os TreeWalkers
	TreeWalkers.getTreeWalkers(function(t){
		$scope.treewalkers.push(t);
	});

	$scope.solucaoId = null;

	$scope.selecionaSolucao = function (index) {
		$scope.solucaoId = index;
	};

	$scope.addSolucao = function () {
		$rootScope.Exercicio.solucoes.push(
			{incorreta: false, 
		     exibeCodigoFonte: false,
		     mensagemErro: "",
		     codigoFonte: "programa {\n\n  funcao inicio () {\n    \n  }\n\n}",
		     treewalkers: []
		    });
		$scope.solucaoId = $rootScope.Exercicio.solucoes.length-1;
	};

	$scope.removeSolucao = function (index) {
		swal({ title: "Você tem certeza?", 
			   text: "Você tem certeza que deseja excluir esta solução?",
			   type: "warning", 
			   showCancelButton: true,
			   confirmButtonColor: "#DD6B55",
			   confirmButtonText: "Sim!",
			   cancelButtonText: "Cancelar",
			   closeOnConfirm: false },
			   function(){$scope.removeSolucaoSemPergunta(index);}
			);
		
	};

	$scope.removeSolucaoSemPergunta = function (index) {
	   	$rootScope.Exercicio.solucoes.splice(index, 1);
	   	swal("Excluído!", "A solução foi excluída com sucesso!", "success");
		if (index > 0) {
			$scope.solucaoId = index-1; // Vai para o anterior
		} else {
			$scope.solucaoId = null; // Vai para o exercício
		}	    
	    $rootScope.$digest();
	};

	$scope.addTreeWalker = function (t) {
		var tw = {manifesto:t, nome:t.nome};

		// Adiciona os parâmetros do manifesto
		tw.parametros = [];
		for(var p in t.parametros){
            var tipo = t.parametros[p].tipo;
            var obj = {tipo:tipo, valor: ""};
            if(/[a-z]+\[\]/.test(tipo)){ // Verifica se é do tipo lista
                obj.tipo = "lista"; 
                obj.tipolista = tipo.match(/[a-z]+/)[0];
            }
			tw.parametros.push(obj);
		}

		if ($scope.solucaoId != null) {
            //Adiciona na solução modelo
			$rootScope.Exercicio.solucoes[$scope.solucaoId].treewalkers.push(tw);
		} else {
            // Adiciona no exercício
			$rootScope.Exercicio.treewalkers.push(tw);
		}
	};
    
    $scope.trocouSolucaoCorreta = function (s) {
        if(s.incorreta && s.treewalkers.length > 0){
            swal({ title: "Os tree walkers serão excluídos!", 
			   text: "Uma solução incorreta não pode possuir tree walkers, se você prosseguir eles serão excluídos, deseja prosseguir?",
			   type: "warning", 
			   showCancelButton: true,
			   confirmButtonColor: "#DD6B55",
			   confirmButtonText: "Sim!",
			   cancelButtonText: "Cancelar",
			   closeOnConfirm: true },
			   function(isConfirm){
                   if(isConfirm) {
                       s.treewalkers = [];                       
                   } else {
                       s.incorreta = false;
                   }
                   $scope.$digest();
               }
			);
        }
    }

}