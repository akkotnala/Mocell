var updateCtrl = function ($scope, getMobilesList, updateMobileService) {

    $scope.changedCategory = function () {
        $scope.mobiles_list = $scope.total_list.filter(function (obj) {
            return obj.category == $scope.category;
        });

        $scope.mobileid = $scope.mobiles_list[0]._id;
        $scope.inputPrice = $scope.mobiles_list[0].price;
        $scope.inputDescription = $scope.mobiles_list[0].description;
    };



    $scope.changedItem = function () {

        var selectedMobile = $scope.mobiles_list.filter(function (obj) {
            return obj._id == $scope.mobileid;
        });
        $scope.inputPrice = selectedMobile[0].price;
        $scope.inputDescription = selectedMobile[0].description;

        //        getMobileByIdService.getData($scope.mobileid)
        //        .success(function (data) {
        //            console.log("reached updateCtrl", data);
        //            $scope.inputPrice = data.price;
        //            $scope.inputDescription = data.description;
        //        })
        //        .error(function (e) {
        //            $scope.message = "Sorry, something's gone wrong ";
        //        });


    }


    getMobilesList.getData()
        .success(function (data) {
            console.log("reached updateCtrl", data);
            $scope.mobiles_list = data;
            $scope.total_list = $scope.mobiles_list;
            $scope.message = "";
            $scope.category = "Mobiles";
            $scope.mobiles_list = $scope.total_list.filter(function (obj) {
                return obj.category == $scope.category;
            });
            $scope.mobileid = $scope.mobiles_list[0]._id;
            $scope.inputPrice = $scope.mobiles_list[0].price;
            $scope.inputDescription = $scope.mobiles_list[0].description;
        })
        .error(function (e) {
            $scope.message = "Sorry, something's gone wrong ";
        });

    console.log("mobiles_list", $scope.mobiles_list);
    console.log("mobileid", $scope.mobileid);

    console.log("reached updateCtrl");
    $scope.submitForm = function () {
        var mobileid = $scope.mobileid;
        var price = $scope.inputPrice;
        var description = $scope.inputDescription;

        if (mobileid != null && price != null && description != null) {

            updateMobileService.putData($scope.mobileid, {
                    price: $scope.inputPrice,
                    description: $scope.inputDescription
                })
                .success(function (data) {
                    console.log("reached updateCtrl success");
                    $scope.message = "";
                    window.location.href = "/mobile/read";
                })
                .error(function (e) {
                    $scope.message = "Please enter all the fields ";
                });

        } else {
            $scope.message = "Please enter all the fields";
        }


    }

};

angular.module('myApp')
    .controller('updateCtrl', updateCtrl);
