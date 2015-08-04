$(function() {
  $("#formMap").hide();
  $("#login").on('click', function(e){
    var usuario=$("#user").val();
    var password=$("#pswd").val();
    var ningunError=true;
    var mensaje=[];

    if( usuario == null || usuario.length == 0 || /^\s+$/.test(usuario) ) {
      ningunError=false;
      mensaje.push("Escriba un usuario\n");
    }
    if( password == null || password.length == 0 || /^\s+$/.test(password) ) {
      ningunError=false;
      mensaje.push("Escriba una contraseña\n");
    }
    if (!ningunError) {
      //$("#mensaje").text(mensaje);
      $( "#popupMensaje p" ).remove();
      for (var i = 0; i < mensaje.length; i++) {
        $( "#popupMensaje" ).append("<p>"+mensaje[i]+"</p>");
      }
      $( "#popupMensaje" ).popup( "open", {} );
    }else{
      $.ajax("login/"+usuario+"/"+password,
              {
                  "method":"POST",
                  "data":{},
                  "dataType":"json",
                  "success":function(jsonDoc,status,jqXHR){
                    console.log(jsonDoc);
                    if(jsonDoc.mostrar!=1){
                      $( "#popupMensaje p" ).remove();
                      $( "#popupMensaje" ).append("<p>Usuario o contraseña inválido</p>");
                      $( "#popupMensaje" ).popup( "open", {} );
                    }
                    if (jsonDoc.mostrar==1) {
                      //$("#formMap").show();
                      $("#btnMap").click();
                      sessionStorage.setItem("correo",jsonDoc.correo);
                      console.log(sessionStorage.correo);
                    }
                  },
                  "error":function(jqXHR,status, errorMsg){
                      console.log("error");
                      console.log(errorMsg);
                  }
              }
      );//ajax
    }//if else ningunError
  });
});
