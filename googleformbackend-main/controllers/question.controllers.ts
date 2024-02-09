import { Request, Response } from "express"
import { questionModel } from "../models/question.models"
import { documnetInterface } from "../models/interface.models"
export class questionController {
    static async add(req: Request, res: Response) {   //ques_text,ques_type,opt_one,opt_two,opt_three,opt_four,answer,answerKey,points,opens,requires,doc_id
        const data = req.body

        const documentInfo = [data.document_name, data.doc_desc, req.body.id]
        const docResult: string | boolean = await questionModel.add_data_document(documentInfo)

        //docId check
        const docId: string | number = await questionModel.show_data_document(data.document_name)
        if (typeof docId == "string") {
            return res.status(400).send({ Error: docId })
        }

        //add data in database (document data and question data).
        let quesResult: string | boolean = "";
        let aswResult: string | boolean = "";
        for (let quesItem of data.questions) {
            const questionInfo = [quesItem.questionText, quesItem.questionType]
            if (quesItem.options.length < 4) {
                // questionInfo.push(quesItem.options[i])

                const length = 4 - quesItem.options.length

                for (let i = 0; i < quesItem.options.length; i++) {
                    questionInfo.push(quesItem.options[i].optionText)
                }
                for (let j = 0; j < length; j++) {
                    questionInfo.push(null)
                }

            }
            else {

                for (let optItem of quesItem.options) {
                    questionInfo.push(optItem.optionText)
                }
            }

            //,"answer":false,"answerKey":"","points":0,"open":true,"require":false
            questionInfo.push(quesItem.open, quesItem.require, quesItem.answer, docId)

            quesResult = await questionModel.add_data_questions(questionInfo)
            const lstKeys: string[] = Object.keys(quesItem)
            if (lstKeys.includes("answerKey")) {
                aswResult = await questionModel.add_aswer([quesItem.questionText, quesItem.answerKey, Number(quesItem.points)], req, res)

            }


        }

        if (docResult && quesResult && aswResult) {
            return res.status(200).send({ Message: "Data added successfully" })
        }
        return res.status(400).send({ Error: "Data will not added" })






    }

    static async show_data(req: Request, res: Response): Promise<any> {
        const data = await questionModel.show_document(req, res)

        return res.send(data)
    }

    static async get_file_list(req: Request, res: Response): Promise<any> {
        const filelst = await questionModel.show_file_list(req, res)

        return res.send(filelst)
    }
}