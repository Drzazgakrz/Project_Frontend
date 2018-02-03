angular.module('resetPasswordModule',[]).directive('resetPasswordDirective',function(){
    return{
        restrict: 'E',
        templateUrl:'scripts/Templates/resetPasswordDirective.html',
        controller:function($scope){
            $scope.resetPassword=function()
            {
                var json={};
                json['email']=document.getElementById('email').value;
                console.log(json['email']);
                var pass=document.getElementById('password').value;
                var pass2 = document.getElementById('repeat').value;
                if(pass===pass2)
                {
                    json['password']=pass;
                    console.log(json['password']);
                    $.ajax({
                        type: "POST",
                        url: "http://127.0.0.1:8000/api/update",
                        data: JSON.stringify(json),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function(data){
                            alert("Hasło pomyślnie zmienione");
                        },
                        failure: function(errMsg) {
                            alert(errMsg);
                        }
                    });
                }
            };
        }
    };
});

