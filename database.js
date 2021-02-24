const {createPool} =require('mysql');
const pool=createPool({
    host:"localhost",
    user:"root",
    password:"XXXXXX",
    database:"pets",
    connectionLimit:10
})
module.exports=pool;
