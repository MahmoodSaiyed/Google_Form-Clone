


export interface optionInterface {
    optionText: string
}


export interface questionInterface { 
    questionText: string, 
    questionType: string, 
    options?: optionInterface, 
    answer?: boolean, 
    answerKey?: string,
     points?: number,
      open?: boolean,
       require?: boolean 
    }

export interface documnetInterface {
    document_name: string;
    doc_desc: string;
    questions?: questionInterface[];
}