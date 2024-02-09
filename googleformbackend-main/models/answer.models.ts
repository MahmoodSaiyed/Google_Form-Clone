import { QueryError, ResultSetHeader, RowDataPacket } from 'mysql2'
import {Request,Response} from "express"
import { cN } from "../config"
import { optionInterface,questionInterface,documnetInterface } from './interface.models';
export class answerModel{
    static async add_aswer(data:(string|number)[]):Promise<string|boolean>
    {
        const qry=`insert 
                      into 
                        studentAnswer(document_name,ques_text,student_answer)
                            values(?,?,?)`;

        cN.query(qry,data,(err:any,result:ResultSetHeader[])=>
        {
            if(err){
                throw err
            }
            
        })
        return true
    }


}
