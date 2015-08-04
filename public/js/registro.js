$(function() {
  $("#formMapa").hide();
  $("#btnRegistro").on('click', function(e){
    var usuario=$("#user").val();
    var password=$("#pswd").val();
    var cpassword=$("#cpswd").val();
    var correo=$("#correo").val();

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
    if( cpassword == null || cpassword.length == 0 || /^\s+$/.test(cpassword) ) {
      ningunError=false;
      mensaje.push("Escriba la confirmación de la contraseña\n");
    }
    if( correo == null || correo.length == 0 || /^\s+$/.test(correo) ) {
      ningunError=false;
      mensaje.push("Escriba un correo electrónico\n");
    }
    if (!ningunError) {
      //$("#mensaje").text(mensaje);
      $( "#popupBasic p" ).remove();
      for (var i = 0; i < mensaje.length; i++) {
        $( "#popupBasic" ).append("<p>"+mensaje[i]+"</p>");
      }
      $( "#popupBasic" ).popup( "open", {} );
    }else{
      $.ajax("registro/registro/"+usuario+"/"+password+"/"+cpassword+"/"+correo,
              {
                  "method":"POST",
                  "data":{},
                  "dataType":"json",
                  "success":function(jsonDoc,status,jqXHR){
                    console.log(jsonDoc);
                    if(jsonDoc.mostrar!=1){
                      $( "#popupBasic p" ).remove();
                      for (var i = 0; i < jsonDoc.mensaje.length; i++) {
                        $( "#popupBasic" ).append("<p>"+jsonDoc.mensaje[i]+"</p>");
                      }
                      $( "#popupBasic" ).popup( "open", {} );
                    }
  /*
                    //$.get("mapa",{});
                    $('#index').load('mapa', function() {
                      alert('Load was performed.');
                    });*/
                    if (jsonDoc.mostrar==1) {
                      $( "#popupBasic p" ).remove();
                      $( "#popupBasic" ).append("<p>Proceda a entrar al mapa</p>");
                      $( "#popupBasic" ).popup( "open", {} );
                      $("#formMapa").show();
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
