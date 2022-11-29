var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '111111',
    port: 3306,
    database: 'Terminal',
});
connection.connect();
const query = function (sql, callback) {
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('Error', err.message);
            return;
        }
        console.log(result[0].deptNo);
    });
    connection.end();
};
var sql = 'select * from dept';
query(sql, function (err, vals, fields) {
    //do something
});

connection.query('select * from dept', function (err, result) {
    if (err) {
      console.log('Error', err.message);
      return;
    }
    for (let i = 0; i < result.length; i++) {
      listings[result[i].deptNo.toString()] = { 'deptName': result[i].deptName };
    }
  });