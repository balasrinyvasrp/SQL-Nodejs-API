const express=require("express");
const bodyParser=require("body-parser");
require('dotenv').config();
var pool = require('./database');
const port=process.env.PORT ;
const app=express();

app.use(bodyParser.urlencoded({extended:true}))


app.get("/",(req,res)=>{
    pool.query('select * FROM cats',(err,result,fields)=>{
        if(err){
            res.send(err);
        }
        res.send(result);
    })
    
})
app.get("/:id",(req,res)=>{
    var value=req.params.id;
    pool.query('select * FROM cats where id=?',[value],(err,result,fields)=>{
        if(err){
            res.send(err);
        }
        res.send(result);
    })
    
})

app.post("/",(req,res)=>{
  var id=req.body.id;
  var name=req.body.name;
  var owner=req.body.owner;
  var birth=req.body.birth;
  pool.query("INSERT INTO cats (id,name,owner,birth) VALUES(?,?, ?, ? )",[id,name,owner,birth],(err,result,fields)=>{
    if(err){
        res.send(err);
    }
    if(result.affectedRows==1)
    res.json({ status: "Data Inserted Successfully" })
})
})

app.put("/:id",(req,res)=>{
    var value=req.params.id;
    var id=req.body.id;
    var name=req.body.name;
    var owner=req.body.owner;
    var birth=req.body.birth;

    pool.query("UPDATE cats SET id =?, name=?,owner=?,birth=? WHERE id = ?",[id,name,owner,birth,id],(err,result,fields)=>{
      if(err){
          res.send(err);
      }
      if(result.affectedRows==1)
      res.json({ status: "Data Updated Successfully" })
  })
  })

app.patch("/:id",(req,res)=>{
    var value=req.params.id;
    var flag=0;
    var query="UPDATE cats SET ";
    if(req.body.name)
    {
    query+="name='"+req.body.name+"'";
    flag=1;
    }
    if(req.body.owner){
    if(flag==1)
    query+=",";
    query+="owner='"+req.body.owner+"'";
    flag=1;
    }
    if(req.body.birth){
    if(flag==1)
    query+=",";
    query+="birth='"+req.body.birth+"'";
    }
    query+=" where id="+value;
    console.log(query);
    pool.query(query,(err,result,fields)=>{
      if(err){
          res.send(err);
      }
      if(result.affectedRows==1)
      res.json({ status: "Data Updated Successfully" })
  })
  })

app.delete("/:id",(req,res)=>{
    var value=req.params.id;
    var id=req.body.id;
    var name=req.body.name;
    var owner=req.body.owner;
    var birth=req.body.birth;
    pool.query("DELETE FROM cats WHERE id=?",[id],(err,result,fields)=>{
      if(err){
          res.send(err);
      }
      if(result.affectedRows==1)
      res.json({ status: "Data Deleted Successfully" })
  })
  })
  
app.listen(port,()=>{
    console.log("Server running on PORT "+port);
})