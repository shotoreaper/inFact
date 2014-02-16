$(document).delegate('#modify','pageshow', function() {
    console.log("enter");
    //db.transaction(loadFavesDb, txError, txSuccess);
});

function loadData() 
{
    console.log("entro");
    openDb("infactdb","0.1","inFactDB",1000000);
    db.transaction(function(tx){tx.executeSql("SELECT * FROM Usuario",[],setData)},txError,txSuccess);
}

function setData(tx,rs)
{    
    $('#nombre-id').val(rs.rows.item(0).nombre);
    $('#apellidos-id').val(rs.rows.item(0).apellidos);
    $('#dni-id').val(rs.rows.item(0).dni);
    $('#email-id').val(rs.rows.item(0).email);  
    $('#iban-id').val(rs.rows.item(0).iban);
    $('#tlfno-id').val(rs.rows.item(0).telefono);
    $('#calle-id').val(rs.rows.item(0).calle);
    $('#cp-id').val(rs.rows.item(0).cp);
    $('#localidad-id').val(rs.rows.item(0).localidad);
    $('#select-choice-1').val(rs.rows.item(0).provincia);
    $('#select-choice-1').trigger('change');
}

function saveUser()
{           
    // Si hemos introducido los campos correctamente
    if(checkFields())
    {
        // Insertamos al usuario
        var valores = '';
        $("#modify-form").find(':input').each(function() {
         if(this.type != 'checkbox')
            {
                valores = valores + "'" + this.value + "'";
                if(this.type != 'select-one')
                {
                    valores = valores + ',' ;
                }
            }
        });
        updateDb("Usuario","nombre,apellidos,dni,email,iban,telefono,calle,cp,localidad,provincia",valores);        
        // Esperamos 2 segundos y redireccionamos a los dos segundos
        setTimeout( function(){ $.mobile.changePage("index.html");},2000);
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