angular.module("Editor", ['ngRoute','angular-loading-bar', 'ngAnimate', 'ui.ace', 'ngTagsInput', 'ngResource', 'xml'])

.config(function($routeProvider, $locationProvider, $httpProvider) {
    
  $httpProvider.defaults.withCredentials = true;
    
  var requireAuthentication = function () {
    return {
        load: function ($q, $location, $rootScope) {
            var deferred = $q.defer();
            deferred.resolve();
            if ($rootScope.isLogged === true) {
                return deferred.promise;
            } else {
                $location.path('/login');
            }
        }
    };
  };
  
  $routeProvider
  .when('/', {
    templateUrl: 'views/index.html',
    controller: 'IndexController',
    resolve: requireAuthentication()
  })  
  .when('/exercicio', {
    templateUrl: 'views/exercicio.html',
    controller: 'ExercicioController',
      resolve: requireAuthentication()
  })
  .when('/exercicio/dinamico', {
    templateUrl: 'views/dinamico.html',
    controller: 'DinamicoController',
    resolve: requireAuthentication()
  })
  .when('/exercicio/estatico', {
    templateUrl: 'views/estatico.html',
    controller: 'EstaticoController',
    resolve: requireAuthentication()
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController',
  });

})

// Pega o tipo da lista
.filter('getTipoLista', function() {
  return function(input) {
    return input.match(/[a-z]+/)[0];
  };
})

.factory('ExercicioHandler', ['$rootScope', function ($rootScope) {

  var ExercicioHandler = {

    novo : function () {
      // Inicia o exercício que será editado
      $rootScope.Exercicio = {};
      var Exercicio = $rootScope.Exercicio;
      Exercicio.titulo     = "";
      Exercicio.enunciado  = "";
      Exercicio.tags       = [];

      // Inicia o dinâmico e adiciona um caso
      Exercicio.casos = [];
      Exercicio.casos.push({entradas: [], saidas: []});

      // Inicia o estático
      Exercicio.treewalkers = [];
      Exercicio.solucoes = [];
      Exercicio.solucoes.push(
        {incorreta: false, 
         exibeCodigoFonte: false,
         mensagemErro: "",
         codigoFonte: "programa {\n\n  funcao inicio () {\n    \n  }\n\n}",
         treewalkers: []
        }
      );
    }
      
  };

  return ExercicioHandler;
  
}])

.run(function($rootScope, ExercicioHandler) {

  ExercicioHandler.novo();

  // Carrega definições de tipos
  $rootScope.tipos = [{'tipo':'inteiro','nome':'Inteiro', 'regex': '^[0-9]+$'},
                      {'tipo':'real','nome':'Real', 'regex': '^[0-9]+\.{1}[0-9]+$'},
                      {'tipo':'logico','nome':'Lógico', 'regex': '^true|false$'},
                      {'tipo':'cadeia','nome':'Cadeia', 'regex': '^.*$'},
                      {'tipo':'caracter','nome':'Caracter', 'regex': '^.{1}$'}];
  
  $rootScope.baseUrl = function(){
    // Configurar a url base do serviço
    return 'http://localhost:8080/EditorExerciciosRest/webresources';
  }
  
})

// Configurar a latência do loading

/* 

.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	cfpLoadingBarProvider.latencyThreshold = 0;
}])

*/