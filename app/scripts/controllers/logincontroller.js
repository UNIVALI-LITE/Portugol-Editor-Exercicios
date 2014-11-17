function LoginController ($scope, $rootScope, $location, $http, xmlFilter){
    
    $scope.user = {"login" : "", "senha": ""};
    $scope.user.login = "gleisonmalheiros@gmail.com";
    $scope.user.senha = "gleison";
    
    $scope.login = function () {
        
        if($scope.user.login == "" || $scope.user.senha == ""){
            sweetAlert("Atenção", "Digite seu e-mail e senha para prosseguir!", "error");
        } else {            
            $http.put($rootScope.baseUrl()+'/login', $scope.user).success(
                function(data){
                    var res = xmlFilter(data);
                    if(res.find('requisicaoAtendida')[0]){
                        if(res.find('requisicaoAtendida')[0].textContent == "true"){
                            $rootScope.isLogged = true;
                            $location.path("/");
                        }else{
                            var msg = res.find('mensagem')[0].textContent;
                            sweetAlert("Atenção", msg, "error");
                        }
                    }
                });
        }
    }
	
}