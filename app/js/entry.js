require('angular')
require('angular-route')

var app = angular.module('application', [
  'ngRoute'
])

require('./controllers/ctrlIndex')(app)
require('./directives/dirIndex')(app)
require('./router')(app)
