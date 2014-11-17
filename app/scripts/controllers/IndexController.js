//IndexController

function IndexController ($scope, $rootScope, $resource, $location){
    
    var ListaExercicios = $resource(
        $rootScope.baseUrl()+'/listaexercicios', null,
            {
                'buscar':  {method:'GET', isArray:true}
            }
    );
    
    var Exercicio = $resource(
        $rootScope.baseUrl()+'/exercicio', null,
            {
                'buscar':  {method:'GET'},
                'salvar':  {method:'PUT'},
                'excluir':  {method:'DELETE'}
            }
    );
    
	$scope.exercicios = [];
    
    $scope.load = function () {
         // Busca os exercícios
        ListaExercicios.buscar(function (res) { $scope.exercicios = res; });
    }
    
    $scope.carregarExercicio = function (problemaId) {
        Exercicio.buscar(
            {id:problemaId},
            function(res){
                if(res != ""){
                    $rootScope.Exercicio = res;
                    $rootScope.Exercicio.problemaId = problemaId;
                    $location.path("/exercicio");
                } else {
                    sweetAlert("Atenção", "Um erro inesperado ocorreu ao carregar o exercício", "error");
                }
            }
        );
    }
    
    $scope.excluir = function (problemaId) {
        Exercicio.excluir(
            {id:problemaId},
            function(res){
                if(res.status == "sucesso"){
                    sweetAlert("Parabéns", res.mensagem, "success");
                } else {
                    sweetAlert("Atenção", res.mensagem, "error");
                }
                $scope.load();
            }
        );
    }
    
    $scope.load();    

}