angular.module('myApp')
    .service('addMobile', addMobile);

function addMobile($http) {
    var postData = function (data) {
        console.log("reached addMobile service", data);
        return $http.post('/api/mobiles', data);
    }
    return {
        postData: postData
    }
}
