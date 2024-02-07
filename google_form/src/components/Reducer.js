
export const initialState ={
    question:[{questionText:"questions",questionType:"radio", options:[{optionText:'option 1'}],open:true,require:false}],
    questionType:"radio",
    doc_name:"untitled form",
    doc_desc:'add the description'
}
export const actionTypes={
    SET_QUESTION:"SET_QUESTION",
    CHANGE_TYPE:"CHANGE_TYPE",
    SET_DOC_NAME:"SET_DOC_NAME",
    SET_DOC_DESC:"SET_DOC_DESC"
}
const reducer =(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.SET_QUESTION:
            return{
                ...state,question:action.question,
            }
            case actionTypes.CHANGE_TYPE:
            return{
                ...state,questionType:action.questionType,
            }
            case actionTypes.SET_DOC_NAME:
            return{
                ...state,doc_name:action.doc_name,
            }
            case actionTypes.SET_DOC_DESC:
            return{
                ...state,doc_desc:action.doc_desc,
            }
            default :

            return state
    }
}
export default reducer