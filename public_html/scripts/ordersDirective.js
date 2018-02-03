angular.module('ordersModule', []).directive('ordersDirective',function(){
   return {
       restrict: 'E',
       templateUrl:'scripts/Templates/ordersDirective.html',
       controller: function($scope)
       {
           $scope.userOrders = $scope.orders;           
       }
   };
});


