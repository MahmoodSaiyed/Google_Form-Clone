import Express,{NextFunction, Request,Response} from "express"
import { form_data_router } from "./routes/question.routes"


import ExcelJS from 'exceljs';
//create application.
const app=Express()
const cors=require("cors") 

app.use(cors({ origin: 'http://localhost:3000' }));



//app.use("/form_data",form_data_router)
app.use("/form",form_data_router)

app.listen(8000,async()=>
{
    console.log("we are online")
})

