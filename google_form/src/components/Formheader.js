import React from 'react'
import '../css/formheader.css'
import { IconButton } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import formimg from '../images/google-forms.png'
import {IoMdFolderOpen} from 'react-icons/io'
import { FiStar,FiSettings } from 'react-icons/fi';
import { ColorLens } from '@material-ui/icons';
import {AiOutlineEye} from 'react-icons/ai'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useStateValue } from './StateProvider';
import { useNavigate } from 'react-router-dom';

export default function Formheader() {
  const navigate=useNavigate()
   const [{doc_name}]=useStateValue()
   function navigates(){
    navigate('/response')
   }
  return (
    <div className='form_header'>
        <div className='form_header_left'>
            <img src={formimg} alt=""  height={"45px"} width={"40px"}/>
            <input type="text" placeholder='Untitled Form'  className='form_name' value={doc_name}/>
            <IoMdFolderOpen className='form_header_icon' style={{marginRight:"10px"}}></IoMdFolderOpen>
            <FiStar className='form_header_icon' style={{marginRight:"10px"}}></FiStar>
            <span style={{fontSize:"12px", fontWeight:"600"}}>All Changes save in Drive</span>
        </div>
        <div className='form_header_right'>
            <IconButton>
            <ColorLens size='small' className='form_header_icon'/>
            </IconButton>

            <IconButton onClick={navigates}>
            <AiOutlineEye className="form_header_icons"/>
            </IconButton>
            <IconButton>
            <FiSettings className="form_header_icons"/>
            </IconButton>
            <Button variant='contained' color='primary'>Send</Button>
            <IconButton>
            <MoreVertIcon className="form_header_icons"/>
            </IconButton>
            <IconButton>
            <Avatar className="form_header_icons"/>
            </IconButton>
        </div>
    </div>
  )
}
