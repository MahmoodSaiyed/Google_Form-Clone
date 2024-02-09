import Express,{Request,Response} from "express"
import fs from "fs";
export const form_data_router=Express.Router()

import ExcelJS from 'exceljs';
form_data_router.use(Express.json())
// post data from form.
    // form_data_router.post("/post/:doc_id",(req:Request,res:Response)=>
    // {
    //     var data=req.body;
    //     const name=req.params.doc_id;
    //     data=JSON.stringify(data)
    //     console.log(data)
    //     fs.writeFileSync(`./files/${name}.json`,data)

    // })

form_data_router.post("/post/:doc_id",(req:Request,res:Response)=>
{
    const data=req.body;
    const name=req.params.doc_id;
    const str_data=JSON.stringify(data)


    // fs.writeFile(`./files/${name}.json`,str_data,err=>
    // {
        
    // })


    fs.writeFile(`./files/${name}.json`, str_data, err => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error'); // Send an error response to the client
        } else {
            console.log("Data added to file successfully");
            return res.status(200).send('Data added to file successfully'); // Send a success response to the client
        



    } })


})
//show data from form.
form_data_router.get("/get/document_id/:doc_id",(req:Request,res:Response)=>
{   const docId=req.params.doc_id;
    var data=req.body;
    
    data=JSON.stringify(data)
    fs.readFile(`./files/${docId}.json`,"utf-8",(err:any,fileData:any)=> {
        if(err) throw err;
        const ques_data=JSON.parse(fileData);
        res.status(200).json(ques_data)
    })
    
 
})


//show list of file.
form_data_router.get("/get/list_of_files",(req:Request,res:Response)=>
{  
    const file_dir=fs.readdirSync("./files")
res.status(200).send(file_dir)

})

// create excell file.

form_data_router.post(`/post/student_response/:doc_id`,(req:Request,res:Response)=>
{
    const docs_data=req.body;
    console.log(docs_data.columns)
    const name=req.params.doc_id;
    var d=new Date();
    const workbook=new ExcelJS.Workbook()
    const data=req.body.answer_data;
    const worksheet=workbook.addWorksheet(`${name}`)
    worksheet.columns=[{header:"Time Stamp","key":"datetime"},...docs_data.columns]
    
    worksheet.columns.forEach(column=>
        {   
            if (column.header) { // Check if column.header is defined
                column.width = column.header.length < 12 ? 12 : column.header.length;
            }
        })

        worksheet.getRow(1).font={bold:true}
        data.forEach((e:any,index:any)=>
        {
            const rowIndex=index+2;
            worksheet.addRow({
                d,...e
            })
        })
        workbook.xlsx.writeFile(`${name}.xlsx   `)
})
