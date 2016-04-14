module.exports = function(app) {
  app.controller('ctrl', ['$scope', '$location', function($scope, $location) {
    $scope.goto = function(path) {
      $location.path(path);
    }

    $scope.logout = function() {
      $location.path('/login')
      // Log out logic here
    }
  }])
}
