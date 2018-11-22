angular.module('myApp', []);

var mobilesListCtrl = function($scope, getMobilesList) {
            getMobilesList.getData()
                    .success(function(data){
                        $scope.mobiles_list = getMobilesList;
                    })
                    .error(function (e) {
                        $scope.message = "Sorry, something's gone wrong ";
                    }); 

};


angular.module('myApp')
        .controller('mobilesListCtrl', mobilesListCtrl);
