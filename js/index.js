   //navigator.notification.vibrate(1000);
   //navigator.notification.alert("Hello");
   //navigator.notification.beep(1); 

var samepass = false;

document.addEventListener("deviceready", onDeviceReady(), false);

function onDeviceReady()
{
    isFirstLaunch();   
}

function isFirstLaunch()
{
    // Comprobamos si esta la clave de primer registro
    //localStorage.clear();
    var firstlaunch = window.localStorage.getItem('launchCount');    
    if(firstlaunch)
    {
        // Ya la hemos iniciado antes
        console.log("Ya hemos iniciado la app antes");        
    }else{
        // Es la primera vez que iniciamos la app
        console.log("Primera vez que iniciamos");
        $.mobile.changePage("html/register.html");
    }
    
}

function loginUser()
{
    // Conectamos a la bbdd
    openDb("infactdb","0.1","inFactDB",1000000);
    //Comprobamos que la contraseña introducida es correcta
    compararPass($('#pass-id').val());
    
    setTimeout(function()
               {
                   if(samepass)
                   {
                       //Si lo es: vamos a menu.html
                       window.location = "html/menu.html";
                   }else{
                       //Si no lo es: mostramos label "Error"
                       $("#login-error").text("La contraseña que has introducido no es correcta");    
                       $("#pass-id").val("");    
                   }
               },100);
}

function compararPass(passIntro)
{
    var passDB;
    db.transaction(function(tx){tx.executeSql("SELECT pass FROM Usuario",[],function(tx,rs){passDB = rs.rows.item(0).pass;})},txError,txSuccess);
    setTimeout(function()
               {
                   if(passIntro==passDB)
                   {
                        samepass = true;  
                   }else{
                       
                        samepass = false;   
                   }
               },100);
}

 function exitFromApp()
 {
    navigator.app.exitApp();
 }

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}