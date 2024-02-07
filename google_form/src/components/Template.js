import React from 'react'
import UnfoldMoreIcons from '@material-ui/icons/UnfoldMore'
import MoreVertIcons from '@material-ui/icons/MoreVert'
import '../css/Template.css'
import { IconButton } from "@material-ui/core"
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from "react-router-dom"

export default function Template() {
  const navigate = useNavigate()

  const createform = async () => {
    const id = uuidv4()
    console.log(typeof id)
    localStorage.setItem('formid',id)

  //   const question_list=[{questionText:"Question",questionType:"radio", options:[{optionText:'option 1'}],open:true,require:false
  // }]
  //   try {
  //     await fetch(`https://9a2f-2401-4900-1f3e-844-890a-f8dc-9524-41ab.ngrok-free.app/form_data/post/${id}`, {
  //       method: "POST",
  //       headers: {
        
  //         "ngrok-skip-browser-warning": true,
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify({
  //        "document_name":"Untitled Form",
  //        'doc_desc':'Add Description',
  //        "questions":question_list
  //       })
  //     }).then(async (response) => {
  //       await response.json();
  //     });
  //   } catch (error) {
  //     console.error("Error fetching secret data:", error);
  //   }

    navigate('/form/' + id)
  }

  return (
    <div className='template_section'>
      <div className='template_top'>
        <div className='template_left'>
          <span style={{ color: "202124", fontSize: "16px" }}> Start new form</span>
        </div>
        <div className='template-right'>
          <div className='gallery_button'>
            Template
            <UnfoldMoreIcons fontSize='small' />
          </div>
          <IconButton>
            <MoreVertIcons fontSize='small' />
          </IconButton>
        </div>
      </div>
      <div className='template_body'>
        <div className='card' onClick={createform}>
          <img src="https://i.pinimg.com/736x/c9/d4/22/c9d422abc399e4f932c8a5eeff6e7a25.jpg" alt=""  className='card_image'/>
          <p className='card_title'>Blank</p>
        </div>
        <div className='card'>
          <img src="https://i.pinimg.com/736x/c9/d4/22/c9d422abc399e4f932c8a5eeff6e7a25.jpg" alt=""  className='card_image'/>
          <p className='card_title'>Party invite</p>
        </div>

        <div className='card'>
          <img src="https://i.pinimg.com/736x/c9/d4/22/c9d422abc399e4f932c8a5eeff6e7a25.jpg" alt=""  className='card_image'/>
          <p className='card_title'>Contact Info</p>
        </div>
      </div>
    </div>
  )
}