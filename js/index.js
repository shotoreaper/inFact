   //navigator.notification.vibrate(1000);
   //navigator.notification.alert("Hello");
   //navigator.notification.beep(1); 

document.addEventListener("deviceready", onDeviceReady(), false);

function onDeviceReady()
{
    isFirstLaunch();   
    openDb("infactdb","0.1","inFactDB",1000000);
    selectDb("Usuario");
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
        window.location = "html/register.html";
    }
    
}

function loginUser()
{
    //Comprobamos que la contraseña introducida es correcta
    
    //Si lo es: vamos a menu.html
    
    //Si no lo es: mostramos label "Error"
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