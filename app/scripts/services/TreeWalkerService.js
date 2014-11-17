angular.module("Editor")

.factory('TreeWalkers', ['$http', function ($http) {

  var TreeWalkersFactory = {

    getTreeWalkers : function (eachTreeWalker) {
      $http.get('config/treewalkers.json').success(
        function (treewalkers) {
          for(var t in treewalkers){
            $http.get('config/' + treewalkers[t].manifesto).success(eachTreeWalker);
          }
        }
      );
    },
  };

  return TreeWalkersFactory;
  
}]);