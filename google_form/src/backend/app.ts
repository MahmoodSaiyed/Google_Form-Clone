import Express,{Request,Response} from "express"
import cors from "cors"
import { form_data_router } from "./form_data"


//create application.
const app=Express()

app.use(cors())
app.use((req,res,next)=>
{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next()
})

app.use("/form_data",form_data_router)

app.listen(8000,async()=>
{
    console.log("we are online")
})
