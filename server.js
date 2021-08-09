const express = require('express');
const mysql = require('mysql');
const app = express();

app.get('/',(req,res) => {
    res.send('Totul incepe cand totul se termina!')
});
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'yomeal_site'
})

//important pentru a accesa datele de pe laptop 
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
app.use(allowCrossDomain);
//
db.connect((err) => {
    if(err){
        throw(err);
    }
    console.log('Mysql connected succesfuly');
});
app.get('/getdata' ,(req,res) => {
    let sql='SELECT * from ingrediente_sand';
    db.query(sql ,(err,results) => {
        if(err) {throw(err)};
        console.log(results);
        res.send(results);
    })
});

app.listen(4000, console.log('SE asculta pe 4000'));