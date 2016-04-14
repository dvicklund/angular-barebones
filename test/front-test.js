// test/e2e/test.js
// don't need to require stuff since we'll be running this through protractor on the cmd line
describe('angular test homepage', function() {
  var firstName = element(by.model('namectrl.firstName'))
  var lastName = element(by.model('namectrl.lastName'))
  var updateButton = element(by.buttonText('update'))

  beforeEach(function() {
    browser.get('http://localhost:8080')
  })

  it('should have the correct title', function() {
    expect(browser.getTitle()).toEqual('TAAAST')
  })

  it('should have a default name', function() {
    expect(firstName.getAttribute('value')).toEqual('Peggy')
    expect(lastName.getAttribute('value')).toEqual('Hill')
    expect(element(by.binding('namectrl.fullName')).getText()).toEqual('Peggy Hill')
  })

  it('can update the name', function() {
    firstName.clear()
    firstName.sendKeys('Bobby')
    lastName.clear()
    lastName.sendKeys('UstaHill')
    updateButton.click()

    expect(firstName.getAttribute('value')).toEqual('Bobby')
    expect(lastName.getAttribute('value')).toEqual('UstaHill')
    expect(element(by.binding('namectrl.fullName')).getText()).toEqual('Bobby UstaHill')
  })

  it('should get all people', function() {
    $httpBackend.expectGET('http://localhost:3000/people')
      .respond(200, {people: [{name: 'test person'}]})
    peopleController.getPeople();
    $httpBackend.flush()
    expect(peopleController.people.length).toBeGreaterThan(0)
    expect(peopleController.people[0].name).toBe('test person')
  })

  it('should create a new person', function() {
    $httpBackend.expectPOST('http://localhost:3000/people', {name: 'test person'})
      .respond(200, {name: 'test person', age: 18, _id: 'uniqueid'})
    peopleController.createPerson({name: 'test person'})
    $httpBackend.flush()
    expect(peopleController.people.length).toBe(2)
    expect(peopleController.people[1].name).toBe('testPerson')
    expect(peopleController.newPerson).toBeNull()
  })

  it('should delete a person', function() {
    $httpBackend.expectDELETE('http://localhost:3000/people/5')
      .respond(200, 'deleted')
    peopleController.people.push({name: 'test person', _id: 5})
    peopleController.removePerson({name: 'test person', _id: 5})
    $httpBackend.flush()
    expect(peopleController.people.length).toBe(1)
    expect(peopleController.people.every((p) => p._id != 5)).toBe(true)
  })
})
