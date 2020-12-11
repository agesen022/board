var express = require('express');
var router = express.Router();
const { route } = require('./attendance');
let url = require("url");
require('dotenv').config();
const {GoogleSpreadsheet} = require('google-spreadsheet')

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
    let url_sheet = url.parse(req.body.url,true);
    let spreadsheet_id = url_sheet.pathname.split("/")[3];
    let worksheet_id = url_sheet.hash.split('=')[1];

    async function loadSpreadsheet(){
        const doc = new GoogleSpreadsheet(spreadsheet_id);
        const credentials = require('../credentials.json');
        await doc.useServiceAccountAuth(credentials);
        await doc.loadInfo();
      
        const attendanceSheet = await doc.sheetsById[worksheet_id];
        const attendanceRows = await attendanceSheet.getRows();
        /*let attendant_row = attendanceRows.find(row=>
          row.attendance === "参加"
        )*/
        let attendant_row = new Array();
        for (let i=0;i<attendanceRows.length;i++){
          if (attendanceRows[i].attendance==="参加"){
            attendant_row.push(attendanceRows[i]);
          }
        }
        let attendant = new Array();
        for (let i=0;i<attendant_row.length;i++){
          attendant.push(attendant_row[i]._rawData.slice(1,2)[0]);
        }
      
        return attendant;
    }
    
    async function jikkou(){
        let attendants = new Array();
        await loadSpreadsheet()
        .then(attendant=>{
            for (let i of attendant){
                attendants.push(i)
            }
            attendants = attendants.filter(function (x, i, self) {
                return self.indexOf(x) === i;
              });
        })
        .catch(err=>console.error(err));
        
        res.render('attendance/index2',{
            title:'活動出欠',
            url:req.body.url,
            attendant:attendants,
        })
    }
    jikkou();
})

module.exports = router;