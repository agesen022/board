var express = require('express');
var router = express.Router();
const sqlite3 = require("sqlite3");
const db = require("../models/index");
const { route } = require('./boards');
//const { where } = require('sequelize/types');

/* GET users listing. */
/*router.get('/',(req, res, next)=>{
  n
});*/


router.get("/",(req,res,next)=>{
  if (req.session.usr == null){
    res.redirect("users/login");
  }
  else{
    res.render("users/index")
  }
})
/*
  res.render("users/index",{
    title:"Users/Mokuji",
  })
})*/

router.get("/login",(req,res,next)=>{
  if (req.session.login != null){
    db.User.findOne({where:{
      name:req.session.login.name,
      pass:req.session.login.pass,
    }}).then((usr)=>{
      if (usr == null){
        res.render("users/login",{
          title:"Users/Login",
          msg:"",
        })
      }
      else {
        req.session.login = usr;
        res.redirect("/boards");
      }
    })
  }else{
    res.render("users/login",{
    title:"Users/Login",
    msg:"",
    }
  )}
})
router.post("/login",(req,res,next)=>{
  db.User.findOne({where:{
    name:req.body.name,
    pass:req.body.pass,
  }}).then((usr)=>{
    if (usr == null){
      res.render("users/login",{
        title:"Users/Login",
        msg:"名前かパスワードに誤りがあります。正しく入力しなおしてください。",
      })
    }
    else {
      req.session.login = usr;
      res.redirect("/");
    }
  })
})

router.get("/add",(req,res,next)=>{
  res.render("users/add",{
    title:"Users/Add",
  })
})
router.post("/add",(req,res,next)=>{
  db.sequelize.sync().then(()=>{
    db.User.create({
      name:req.body.name,
      pass:req.body.pass,
    }).then((usr)=>{
      req.session.login = usr;
      res.redirect("/users/login")
    })
  })
})

router.get("/alter",(req,res,next)=>{
  res.render("users/alter",{
    title:"Users/Alter",
    namae:"",
    alart:"",
  })
})
router.post("/alter",(req,res,next)=>{
  if (req.body.alter === "変更"){
    db.sequelize.sync().then(()=>{
      db.User.findOne({where:{
        name:req.body.prename,
        pass:req.body.prepass,
      }}).then((usr)=>{
        usr.name=req.body.name;
        usr.pass=req.body.pass;
        usr.save().then(()=>{
          res.redirect("/users")
        })
      })
    })
  }
  else{
    db.User.findOne({where:{
      name:req.body.name,
      pass:req.body.pass,
    }}).then((usr)=>{
      if (usr == null){
        res.render("users/alter",{
          title:"Users/Alter",
          namae:req.body.name,
          alart:"ユーザー名またはパスワードが間違っています。正しく入力してください。",
        })
      }
      else{
        res.render("users/alteration",{
          title:"Users/alter",
          prename:req.body.name,
          prepass:req.body.pass,
        })
      }
    })
  }
})

module.exports = router;
