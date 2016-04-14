module.exports = function(app) {
  app.controller('NameController', function() {
    this.firstName = 'Peggy'
    this.lastName = 'Hill'

    this.fullName = this.firstName + ' ' + this.lastName

    this.update = function() {
      this.fullName = this.firstName + ' ' + this.lastName
    }
  })
}
