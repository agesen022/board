"use strict"
require('dotenv').config();
const {GoogleSpreadsheet} = require('google-spreadsheet')

var express = require('express');
var router = express.Router();

/*
async function loadSpreadsheet(){
  const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
  const credentials = require('../credentials.json');
  await doc.useServiceAccountAuth(credentials);
  await doc.loadInfo();

  const attendanceSheet = await doc.sheetsById[process.env.ATTENDANCE_WORKSHEET_ID];
  const attendanceRows = await attendanceSheet.getRows();
  /*let attendant_row = attendanceRows.find(row=>
    row.attendance === "参加"
  )*
  let attendant_row = new Array();
  for (let i=0;i<attendanceRows.length;i++){
    if (attendanceRows[i].attendance==="参加"){
      attendant_row.push(attendanceRows[i]);
    }
  }
  let attendant = new Array();
  for (let i=0;i<attendant_row.length;i++){
    attendant.push(attendant_row[i]._rawData.slice(1,2));
  }

  return attendant;
}

loadSpreadsheet()
.then(attendant=>console.log(attendant))
.catch(err=>console.error(err));
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Shun Kishimoto's portfolio page" });
});

module.exports = router;
