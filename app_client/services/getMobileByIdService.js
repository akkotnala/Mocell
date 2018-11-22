angular.module('myApp')
    .service('getMobileByIdService', getMobileByIdService);

function getMobileByIdService($http){
    var getData = function(mobileid){
        console.log("reached getMobileByIdService", mobileid);
        return $http.get('/api/mobiles/' + mobileid);
    }
    return{
        getData: getData
    }
}