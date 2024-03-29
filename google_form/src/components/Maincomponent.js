import React, { useEffect, useState } from 'react'
import '../css/mainbody.css'
import { IconButton } from "@material-ui/core";
import { ArrowDropDown, MoreVert } from '@material-ui/icons';
import { FolderOpen, Storage } from '@material-ui/icons';
import { useNavigate } from "react-router-dom"



export default function Maincomponent() {
  const navigate = useNavigate()

  function navigate_to(docname){
    var fname=docname.split(".")
    navigate('/form/'+fname[0])
  }
  const [files,setfiles]=useState([])


  useEffect(() => {
    async function  Filesname(){
      const response = await fetch(`http://localhost:8000/form/get/list_of_files`,{
        methhd:"GET",
        headers:{
          "Content-Type":"application/json",
          "ngrok-skip-browser-warning": true,
  
        }
      }
      );
      const data = await response.json();
      setfiles(data);
    }
    Filesname()
  },[])

  return (
    <div className='main_body'>
  
      <div className='mainbody_top'>
        <div className='mainbody_top_left my-4' style={{fontSize:"25px",fontWeight:"500"}}> <strong>Recent Forms</strong></div>

        <div className='mainbody_top_right'>
            <div className='mainbody_top_center' style={{fontSize:"14px", marginRight:"125px"}}>Owned By You <ArrowDropDown/></div>
            <IconButton>
                <Storage style={{fontSize:"16px", color:"black"}}/>
            </IconButton>
            <IconButton>
                <FolderOpen style={{fontSize:"16px", color:"black"}} />
            </IconButton>
        </div>
      </div>
      <div className='mainbody_docs'>
      <div className='doc_card_container_horizontal' style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>

      {
        files.map((e)=>(
          <div className='doc_card_container my-2'>
          <div className='doc_card' onClick={()=>{navigate_to(e)}}>
          <img src="https://i.ytimg.com/vi/Fu4_gs25Iw8/maxresdefault.jpg" alt="" className='doc_image' />
          <div className='doc_card_content'>
            <h5 style={{overflow:"ellipsis"}}>{e ? e : "Untitled Doc"}</h5>
            <div className='doc_content' style={{fontSize:"12px", color:"gray"}}>
              <div className='doc_conent_left'>
                <Storage style={{color:"white", fontSize:"12px", backgroundColor:"6E2594", padding:"3px", marginRight:"2px", borderRadius:"2px"}}/>
              </div>
              <MoreVert style={{fontSize:"16px", color:"gray"}}/>
            </div>
          </div>
        </div>
        </div>
        ))
      }
        
      </div>
      </div>
    </div>
  )
}
