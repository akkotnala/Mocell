angular.module('myApp')
    .service('updateMobileService', updateMobileService);

function updateMobileService($http) {
    var putData = function (mobileid, data) {
        console.log("reached updateMobileService", data);
        return $http.put('/api/mobiles/' + mobileid, data);
    }
    return {
        putData: putData
    }
}
