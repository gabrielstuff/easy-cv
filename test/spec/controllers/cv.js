'use strict';

describe('Controller: CvCtrl', function() {

  // load the controller's module
  beforeEach(module('easyCvApp'));

  var CvCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    CvCtrl = $controller('CvCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
