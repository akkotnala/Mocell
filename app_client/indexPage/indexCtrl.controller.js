

function indexCtrl($scope) {
    console.log("reached indexCtrl");
    $scope.title = "Home";
};

angular
    .module('myApp')
    .controller('indexCtrl', indexCtrl);




















