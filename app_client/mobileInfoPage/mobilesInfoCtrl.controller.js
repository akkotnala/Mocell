mobilesInfoCtrl.$inject = ['$routeParams', '$modal', 'getMobileByIdService'];

function mobilesInfoCtrl($routeParams, $modal, getMobileByIdService) {

    var vm = this;

    vm.popupReviewForm = function () {
        var modalInstance = $modal.open({
            templateUrl: '/reviewModal/reviewModal.view.html',
            controller: 'reviewModalCtrl as vm',
            resolve: {
                mobileData: function () {
                    return {
                        mobileid: vm.mobileid,
                        mobileName: vm.mobile.name
                    };
                }
            }
        });
        modalInstance.result.then(function (data) {
            vm.mobile.reviews.push(data);
            window.location.href = "";
        });
    };




    vm.message = "Loading data...please wait.... ";
    vm.mobileid = $routeParams.mobileid;
    console.log('$scope.mobileid', vm.mobileid);
    getMobileByIdService.getData(vm.mobileid)
        .success(function (data) {
            console.log("reached mobilesInfoCtrl", data);
            vm.mobile = data;
            vm.message = "";
              vm.bread_title=vm.mobile.category;



            //            $scope.inputPrice = data.price;
            //            $scope.inputDescription = data.description;
        })
        .error(function (e) {
            vm.message = "Sorry, something's gone wrong ";
        });


};
angular.module('myApp')
    .controller('mobilesInfoCtrl', mobilesInfoCtrl);
