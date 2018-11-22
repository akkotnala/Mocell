angular.module('myApp')
    .service('addReviewService', addReviewService);

function addReviewService($http) {
    var postData = function (mobileid, data) {
        console.log("reached addReviewService", data);
        return $http.post('/api/mobiles/' + mobileid + '/reviews', data);
    }
    return {
        postData: postData
    }
}
