require('../app/js/entry')
require('angular-mocks')

describe('a thing', function() {
  var peopleController;
  it('should do stuff', function() {
    expect(false).toBe(true);
  })

  beforeEach(angular.mock.module('PeopleApp'))
  beforeEach(angular.mock.inject(function($controller) {
    peopleController = $controller('PeopleController')
  }))

  it('should construct a controller', function() {
    expect(typeof peopleController).toBe('object')
    expect(peopleController.people[0]).toBe('person')
    expect(typeof peopleController.getPeople).toBe('function')
  })

  describe('REST tests', function() {
    var $httpBackend;
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_
    }))

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation()
      $httpBackend.verifyNoOutstandingRequest()
    })

    it('should get all people', function() {
      $httpBackend.expectGET('http://localhost:3000/people')
        .respond(200, {people: [{name: 'test_person'}]})
      peopleController.getPeople()
      $httpBackend.flush()

      expect(peopleController.people.length).toBe(1)
      expect(peopleController.people[0].name).toBe('test_person')
    })
  })
})
