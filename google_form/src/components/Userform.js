import { Button, Typography } from '@material-ui/core'
import React ,{useState,useEffect} from 'react'
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Radio from '@material-ui/core/Radio';

import {  useNavigate } from 'react-router-dom';
import "../css/user_form.css"
import { useStateValue } from './StateProvider';
import axios from 'axios';

function Userform() {
    var quest = [];
    // var post_answer = [];
    var navigate = useNavigate()
    var [answer,setAnswer] = useState([])
    var [{question,doc_name,doc_desc}] = useStateValue()
    console.log (doc_name)

    function select(que,option){
    
    var k =answer.findIndex((ele)=>(ele.question === que))

    answer[k].answer=option
        setAnswer(answer)
}

 useEffect(()=>{
        question.map((q)=>{
            return answer.push({
            "question": q.questionText,
            "answer" : " "
            })
            
        })
        question.map((q,qindex)=>{
           return quest.push(    {"header": q.questionText, "key": q.questionText })
        })
        console.log(quest)
})

   var  post_answer_data = {}

   function selectinput(que,option){
        var k =answer.findIndex((ele)=>(ele.question === que))

        answer[k].answer=option
        setAnswer(answer)
        console.log(answer)
   }

   function selectcheck(e,que,option){
        var d =[]
        var k =answer.findIndex((ele)=>(ele.question === que))
        if(answer[k].answer){
        d=answer[k].answer.split(",")
            }
        if(e === true){
            d.push(option)
        }
        else{
            var n=d.findIndex((el)=>(el.option === option))
            d.splice(n,1)

        }
        answer[k].answer=d.join(",")
        setAnswer(answer)
   }


async function submit(){
   answer.map((ele)=>{
       console.log(ele)
       return post_answer_data[ele.question] = ele.answer
    })
   
//   axios.post(`https://9a2f-2401-4900-1f3e-844-890a-f8dc-9524-41ab.ngrok-free.app/student_response/${doc_name}`,{
//       "column": quest,
//       "answer_data" :[post_answer_data]
//   })
try {
    await fetch(`https://9a2f-2401-4900-1f3e-844-890a-f8dc-9524-41ab.ngrok-free.app/form_data/post/student_response/${doc_name}`, {
      method: "POST",
      headers: {
      
        "ngrok-skip-browser-warning": true,
        "content-type": "application/json",
      },
      body: JSON.stringify({
      "column": quest,
      "answer_data" :[post_answer_data]
      })
    }).then(async (response) => {
      await response.json();
      navigate(`/submitted`)
    });
  } catch (error) {
    console.error("Error fetching secret data:", error);
  }


}
    return (  
      <div className="submit">
        <div className="user_form">
            <div className="user_form_section">
                <div className="user_title_section">
                    <Typography style={{fontSize:"26px"}} >{doc_name}</Typography>
                    <Typography style={{fontSize:"15px"}} >{doc_desc}</Typography>

                </div>
              
                {
                question.map((questions,qindex)=>(
                    <div className="user_form_questions">
                    <Typography  style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',paddingBottom:"8px"}} >{qindex+1}.  {questions.questionText}</Typography>
                    {
                            questions.options.map((ques,index)=>(
                              
                              <div key={index} style={{marginBottom:"5px"}}>
                                  <div style={{display: 'flex'}}>
                                  <div className="form-check">
                                    
                                      {

                                        questions.questionType !== "radio" ? (  
                                          questions.questionType !== 'text' ? (
                                        <label>
                                        <input
                                        
                                        type={questions.questionType}
                                        name={qindex}
                                        value= {ques.optionText}
                                        className="form-check-input"
                                        required={questions.required}
                                        style={{margnLeft:"5px",marginRight:"5px"}}
                                        onChange={(e)=>{selectcheck(e.target.checked,questions.questionText,ques.optionText)}}
                                        /> {ques.optionText}
                                        </label>): (

                                        <label>
                                        <input

                                        type={questions.questionType}
                                        name={qindex}
                                        value= {ques.optionText}
                                        className="form-check-input"
                                        required={question.required}
                                        style={{margnLeft:"5px",marginRight:"5px"}}
                                        onChange={(e)=>{selectinput(questions.questionText,e.target.value)}}
                                        /> {ques.optionText}
                                        </label>
                                        )
                                        
                                        )
                                        
                                        :(  <label>
                                          <input
                                            
                                            type={questions.questionType}
                                            name={qindex}
                                            value= {ques.optionText}
                                            className="form-check-input"
                                            required={questions.required}
                                            style={{margnLeft:"5px",marginRight:"5px"}}
                                            onChange={()=>{select(questions.questionText,ques.optionText)}}
                                          />
                                      {ques.optionText}
                                        </label>)

                                      }
                                  
                                  </div>
                                  </div>
                                </div>
                            ))
                    }
                    </div>
                ))
                
                }         
                 
            <div className="user_form_submit">
              <Button  variant="contained" color="primary" className='mybutton' onClick={submit} style={{fontSize:"14px"}}>Submit</Button>

            </div>
       
            <div className="user_footer">
                Google Forms
            </div>
            </div>
            
        </div>
        </div>
    )
}

export default Userform
