import { Button, Typography } from '@material-ui/core'
import React ,{useState,useEffect} from 'react'
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Radio from '@material-ui/core/Radio';

import {  useNavigate } from 'react-router-dom';
import "../css/user_form.css"
import { useStateValue } from './StateProvider';
import axios from 'axios';

// Form Body
function Userform() {
  var quest = [];
  var navigate = useNavigate();
  var [answer, setAnswer] = useState([]);
  var [{ question, doc_name, doc_desc }] = useStateValue();
    question.map((q) => {
      return answer.push({
        question: q.questionText,
        answer: " ",
      });
    });
    question.map((q, qindex) => {
      return quest.push({ header: q.questionText, key: q.questionText });
    });
    console.log(quest);

  
  var post_answer_data = {};
  function selectinput(que, option) {
    var k = answer.findIndex((ele) => ele.question === que);
    answer[k].answer = option;
    setAnswer(answer);

  }

  function selectcheck(e, que, option) {
    var d = [];
    var k = answer.findIndex((ele) => ele.question === que);
    if (answer[k].answer) {
      d = answer[k].answer.split(",");
    }
    if (e === true) {
      d.push(option);
    } else {
      var n = d.findIndex((el) => el.option === option);
      d.splice(n, 1);
    }
    answer[k].answer = d.join(",");
    setAnswer(answer);
  }
  async function submit() {
    answer.map((ele) => {
      console.log(ele.answer);
      return (post_answer_data[ele.question] = ele.answer);
    });

    try {
      await fetch(`https://7bfc-2401-4900-1f3f-8bb0-edd9-189a-80dc-8840.ngrok-free.app/form/post/result`, {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": true,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          doc_name:doc_name,
          // column: quest,
          answer_data: post_answer_data,
        }),
      }).then(async (response) => {
        await response.json();
      });
    } catch (error) {
      console.error("Error fetching secret data:", error);
    }
    navigate(`/submitted`);
  } 


  return (
    <div className="submit">
      <div className="user_form">
        <div className="user_form_section">
          <div className="user_title_section">
            <Typography style={{ fontSize: "26px" }}>{doc_name}</Typography>
            <Typography style={{ fontSize: "15px" }}>{doc_desc}</Typography>
          </div>

          {question.map((questions, qindex) => (
            <div className="user_form_questions" key={qindex}>
              <Typography style={{ fontSize: "15px", fontWeight: "400", letterSpacing: ".1px", lineHeight: "24px", paddingBottom: "8px" }}>
                {qindex + 1}. {questions.questionText}
              </Typography>
              {questions.questionType === "text" ? (
                <div>
                  <input
                    type="text"
                    name={qindex}
                    className="form-control"
                    onChange={(e) => {
                      selectinput(questions.questionText, e.target.value);
                    }}
                  />
                </div>
              ) : (
                questions.options.map((ques, index) => (
                  <div key={index} style={{ marginBottom: "5px" }}>
                    <div style={{ display: "flex" }}>
                      <div className="form-check">
                        {questions.questionType !== "radio" ? (
                          questions.questionType !== "text" ? (
                            <label>
                              <input
                                type={questions.questionType}
                                name={qindex}
                                value={ques.optionText}
                                className="form-check-input"
                                required={questions.required}
                                style={{ margnLeft: "5px", marginRight: "5px" }}
                                onChange={(e) => {
                                  selectcheck(e.target.checked, questions.questionText, ques.optionText);
                                }}
                              />{" "}
                              {ques.optionText}
                            </label>
                          ) : (
                            <input
                              type={questions.questionType}
                              name={qindex}
                              className="form-control"
                              onChange={(e) => {
                                selectinput(questions.questionText, e.target.value);
                              }}
                            />
                          )
                        ) : (
                          <label>
                            <input
                              type={questions.questionType}
                              name={qindex}
                              value={ques.optionText}
                              className="form-check-input"
                              required={questions.required}
                              style={{ margnLeft: "5px", marginRight: "5px" }}
                              onChange={() => {
                                selectinput(questions.questionText, ques.optionText);
                              }}
                            />
                            {ques.optionText}
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ))}
          <div className="user_form_submit">
            <Button variant="contained" color="primary" className="mybutton" onClick={submit} style={{ fontSize: "14px" }}>
              Submit
            </Button>
          </div>
          <div className="user_footer">Google Forms</div>
        </div>
      </div>
    </div>
  );
}

export default Userform;

