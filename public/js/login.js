$(function() {
  $("#login").on('click', function(e){
    var usuario=$("#user").val();
    var password=$("#pswd").val();
    $.ajax("login/"+usuario+"/"+password,
            {
                "method":"POST",
                "data":{},
                "dataType":"json",
                "success":function(jsonDoc,status,jqXHR){

                },
                "error":function(jqXHR,status, errorMsg){
                    console.log("error");
                    console.log(errorMsg);
                }
            }
    );//ajax
  });
});
