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

function updateDb(tabla, campos, valores)
{
    var cam_split = campos.split(',');
    var val_split = valores.split(',');
    var sqltxt = "UPDATE " + tabla + " SET ";
    for(var i = 0; i < cam_split.length; i++)
    {
        sqltxt = sqltxt + cam_split[i] + "=" + val_split[i];
        if(i<cam_split.length-1)
        {
            sqltxt = sqltxt + ",";   
        }
    }
    executeSQL(sqltxt);
    
}

function executeSQL(sql)
{
    db.transaction(function(tx){
                                tx.executeSql(sql)
                                }, txError, txSuccess);
}



function txError(error) {
    console.log(error);
    console.log("Database error: " + error);
}

function txSuccess() {
    console.log("Success");
}