angular
    .module('myApp')
    .controller('reviewModalCtrl', reviewModalCtrl);

reviewModalCtrl.$inject = ['$modalInstance', 'addReviewService', 'mobileData'];

function reviewModalCtrl($modalInstance, addReviewService, mobileData) {
    var vm = this;
    vm.mobileData = mobileData;
    vm.modal = {
        close: function (result) {
            $modalInstance.close(result);
        },
        cancel: function () {
            $modalInstance.dismiss('cancel');
        }
    };

    vm.onSubmit = function () {
        vm.formError = "";
        if (!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
            vm.formError = "All fields required, please try again";
            return false;
        } else {
            console.log(vm.formData);
            vm.doAddReview(vm.mobileData.mobileid, vm.formData);
        }
    };

    vm.doAddReview = function (mobileid, formData) {
        addReviewService.postData(mobileid, {
                author: formData.name,
                rating: formData.rating,
                reviewText: formData.reviewText
            })
            .success(function (data) {
                console.log("Success!");
                vm.modal.close(data);
            })
            .error(function (data) {
                vm.formError = "Your review has not been saved, try again";
            });
        return false;
    };
}
