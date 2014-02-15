function registerUser()
{           
    // Si hemos introducido los campos correctamente
    if(checkFields())
    {
        // Si estamos de acuerdo con los terminos procedemos    
        var checkbox = $("#checkbox-agree");
        if(checkbox.is(":checked"))
        {
            // Comprobamos que todos los campos sean correctos
            openDb("infactdb","0.1","inFactDB",1000000);
            
            // Borramos las tablas por si exiten ya
            var tables = ['Usuarios','Clientes'];
            eraseDb(tables);
            
            // Creamos la tabla usuario
            createTable("Usuario","nombre,apellidos,dni,email,pass,iban,telefono,calle,cp,localidad,provincia");
            
            // Insertamos al usuario
            var valores = '';
            $("#register-form").find(':input').each(function() {
             if(this.type != 'checkbox')
                {
                    if(this.id != 'rpass-id')
                    {
                        valores = valores + "'" + this.value + "'";
                        if(this.type != 'select-one')
                        {
                            valores = valores + ',' ;
                        }
                    }
                    
                }
            });
            insertDb("Usuario","nombre,apellidos,dni,email,pass,iban,telefono,calle,cp,localidad,provincia",valores);
            // Insertamos la clave local de primer inicio
            window.localStorage.setItem('launchCount',1);            
            // Esperamos 2 segundos y redireccionamos a los dos segundos
            setTimeout( function(){window.location = "menu.html";},2000);
            }
        }else{
            $("#agree-error").text("Para continuar debes aceptar los términos");
            window.scrollTo(0,500);
        }
    }


function checkFields()
{
    var bool = true;
    cleanLabels();
    if($('#nombre-id').val().length < 2)
    {
        $("#nombre-error").text("Introduce un nombre correcto");
        bool = false;
    }
    
    if($('#apellidos-id').val().length < 2)
    {
        $("#apellidos-error").text("Introduce unos apellidos correctos");    
        bool = false;
    }
    
    if($('#dni-id').val().length < 9)
    {
        $("#dni-error").text("Introduce un dni correcto");
        bool = false;
    }
    
    if($('#email-id').val().length < 3) 
    {
        $("#email-error").text("Introduce un email correcto");
        bool = false;
    }
    
    if($('#pass-id').val().length < 1  || $('#rpass-id').val().length < 1 || $('#pass-id').val() != $('#rpass-id').val()) 
    {
        $("#pass-error").text("Introduce una contraseña correcta");    
        bool = false;
    }
    
    if($('#iban-id').val().length < 24) 
    {
        $("#iban-error").text("Introduce un IBAN correcto");   
        bool = false;
    }
    
    if($('#tlfno-id').val().length < 6) 
    {
        $("#tlfno-error").text("Introduce un teléfono correcto");    
        bool = false;
    }
    
    if($('#calle-id').val().length < 3) 
    {
        $("#calle-error").text("Introduce un domicilio correcto");    
        bool = false;
    }
    
    if($('#cp-id').val().length < 5) 
    {
        $("#cp-error").text("Introduce un Código Postal correcto");   
        bool = false;
    }    
    
    if($('#localidad-id').val().length < 3) 
    {
        $("#localidad-error").text("Introduce una localidad correcta");    
        bool = false;
    }
    
    var provincia_text = $('#select-choice-1 :selected').val();
    if(provincia_text == "default") 
    {
        $("#provincia-error").text("Introduce una provincia");
        bool = false;
    }
    
    return bool;
}

function cleanLabels()
{
    $("#nombre-error").text("");  
    $("#apellidos-error").text("");  
    $("#dni-error").text("");  
    $("#email-error").text("");  
    $("#pass-error").text("");
    $("#iban-error").text("");
    $("#tlfno-error").text("");
    $("#calle-error").text("");
    $("#localidad-error").text("");
    $("#provincia-error").text("");      
}