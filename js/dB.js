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

function selectDb(tabla,campos,condiciones)
{
    var sqltxt="SELECT " + campos  + " FROM " + tabla + " " + condiciones;
    console.log(sqltxt);
    db.transaction(function(tx){tx.executeSql(sqltxt,[],resultsSelectDb)},txError,txSuccess);
}

function resultsSelectDb(tx,rs)
{
    for (var i = 0; i < rs.rows.length; i++) 
    {
        var p = rs.rows.item(i);
        $('#pass-id').attr("placeholder",p.nombre);
    }
}

function txError(error) {
    console.log(error);
    console.log("Database error: " + error);
}

function txSuccess() {
    console.log("Success");
}