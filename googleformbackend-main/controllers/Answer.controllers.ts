import {Request,Response} from "express"
import { questionModel } from "../models/question.models"
import { documnetInterface } from "../models/interface.models"
import { answerModel } from "../models/answer.models"
export class answerController{
    static async add(req:Request,res:Response)
    {  const data=req.body;
        const keysInfo=Object.keys(data.answer_data)
        var addResult:boolean|string;
        for(let key of keysInfo)
        {
            addResult=await  answerModel.add_aswer([data.doc_name,key,data.answer_data[key]])
         if(addResult)
         {
            continue
         }
         else{
            return res.status(200).send("data not added")
         }
         
        }
        return res.status(200).send("successfully added")
        

    }

}