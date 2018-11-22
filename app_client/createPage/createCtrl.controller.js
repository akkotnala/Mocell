//createCtrl.$inject = ['$scope', 'addMobile'];
var createCtrl = function ($scope, addMobile) {
    console.log("reached createCtrl");
    $scope.category = "Mobiles";
    $scope.submitForm = function () {
        
        
        var category = $scope.category;
        var name = $scope.inputName;
        var price = $scope.inputPrice;
        var description = $scope.inputDescription;
        console.log("name", name);
        console.log("price", price);
        console.log("description", description);

        if (name != null && price != null && description != null) {
            addMobile.postData({
                    category: $scope.category,
                    name: $scope.inputName,
                    price: $scope.inputPrice,
                    description: $scope.inputDescription
                })
                .success(function (data) {
                    $scope.title = "Create";
                $scope.message = "";

                    console.log("reached createCtrl success");
                    window.location.href = "/mobile/read";

                })
                .error(function (e) {
                    $scope.message = "Please enter all the fields ";
                });


        }else{
            $scope.message = "Please enter all the fields";
        }


    }


};

angular.module('myApp')
    .controller('createCtrl', createCtrl);
