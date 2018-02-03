var module = angular.module('shopModule',[]);
module.directive('shopDirective',function(){
    return{
        restrict: "E",
        templateUrl:"scripts/Templates/Shop-directive.html",
        controller:function($scope)
        {
            $scope.products=[
                {name:"Emperor-In The Nightside Eclipse", source:"style/images/in_the_nightside_eclipse.jpg",execute:function(){
                        $scope.order(this.name);
                    }},
                {name:"Megadeth-Rust In Peace", source:"style/images/rust_in_peace.jpg",execute:function(){
                        $scope.order(this.name);
                    }},
                {name:"Bathory- Twilight of the gods", source:"style/images/Twilight_of_the_gods.jpg",execute:function(){
                        $scope.order(this.name);
                    }},
                {name:"Dissection- Storm of the lights bane", source:"style/images/storm_of_the_ligths_bane.jpg",execute:function(){
                        $scope.order(this.name);
                    }}
            ];   
            $scope.order=function(name)
            {
                if(Cookies.get('username'))
                {
                    var json = {'email':Cookies.get('username'),'productName':name};
                    $.ajax({
                        type: "POST",
                        url: "http://127.0.0.1:8000/api/order_product",
                        data: JSON.stringify(json),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function(data){
                            alert("Zamówienie złożone");
                        },
                        failure: function(errMsg) {
                            alert(errMsg);
                        }
                    });
                }
            }
        }
    };
});


