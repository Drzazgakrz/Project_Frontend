angular.module('signInModule',[])
        .directive('signInDirective',function(){
    return{
        restrict: 'E',
        templateUrl:'scripts/Templates/signInDirective.html',
        controller($scope)
        {
            $scope.signInFields=[                
                    {optName:'Adres e-mail', id:'email'},
                    {optName:'Hasło',id:'password'}                
            ];
            $scope.signIn=function(){
                var json={};
                for (var i = 0;i<$scope.signInFields.length;i++)
                {
                    var name=$scope.signInFields[i].id;
                    json[name]=document.getElementById(name).value;
                }
                $.ajax({
                    type: "POST",
                    url: "http://127.0.0.1:8000/api/login",
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
            $scope.resetPassword=function()
            {
                $scope.changeSite('reset-password-directive',null);
            };
        }
    };
});


