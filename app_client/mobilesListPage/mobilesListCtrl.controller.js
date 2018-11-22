var mobilesListCtrl = function ($scope, getMobilesList) {

    $scope.changedCategory = function () {
        $scope.mobiles_list = $scope.total_list.filter(function (obj) {
            return obj.category == $scope.category;
            
        });
        $scope.bread_title=$scope.category;

    };


    $scope.message = "Loading data...please wait.... ";
    getMobilesList.getData()
        .success(function (data) {
            console.log("reached mobilesListCtrl", data);
            $scope.mobiles_list = data;
            $scope.total_list = $scope.mobiles_list;
        console.log("asdasdasd",$scope.category);
            $scope.message = "";
            $scope.category = "Mobiles";
                $scope.bread_title=$scope.category;

            $scope.mobiles_list = $scope.total_list.filter(function (obj) {
                return obj.category == $scope.category;
            });

        })
        .error(function (e) {
            $scope.message = "Sorry, something's gone wrong ";
        });

};

angular.module('myApp')
    .controller('mobilesListCtrl', mobilesListCtrl);
