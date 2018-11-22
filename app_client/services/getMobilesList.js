angular.module('myApp')
    .service('getMobilesList', getMobilesList);

function getMobilesList($http){
    var getData = function(){
        console.log("reached getMobilesList service");
        return $http.get('/api/mobiles');
    }
    return{
        getData: getData
    }
};