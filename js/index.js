var db;

document.addEventListener("deviceready", function(){
   //navigator.notification.vibrate(1000);
   navigator.notification.alert("Hello");
   //navigator.notification.beep(1);   
}, false)

/*$('#register').bind('pageinit', function(event) {

});*/

function registerUser()
{   
    db = window.openDatabase("inFactDB","0.1","inFact DB", 100 * 1024);
    db.transaction(createDb, txError, txSuccess);    
}

function createDb(tx) {
    tx.executeSql('DROP TABLE IF EXISTS Users');
    tx.executeSql('create table Users(name)');
    tx.executeSql('insert into Users(name) values (?)',
              ["Hector"]);
    tx.executeSql('select * from Users', [], function(tx, rs) {
    for (var i = 0; i < rs.rows.length; i++) {
        var p = rs.rows.item(i);
        $('#nombre-id').attr("placeholder",p.name);
        console.log(p.name);
    }
}, txError);
}

function txError(error) {
    console.log(error);
    console.log("Database error: " + error);
}

function txSuccess() {
    console.log("Success");
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