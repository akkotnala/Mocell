angular.module('myApp')
        .directive('ratingStars', ratingStars);

    function ratingStars() {
        return {
          restrict: 'EA',
            scope: {
                thisRating: '=rating2'
            },
            templateUrl: '/directives/ratingStars/ratingStars.template.html'
        };
    };

