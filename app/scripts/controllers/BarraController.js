function BarraController($scope, $rootScope, $location, $resource, $http, ExercicioHandler) {

	$scope.novoExercicio = function () {
		
        ExercicioHandler.novo();
		$location.url("/exercicio");

	};
    
    $scope.salvar = function () {
        
        var exer = $rootScope.Exercicio;
        
        // Sem caso dinânico
        if(exer.casos.length == 0){
            sweetAlert("Casos Dinâmicos", "Deve exister ao menos um caso de teste definido!", "error");
            $location.path("/exercicio/dinamico");
            return;
        }
        
        // Casos dinâmicos sem saída
        if(! _.isEmpty(_.find(exer.casos, function(c){ return c.saidas.length == 0}))){
            sweetAlert("Casos Dinâmicos",
                       "Existem casos de testes sem nenhuma saída, verifique e acrescente ao menos uma saída!",
                       "error");
            $location.path("/exercicio/dinamico");
            return;
        }
        
        // Existir ao menos uma solução correta
        if(_.isEmpty(_.find(exer.solucoes, function(s){ return !s.incorreta}))) {
            sweetAlert("Soluções Modelos",
                       "Não existe nenhuma solução modelo correta, deve haver ao menos uma!",
                       "error");
            $location.path("/exercicio/estatico");
            return;
        }
        
        // Parâmetros dos treewalker (exercício)
        var parValido = 
             _.isEmpty( // treewalker com um dos parâmetros indefinido
                _.find(exer.treewalkers,
                    function(t){  
                        return !_.isEmpty(_.find(t.parametros, function(p){
                            return p.valor == "" || p.valor === undefined || p.valor.length == 0;
                        }));
                    })
            );
        if(!parValido) {
            sweetAlert("Tree Walkers do Exercício",
                       "Existem tree walkers no exercício com parâmetros indefinidos!",
                       "error");
            $location.path("/exercicio/estatico");
            return;
        }
        
        // Parâmetros dos treewalker (soluções modelos)
        parValido = 
             _.find(exer.solucoes,
                function (s) {
                    return _.isEmpty(
                        _.find(s.treewalkers,
                            function(t){  
                                return !_.isEmpty(_.find(t.parametros, function(p){
                                    return p.valor == "" || p.valor === undefined || p.valor.length == 0;
                                }));
                            }
                        )
                    )
                }
            );
        if(!parValido) {
            sweetAlert("Tree Walkers de Soluções Modelos",
                       "Existem tree walkers em soluções modelos com parâmetros indefinidos!",
                       "error");
            $location.path("/exercicio/estatico");
            return;
        }
        
        // Salva        
        var ex = $resource($rootScope.baseUrl()+'/exercicio', null, {'update': { method:'PUT'}});
        ex.update({id:$rootScope.Exercicio.problemaId}, $rootScope.Exercicio).$promise.then(
            function (res) {
                if(res.status == "sucesso"){
                    if(res.novoid) // Se criou um novo id, atribui
                        $rootScope.Exercicio.problemaId = res.novoid;
                    sweetAlert("Parabéns", res.mensagem, "success");
                } else {
                    sweetAlert("Atenção", res.mensagem, "error");
                }
            }
        );

    }
    
    $scope.logout = function () {
        $http.delete($rootScope.baseUrl()+'/login').success(
            function(data){
                $rootScope.isLogged = false;
                $location.path("/login");
            }
        );
    }
    
    $scope.inicio = function () {
        if($scope.estilo > 0){
            swal({ title: "Você tem certeza?", 
                   text: "Se você voltar a tela inicial, dados não salvos do exercício serão perdidos!",
                   type: "warning", 
                   showCancelButton: true,
                   confirmButtonColor: "#DD6B55",
                   confirmButtonText: "Sim!",
                   cancelButtonText: "Cancelar",
                   closeOnConfirm: true },
                   function(){$location.path('/');$rootScope.$digest();}
                );
        } else {
            $location.path('/');
        }
    }

}

