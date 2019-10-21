var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "mani",
  password: "manibh27",
  database: "mydb"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO lists (id, name) VALUES (1, 'Tasks')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.insertId);
    });
  });