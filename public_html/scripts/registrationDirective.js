angular.module('registrationModule',[])
        .directive('registrationDirective',function(){
   return{
       restrict: 'E',
       templateUrl:'scripts/Templates/registrationDirective.html',
       controller:function($scope){
           $scope.registrationOption=[
               {optName:'Imię',id:'name'},
               {optName:'Nazwisko',id:'surname'},
               {optName:'Adres',id:'address'},
               {optName:'Numer',id:'flatNumber'},
               {optName:'Kod pocztowy', id:'zipCode'},
               {optName:'Miasto',id:'city'},
               {optName:'Adres e-mail', id:'email'},
               {optName:'Telefon',id:'phone'}
           ];
           $scope.checkForm=function()
           {
               var json={};
               for(var i=0;i<$scope.registrationOption.length;i++)
               {
                   var value = document.getElementById($scope.registrationOption[i].id).value; 
                   json[$scope.registrationOption[i].id]=value;
               }
               var pass1= document.getElementById('pass').value;
               var pass2= document.getElementById('repeat').value;
               if(pass1===pass2)
               {
                   json["password"]=pass1;
               }
               $.ajax({
                    type: "POST",
                    url: "http://127.0.0.1:8000/api/register",
                    // The key needs to match your method's input parameter (case-sensitive).
                    data: JSON.stringify(json),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(data){
                        Cookies.set("username",json["email"]);
                        $scope.options[3]['name']=" "+json["email"];
                        $scope.options[3]['className']="glyphicon glyphicon-user";
                        $scope.options[2]['name']="Wyloguj";
                        $scope.options[2]['className']="glyphicon glyphicon-off";
                        $scope.$apply();
                        $scope.changeSite('main-content-directive'," Strona główna");
                    },
                    failure: function(errMsg) {
                        alert(errMsg);
                    }
                });
           };
       }
   };
});
