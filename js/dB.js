var db;

function openDb(name,version,d_name,size)
{
    db = window.openDatabase(name, version, d_name, size);
}

function eraseDb(params)
{
    for(i=0;i<params.length;i++)   
    {
        var sqltxt = "DROP TABLE IF EXISTS " + params[i];
        executeSQL(sqltxt);
    }
}

function createTable(tabla,campos)
{
    var sqltxt = "CREATE TABLE IF NOT EXISTS "+ tabla + "(" + campos + ")";
    executeSQL(sqltxt);
}

function insertDb(tabla, campos, valores)
{
    var sqltxt = "INSERT INTO " + tabla + "("+ campos +") VALUES (" + valores + ")";
    executeSQL(sqltxt);
    
}

function executeSQL(sql)
{
    console.log(sql);
    db.transaction(function(tx){
                                tx.executeSql(sql)
                                }, txError, txSuccess);
}

function selectDb(tabla)
{
    var sqltxt="SELECT * FROM " + tabla;
    db.transaction(createDb,txError,txSuccess);
}
                   
function createDb(tx)
{
    tx.executeSql('select * from Usuario', [], function(tx, rs) {
    for (var i = 0; i < rs.rows.length; i++) {
        var p = rs.rows.item(i);
        navigator.notification.alert(p.nombre);
    }}, txError);
}

function txError(error) {
    console.log(error);
    console.log("Database error: " + error);
}

function txSuccess() {
    console.log("Success");
}