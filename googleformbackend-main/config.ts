import mysql from "mysql2"
export const cN=mysql.createConnection({
    host:'localhost',
    user:"root",
    password:"root",
    database:"google_form"
})

cN.connect((err)=>
{
    if(err) throw err
    console.log("connected to database")
})