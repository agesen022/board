var express = require('express');
var router = express.Router();
const sqlite3 = require("sqlite3");
const db = require("../models/index");
const {Op} = require("sequelize");
//const { ne } = require('sequelize/types/lib/operators');

//1ページ当たりの表示投稿数
const pnum = 10

//const router = require("./users");

//ログインチェック
function loginCheck(req,res,next){
    if (req.session.login == null){
        return true;
    }
    else{
        return false;
    }
}

router.get("/",(req,res,next)=>{
    res.redirect("/boards/0")
})
router.get("/:page",(req,res,next)=>{
/*
    if (req.session.login == null){
        res.redirect("/users/login")
    }
    else{
        res.render("boards/index",{
            title:"Boards/Index",
        })
    }
*/
    if (loginCheck(req,res,next)){
        res.redirect("/users/login");
        return;
    }
    else{
        const pg = req.params.page * pnum * 1
        db.Board.findAll({
            offset:pg,
            limit:pnum,
            order:[["createdAt","DESC"],],
            include:[{
                model:db.User,
                required:true,
            }],
        }).then((brds)=>{
            res.render("boards/index",{
                title:"Boards/Index",
                login:req.session.login,
                lists:brds,
                nowPage:req.params.page,
            })
        })
    }
})
router.post("/",(req,res,next)=>{

})

router.post("/add",(req,res,next)=>{
    db.sequelize.sync().then(()=>{
        db.Board.create({
            userId:req.session.login.id,
            message:req.body.msg,
        }).then((brds)=>{
            res.redirect("/boards");
        }).catch((err)=>{
            res.redirect("/boards");
        })
    })
})

router.get("/home/:user/:id/:page",(req,res,next)=>{
    if (loginCheck(req,res,next)){
        res.redirect("/users/login");
        return;
    }
    else{
        const id = req.params.id * 1;
        const pg = req.params.page * pnum * 1;
        db.Board.findAll({
            where:{userId:id},
            offset:pg,
            limit:pnum,
            order:[["createdAt","DESC"],],
            include:[{
                model:db.User,
                required:true,
            },],
        }).then((brds)=>{
            res.render("boards/home",{
                title:"Boards/Home/"+brds[0].User.name,
                lists:brds,
                nowPage:req.params.page,
            })
        })
    }
})
router.post("/boards/home",(req,res,next)=>{

})

module.exports = router;