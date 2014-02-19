   //navigator.notification.vibrate(1000);
   //navigator.notification.alert("Hello");
   //navigator.notification.beep(1); 

var samepass = false;
/*
document.addEventListener("deviceready", onDeviceReady(), false);

function onDeviceReady()
{
    //loadPage("html/login/index.html");
    $('#container').load('html/login/index.html',function(){ $('#container').trigger('create'); });
}

*/

//var pageinMemory = new Array();


/*
b.addEventListener('touchstart',function(e) {
 changePage('html/menu.html','slide');
});*/

$( document ).ready(function() {
    isFirstLaunch();   
});

function isFirstLaunch()
{
    // Comprobamos si esta la clave de primer registro
    //localStorage.clear();
    var firstlaunch = window.localStorage.getItem('launchCount');    
    if(firstlaunch)
    {
        // Ya la hemos iniciado antes
        console.log("Ya hemos iniciado la app antes");
        // Cargamos en login.html
        $('#page1').load('html/login/index.html',function(){ $('#page1').trigger('create'); });
        
    }else{
        // Es la primera vez que iniciamos la app
        console.log("Primera vez que iniciamos");        
        $('#page1').load('html/login/index.html',function(){ $('#page1').trigger('create'); });
        var b=document.getElementById('forget')
        //$('#container').load('html/register/index.html',function(){ $('#container').trigger('create'); });
    }
    
}

function changePage(url,slide)
{
    var nextPage;
    if ($.mobile.activePage.attr("id")=='page1')
    {
        nextPage = 'page2';   
    }else{
        nextPage = 'page1';
    }
   
    $.get(url, function(data)
    {
        document.getElementById(nextPage).innerHTML=data;
        setTimeout(function(){$.mobile.changePage(  "#"+nextPage, { transition: slide, changeHash: false });   
         $("#"+nextPage).trigger('create');},50);
    });    
    
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
                       $('#container').load('html/menu.html',function(){ $('#container').trigger('create'); });
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
