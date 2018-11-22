angular.module('myApp')
    .service('deleteMobileService', deleteMobileService);

function deleteMobileService($http) {
    var deleteData = function (mobileid) {
        console.log("reached deleteMobileService", mobileid);
        return $http.delete('/api/mobiles/' + mobileid);
    }
    return {
        deleteData: deleteData
    }
}
