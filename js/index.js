var db;

$('#register').bind('pageinit', function(event) {
    //db = window.openDatabase("inFactDB","0.1","inFact DB", 1000);
    //db.transaction(createDb, txError, txSuccess);
});

function registerUser()
{
    
}

function createDb(tx) {
    tx.executeSql("DROP TABLE IF EXISTS usuarios");
    tx.executeSql("CREATE TABLE usuarios(nombre)");
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