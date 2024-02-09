
import { QueryError, ResultSetHeader, RowDataPacket } from 'mysql2'
import {Request,Response} from "express"
import { cN } from "../config"
import { optionInterface,questionInterface,documnetInterface } from './interface.models';
export class questionModel{
    static async add_data_document(data:(string|number)[]):Promise<string|boolean>
    {
        const qry=`insert
                     into 
                   document(doc_name,doc_desc,u_id)
                   values(?,?,?)`;

        cN.query(qry,data,(err:any,result:ResultSetHeader[])=>
        {
            if(err){
                throw err
            }
            
        })
        return true
    }
    static async show_data_document(document_name:string):Promise<number|string>
    {   var doc_id:number=0;
        const qry=`select * from document where doc_name=?`
        try{
            const promise:Promise<RowDataPacket>=new Promise ((resolve:any,reject:any)=>
            {
                cN.query(qry,document_name,(err:any,result:RowDataPacket[])=>
                {
                    if(err){
                        throw err
                    }
                    resolve(result)
                    
                })
            })
            const result=await promise;
            doc_id=result[0].id
        }catch(error)
        {
            console.log(error)
        }

        return  doc_id
    }


    static async add_data_questions(data:(string|number|undefined|null)[]):Promise<boolean|string>{
        //ques_text,ques_type,opt_one,opt_two,opt_three,opt_four,answer,answerKey,points,opens,requires,doc_id
        
        if(data.includes(undefined))
        {   console.log("check go inside if ")
            for(let i=0;i<data.length;i++)
            {   
                if(data[i]==undefined)
                {   
                    data[i]=null
                }
                continue
            }
        }


        let res:boolean|string=false;
        const query=`INSERT INTO question (ques_text, ques_type, opt_one, opt_two, opt_three, opt_four,opens, requires,answer, doc_id)  VALUES (?, ?, ?, ?, ?, ?,?,?,?,?)
        `;
                
        const promise:Promise<boolean|string>=new Promise ((resolve:any,reject:any)=>
        {
            cN.query(query,data,(err:any,result:ResultSetHeader[])=>
            {
                if(err){

                    reject(err)
                }
               resolve(true)
                
            })
        })

        res=await promise

        
        return res

    }

    static async add_aswer ( data : ( string | number ) [] ,req:Request,res:Response) : Promise < boolean | string >
    {
        const qry=`insert into answer(quest_text,answerKey,points) values(?,?,?)`;
        cN.query(qry,data,(err:any,result:ResultSetHeader[])=>
        {
            if(err)
            {   
                return false
            }
        })
        return true
    }

    static async show_document(req:Request,res:Response)
    {   
        
       const  qry=`select * from document as doc
       inner join question as ques on doc.id=ques.doc_id
       inner join answer as ans on ques.ques_text=ans.quest_text
       where doc.u_id=?`
                       


       const promise:any=new Promise ((resolve:any,reject:any)=>
       {
           cN.query(qry,req.params.u_id,(err:any,result:RowDataPacket[])=>
           {
               if(err){

                   reject(err)
               }
        
            //    if(result.length==0)
            //    {
            //     return res.send({Error:"this id not present in data base caannot be call get api"})
            //    }
              resolve(result)
               
           })
       })

    const result=await promise//take data from mysql database
    
    //Create question.
    const questions_lst:questionInterface[]=[]
    for (let i=0; i<result.length;i++)
    {  const keys=Object.keys(result[0])
        const quesObjOne:questionInterface={questionText:result[i].ques_text,questionType:result[i].ques_type}
        //create options.
        const options_obj_lst:optionInterface[]=[]      
            for(let j=6;j<10;j++)
            {

                if(result[i][keys[j]] === null)
                    {
                        continue
                    }

                options_obj_lst.push({optionText:result[i][keys[j]]})   //push data in options_obj_lst
                
            }
            
            const quesObj=Object.assign(quesObjOne,{options:options_obj_lst,open:Boolean(Number(result[i].opens)),require:Boolean(Number(result[i].require)),answer:Boolean(Number(result[i].answer)),points:Number(result[i].points),answerKey:result[i].answerKey})
            questions_lst.push(quesObj)//push quesObj in questions_lst
        

    

       }

       //return  document

       const document:documnetInterface={document_name:result[0].doc_name,doc_desc:result[0].doc_desc,questions:questions_lst}
       return document

    }


    static async show_file_list(req:Request,res:Response)
    {
        const qry=`select u_id from document`;
        const promise=new Promise<RowDataPacket> ((resolve:any,reject:any)=>
        {
            cN.query(qry,(err:any,result:RowDataPacket[])=>
            {
                if(err)
                {
                    reject(err)
                }
                resolve(result)
            })
        })
        const result=await promise
        const filelst:string[]=[]
        for(let i=0;i<result.length;i++)
        {
            filelst.push(result[i].u_id)
        }
        return filelst
        
    }

}
