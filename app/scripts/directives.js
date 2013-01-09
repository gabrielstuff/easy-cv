easyCvApp.directive("lighter", function () {
  var linker = function (scope, element, attrs) {
        element.lighter();
    };

    return {
        restrict:'A',
        link:linker
    }
});