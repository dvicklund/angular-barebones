module.exports = function(app) {
  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'header.html',  // Change to your main template
      controller: 'ctrl'
    })
  }])
}

  //  For example:

  //   .when('/login', {
  //     templateUrl: "html/login.html",
  //     controller: "AuthCtrl"
  //   })
  //   .when('/shop', {
  //     templateUrl: 'html/search-results.html',
  //     controller: 'PageCtrl'
  //   })
  // }]);
