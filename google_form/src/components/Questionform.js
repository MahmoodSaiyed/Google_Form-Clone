import React, {useState,useEffect } from 'react'
import { cloneDeep } from 'lodash';
import '../css/questionform.css'
import  {CropOriginal}  from '@material-ui/icons'
import  Select  from '@material-ui/core/Select'
import  Switch  from '@material-ui/core/Switch'
import { CheckBox } from '@material-ui/icons'
import { ShortText } from '@material-ui/icons'
import { Subject } from '@material-ui/icons'
import MoreVert from '@material-ui/icons/MoreVert'
import {BsTrash} from 'react-icons/bs'
import { IconButton, MenuItem, Typography } from '@material-ui/core'
import { FilterNone } from '@material-ui/icons'
import { AddCircleOutline } from '@material-ui/icons'
import { OndemandVideo } from '@material-ui/icons'
import { TextFields } from '@material-ui/icons'
import { BsFileText } from 'react-icons/bs'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Button from '@material-ui/core/Button'
import {FcRightUp} from 'react-icons/fc'
import { Close } from '@material-ui/icons'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import './Questionform.js'
import { useParams } from 'react-router-dom'
import { actionTypes } from './Reducer.js'
import {useStateValue} from './StateProvider.js'




export default function Questionform() {
  const {id}=useParams()
  const[{},dispatch]=useStateValue();
    const[question,setQuestion]=useState(
        [{
            questionText:"Question",
            questionType:'radio',
            options:[
                {optionText:"Option1"},
               

            ],
            answer:false,
            answerKey:'',
            points:0,
            open:true,
            require:false
        }]
    )
    const[documentName,setDocname]=useState('untitled Document')
    const[documentDesc,setDocDesc]=useState('add Description')

    // set option answer 
    function setOptionAnswer(ans,qno){
      var Questions =[...question];
      Questions[qno].answerKey=ans;
      setQuestion(Questions)
      console.log(qno+" "+ans)
    }
       // set option points 
       function setOptionPoint(points,qno){
        var Questions =[...question];
        Questions[qno].points=points;
        setQuestion(Questions)
        console.log(qno+" "+points)
      }
      // doneanswer 
      function doneAnswer(i){
        var answerquestion=[...question]
        answerquestion[i].answer=!answerquestion[i].answer
        setQuestion(answerquestion)
      }
       // Add Answer 
       function addAnswer(i){
        var answerquestion=[...question]
        answerquestion[i].answer=!answerquestion[i].answer
        setQuestion(answerquestion)
      }

    // change Queestion
    function changeQuestion(text,i){
      var newQuestion = [...question]
      newQuestion[i].questionText= text
      setQuestion(newQuestion)
    }
    // Add question type
    function addQuestionType(i,type){
      var qs=[...question]
      console.log(type)
      qs[i].questionType=type
      setQuestion(qs)
    }
    //  Change Option Value
    function changeOptionValue(text,i,j){
      var optionQuestion=[...question]
      optionQuestion[i].options[j].optionText=text
      setQuestion(optionQuestion)
    }
    // Remove OPtion 
    function removeoption(i,j){
      var removeOptionQuestion=[...question]
      if(removeOptionQuestion[i].options.length> 1){
        removeOptionQuestion[i].options.splice(j, 1)
        setQuestion(removeOptionQuestion)
      }
    }
    // Add Option
    function addOption(i){
      var  optionofQuestion=[...question]
      if(optionofQuestion[i].options.length<5){
        optionofQuestion[i].options.push({optionText:'option'+(optionofQuestion[i].options.length+1)})
      }
      else{
        console.log("max 5 option")
      }
      setQuestion(optionofQuestion)
    }
    function copyQuestion(i) {
      // Deep copy the question object
      const copiedQuestion = cloneDeep(question[i]);
      // Generate a unique ID for the copied question
      copiedQuestion.id = new Date().getTime();
      // Add the copied question to the questions array
      setQuestion([...question, copiedQuestion]);
    }
    // Delete Question
    function deleteQuestion(i){
      let qs=[...question]
      if(question.length>1){
        qs.splice(i,1)
      }
      setQuestion(qs)
      console.log("clicked")

    } 
    // Required Question 
    function requireQuestion(i){
      var reqQuestion=[...question]
      reqQuestion[i].require = !reqQuestion[i].require
      setQuestion(reqQuestion)
    }
    // Add more question 
    function addmoreQuestion(){
      // expandCloseAll()
      setQuestion([...question,
      {questionText:"Question",questionType:"radio", options:[{optionText:'option 1'}],open:true,require:false
    }])
    console.log("clicked")
    }
    // Expand all 
    // function expandCloseAll(){
    //   let qs=[...question];
    //   for(let j = 0 ; j < qs.length ; j++){
    //     qs[j].open=false;
    //   }
    //   setQuestion(qs)
    // }
    // handle Expand 
    // function handleExpand(i){
    //   let qs=[...question];
    //   for(let j = 0 ; j < qs.length ; j++ ){
    //     if(i === j){
    //       qs[i].open=true
    //     }
    //     else{
    //       qs[j].open=false
    //     }
    //   }
    //   setQuestion(qs)
    // }
    // useEffect(() => {
    //   async function  add_data(){
    //     const response = await fetch(`https://9a2f-2401-4900-1f3e-844-890a-f8dc-9524-41ab.ngrok-free.app/form_data/get/doc_id/${id}`,{
    //       methhd:"GET",
    //       headers:{
    //         "Content-Type":"application/json",
    //         "ngrok-skip-browser-warning": true,}
    //     }
    //     )
    //    const data= await response.json()
    //    setDocDesc(data.doc_desc)
    //    setDocname(data.document_name)
    //    setQuestion(data.questions)
    //    dispatch({
    //     type:actionTypes.SET_DOC_NAME,
    //     doc_name:data.document_name
    //    })
    //    dispatch({
    //     type:actionTypes.SET_DOC_DESC,
    //     doc_desc:data.doc_desc
    //    })
    //    dispatch({
    //     type:actionTypes.SET_QUESTION,
    //     question:data.questions
    //    })

    //   }
    //   add_data()
    // },[])
    

    // API CALLING 
    const committoDB = async () => {
      dispatch({
        type:actionTypes.SET_QUESTION,
        question:question
      })
      dispatch({
        type:actionTypes.SET_DOC_DESC,
        doc_desc:documentDesc
      })
      dispatch({
        type:actionTypes.SET_DOC_NAME,
        doc_name:documentName
      })
      try {
        await fetch(`https://68a5-2401-4900-1f3e-56e5-4984-a62a-eaf9-816c.ngrok-free.app/form/post/add_data/${id}`, {
          method: "POST",
          headers: {
          
            "ngrok-skip-browser-warning": true,
            "content-type": "application/json",
          },
          body: JSON.stringify({
           "document_name":documentName,
           'doc_desc':documentDesc,
           "questions":question
          })
        }).then(async (response) => {
          await response.json();
        });
      } catch (error) {
        console.error("Error fetching secret data:", error);
      }
    };

    // Form Body
    function questionUI() {
        return question.map((ques, i) => (
          <div>
            <Accordion  expanded={question[i].open}  className={question[i].open ? 'add border' : ""} >
              <AccordionSummary aria-controls='panelia-content'  id='panelia-header' elevation={1} style={{width:"100%"}}>
                {!question[i].open ? (
                  <div className='saved_question'>
                    <Typography style={{fontSize:"15px",fontWeight:"400",letterSpacing:'1px',lineHeight:'24px',paddingBottom:"8px"}}>
                      {i+1}.{question[i].questionText}
                    </Typography>
                    {ques.options && ques.options.map((op, j) => (
                      <div  key={j}>
                        <div style={{display:"flex"}}>
                          <FormControlLabel style={{marginLeft:"5px",marginBottom:"5px"}} disabled control={<input type={ques.questionType} color='primary' style={{marginRight:"3px"}} required={ques.type}/>} label={
                            <Typography style={{fontSize:"13px",fontWeight:'400',letterSpacing:'2px',lineHeight:'20px',color:'#202124'}}>
                              {ques.options[j].optionText}
                            </Typography>
                          } />   
                        </div>      
                      </div>
                    ))}
                  </div>
                ):""}
              </AccordionSummary>
              <div className='question_boxes'>
                {!question[i].answer?(
                <AccordionDetails className='add_question'>
                    <div className='add_question_top'>
                        <input type="text" className='question' placeholder='Question' onChange={(e)=>{changeQuestion(e.target.value,i)}} value={ques.questionText}/>
                        <CropOriginal style={{color:'#5f6369'}}/>
                        <Select className='select' style={{color:'#5f6369',fontSize:"13px"}}>
                            <MenuItem id='text' value="Text" onClick={()=>{addQuestionType(i,'text')}}><Subject  style={{marginRight:"10px"}} />Paragraph</MenuItem>
                            <MenuItem id='checkbox' value="Checkbox" onClick={()=>{addQuestionType(i,'checkbox')}}><CheckBox style={{ marginRight:"10px",color:"70757a"}}checked />CheckBox</MenuItem>
                            <MenuItem id='radio' value="Radio" onClick={()=>{addQuestionType(i,'radio')}}><Radio style={{ marginRight:"10px",color:"70757a"}}checked />Multiple Choice</MenuItem>

                        </Select>
                    </div>
                    {ques.options.map((op,j)=>(
                        <div className='add_question_body' key={j}>
                            {
                                (ques.questionText!=='text')?
                                <input type={ques.questionType} style={{marginRight:"10px"}}/>:
                                <ShortText style={{marginRight:"10px"}}/>
                            }
                            <div >
                                <input type="text" className='text_input' placeholder='option' value={ques.options[j].optionText} onChange={(e)=>{changeOptionValue(e.target.value,i,j)}} />
                            </div>
                            <CropOriginal style={{color:'#5f6369'}}/>
                            <IconButton aria-label='delete'>
                                <Close  onClick={()=>{removeoption(i,j)}} />
                            </IconButton>
                        </div>
                    ))}

                    {ques.options.length <5 ?(
                        <div className='add_question_body'>
                            <FormControlLabel disabled control={
                                (ques.questionText!=='text')?
                                <input type={ques.questionType} color='primary' inputProps={{"aria-lable":"secondary checkbox"}} style={{marginRight:"10px",marginLeft:"10px"}} disabled/>:
                                <ShortText style={{marginRight:"10px"}}/>
                            }
                            label={
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                <input type="text" className='text_input' style={{fontSize:"13px", width:"60px"}} placeholder='Add other'/>
                        <Button size='small' style={{textTransform:"none", color:"#4285f4",fontSize:"13px", fontWeight:"600" }} onClick={()=>{addOption(i)}} >AddOption</Button>

                                </div>
                            }/>
                                
                        </div>
                    ):""}

                    <div className='add_footer'>
                        <div className='add_question_bottom_left'>
                            <Button size='small' style={{textTransform:"none", color:"#4285f4",fontSize:"13px", fontWeight:"600"}} onClick={()=>{addAnswer(i)}}>
                                <FcRightUp style={{border:"2px solid #4285f4", marginRight:"8px", padding:"2px"}}/>Answer Key
                            </Button>
                        </div>
                        <div className='add_question_bottom'>
                            <IconButton aria-label='delete'>
                                <FilterNone  onClick={()=>{copyQuestion(i)}}/>
                            </IconButton>
                            <IconButton aria-label='delete' >
                                <BsTrash onClick={()=>{deleteQuestion(i)}}/>
                            </IconButton>
                                <span style={{color:"5f6368", fontSize:"13px"}}>Required</span><Switch name='checkedA' color='primary'checked onClick={()=>requireQuestion(i)}/>
                                <IconButton>
                                    <MoreVert/>
                                </IconButton>
                        </div>
                    </div>

                </AccordionDetails>):
                <AccordionDetails className='add_question_answer'>
                  <div className='top_header'>
                    choose Correct Answer
                  </div>
                  <div className='add_question_top_answer'>
                            <input type="text"className='question_answer' placeholder='question' value={ques.questionText} disabled />
                            <input type="number" className='points'  min={0} step={1} placeholder='0'onChange={(e)=>{setOptionPoint(e.target.value,i)}} />
                  </div>
                  {ques.options.map((op,j)=>(
                    <div className='add_question_body_answer' key={j} style={{marginLeft:"8px", marginBottom:"10px",marginTop:"5px"}}>
                      <div key={j}>
                        <div style={{display:"flex"}} className=''>
                        <div className='form_check'>
                          <label style={{fontSize:"13px"}} onClick={()=>{setOptionAnswer(ques.options[j].optionText,i)}}>
                            {(ques.questionType !== "text") ?
                            <input
                             type={ques.questionType}
                              name={ques.questionText}
                              value='option3'
                              className='form_check_input'
                              required={ques.require}
                              style={{marginRight:"10px", marginBottom:"10px", marginTop:"5px"}}/>:
                              <ShortText style={{marginRight:"10px"}}/>
                          }
                          {ques.options[j].optionText}
                          </label>
                        </div>
                        </div>
                      </div>

                    </div>
                  ))}
                  <div className='add_question_body_answer'>
                          <Button size='small' style={{textTransform:"none", color:"4285f4",fontSize:"13px",fontWeight:"600"}}>
                          <BsFileText style={{fontSize:"20px", marginRight:"8px"}}/>Add Answer Feedback</Button>
                  </div>
                  <div className='add_question_bottom_answer'>
                  <Button variant='outilined' color='primary' style={{textTransform:"none", color:"4285f4",fontSize:"12px",fontWeight:"600", marginTop:"12px"}}
                  onClick={()=>{doneAnswer(i)}}>Done</Button>

                  </div>
                </AccordionDetails>
                }
                {!ques.answer?(
                <div className='question_edit'>
                <AddCircleOutline onClick={addmoreQuestion} className='edit'/>
                <OndemandVideo className='edit'/>
                <CropOriginal className='edit'/>
                <TextFields className='edit'/>

                </div>):""}
              </div>
            </Accordion>
          </div>
        ));
      }
  return (
    <div>
      <div className='question_form'>
        <br />
        <div className='section'>
            <div className='question_titlesection'>
                <div className='question_form_top'>
                    <input type="text" className='question_form_top_name' style={{color:"black"}} placeholder='Untitled document' onChange={(e)=>setDocname(e.target.value)}/>
                    <input type="text" className='question_form_top_desc' placeholder='Form description'  onChange={(e)=>setDocDesc(e.target.value)}/>

                </div>
            </div>
            {questionUI()}
            <div className='save_form'>
              <Button variant='contained'color='primary' onClick={committoDB} style={{fontSize:"14px"}}>Save</Button>
            </div>
        </div>
      </div>
    </div>
  )
}
