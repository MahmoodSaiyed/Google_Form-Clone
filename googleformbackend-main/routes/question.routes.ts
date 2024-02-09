import Express,{Request,Response} from "express"
import { questionController } from "../controllers/question.controllers";
import { answerController } from "../controllers/Answer.controllers";
export const form_data_router=Express.Router()
form_data_router.use(Express.json())


form_data_router.post("/post/add_data",questionController.add)
form_data_router.get("/get/file_id/:u_id",questionController.show_data)
form_data_router.get("/get/list_of_files",questionController.get_file_list)




form_data_router.post("/post/result",answerController.add)
//show data from form.
// form_data_router.get("/get/document_id/:doc_id",)


// //show list of file.
// form_data_router.get("/get/list_of_files",)

// // create excell file.

// form_data_router.post(`/post/student_response/:doc_id`,)


