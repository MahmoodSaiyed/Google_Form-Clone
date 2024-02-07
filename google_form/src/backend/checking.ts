import Express,{Request,Response} from "express"

export const check=Express.Router()


check.get("/get",(req:Request,res:Response)=>
{  res.send("done")

})