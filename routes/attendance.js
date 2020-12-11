var express = require('express');
var router = express.Router();
const { route } = require('./attendance');

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

    if (loginCheck(req,res,next)){
        res.redirect("/users/login");
        return;
    }
    else{
        res.render('attendance/index',{
            title:"活動出欠",
        })
    }
})
router.post("/",(req,res,next)=>{
    
})

module.exports = router;