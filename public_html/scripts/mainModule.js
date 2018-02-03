var shopApp=angular.module('cdShop',['shopModule','mainContentModule','registrationModule','signInModule','ordersModule','resetPasswordModule']);
shopApp.controller('mainController', function($scope, $compile){
   $scope.userName=Cookies.get("username")?Cookies.get("username"):null;
   $scope.mainPage=true;
   $scope.options=[
        {name:" Strona główna", className:"glyphicon glyphicon-home", execute:function(){
                $scope.changeSite('main-content-directive',this.name);
        },active:true},
        {name:" Sklep",className:"glyphicon glyphicon-shopping-cart", execute: function(){
                $scope.getProducts();
                $scope.changeSite('shop-directive',this.name);
            },active:false},
        {name:(Cookies.get("username")?"Wyloguj":" Zarejestruj się"), className:"glyphicon glyphicon-registration-mark", execute: function(){
                if(this.name==="Wyloguj")
                    $scope.logout();
                else
                    $scope.changeSite('registration-directive',this.name);
        },active:false},
        {name:($scope.userName?$scope.userName:" Zaloguj się"), className:"glyphicon glyphicon-log-in", execute: function(name){
                if(this.name===" Zaloguj się")
                    $scope.changeSite('sign-in-directive',this.name);
                else
                    $scope.showOrders();                
                },active:false}
   ];
   $scope.orders=[];
   $scope.showOrders=function()
   {
       $scope.orders=[];
       var json = {'email':Cookies.get('username')};       
       $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8000/api/orders",
            data: JSON.stringify(json),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){        
                var keys = Object.keys(data['data']);
                for(var i =0;i<keys.length;i++)
                {                        
                    var key = keys[i];                           
                    var name = data['data'][key]; 
                    $scope.orders.push({"id":key,"name":name[0], execute:function(){$scope.delete(this.id);}});                             
                }
                $scope.$apply();
            },
             failure: function(errMsg) {
                $scope.$apply();
            }
        });               
        $scope.changeSite("orders-directive",$scope.options[3].name);
   };
   $scope.delete= function(id)
    {
        var json = {'id':id};
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8000/api/delete_order",
            data: JSON.stringify(json),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                $(document.getElementById('main')).empty();
                $scope.showOrders();
            },
            failure: function(errMsg) {
                $(document.getElementById('main')).empty();
                $scope.showOrders();
            }
        });
    };
   $scope.getProducts = function () {
        $.getJSON('http://127.0.0.1:8000/api/products',function(result){  
            for(var i = 0; i<$scope.products.length;i++)
            {
                var name = $scope.products[i].name;
                if($scope.find(result.data,name)<0)
                {
                    $scope.products.splice(i,1);  
                    $scope.$apply();
                }
                
            }
        });
    };
   $scope.find = function(array, name)
   {
       for(var i = 0;i<array.length;i++)
       {
           if(array[i]['name']===name)
           {
             return i;       
           }
       }
       return -1;
   };
   $scope.changeSite=function(name,id){
       
        var previous={name:$scope.thisPage.name,id:$scope.thisPage.id};
        $scope.thisPage.prev.push(previous);
        if(id!==null){
                $scope.thisPage.name=name;
                $scope.thisPage.id=id;
                $(document.getElementsByClassName('active')).removeClass('active');
                $(document.getElementById(this.name)).addClass('active');
        }        
        $(document.getElementById('main')).empty();
        var directive = document.createElement(name);
        $compile(directive)($scope);
        angular.element(document.getElementById("main")).append(directive);        
   };
   $scope.thisPage={name:'main-content-directive',id:' Strona główna',prev:[]};
   $scope.goBack=function(){
       if($scope.thisPage.prev.length>0){
        var counts=$scope.thisPage.prev.length-1;
        $scope.thisPage.name=$scope.thisPage.prev[counts].name;
        $scope.thisPage.id=$scope.thisPage.prev[counts].id;
        $scope.thisPage.prev.splice(counts,1);
        $(document.getElementsByClassName('active')).removeClass('active');
        $(document.getElementById('main')).empty();
        var directive = document.createElement($scope.thisPage.name);
        var element = $compile(directive)($scope);
        angular.element(document.getElementById("main")).append(directive);
        $(document.getElementById($scope.thisPage.id)).addClass('active');
    }
   };
   $scope.logout=function()
   {
        Cookies.remove("username");
        $scope.options[3]['name']=" Zaloguj się";
        $scope.options[3]['className']="glyphicon glyphicon-log-in";
        $scope.options[2]['name']=" Zarejestruj się";
        $scope.options[2]['className']="glyphicon glyphicon-registration-mark";
        $scope.$apply();  
        $scope.changeSite('main-content-directive'," Strona główna");
   };
});