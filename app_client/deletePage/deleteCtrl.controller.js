var deleteCtrl = function ($scope, getMobilesList, deleteMobileService) {

    $scope.changedCategory = function () {
        $scope.mobiles_list = $scope.total_list.filter(function (obj) {
            return obj.category == $scope.category;
        });
        $scope.mobileid = $scope.mobiles_list[0]._id;
    };



    getMobilesList.getData()
        .success(function (data) {
            console.log("reached mobilesListCtrl", data);
            $scope.mobiles_list = data;
            $scope.total_list = $scope.mobiles_list;
            $scope.title = "Delete";
            $scope.message = "";
            $scope.category = "Mobiles";
            $scope.mobiles_list = $scope.total_list.filter(function (obj) {
                return obj.category == $scope.category;
            });
            $scope.mobileid = $scope.mobiles_list[0]._id;
        })
        .error(function (e) {
            $scope.message = "Sorry, something's gone wrong ";
        });

    console.log("mobiles_list", $scope.mobiles_list);
    console.log("mobileid", $scope.mobileid);

    console.log("reached updateCtrl");
    $scope.submitForm = function () {
        var mobileid = $scope.mobileid;

        if (mobileid != null) {
            deleteMobileService.deleteData($scope.mobileid)
                .success(function (data) {
                    console.log("reached deleteCtrl success");
                    window.location.href = "/mobile/read";
                })
                .error(function (e) {
                    $scope.message = "Sorry, something's gone wrong ";
                });

        } else {
            $scope.message = "Please select mobile to delete";
        }


    }

};

angular.module('myApp')
    .controller('deleteCtrl', deleteCtrl);
