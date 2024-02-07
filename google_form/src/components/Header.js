import React from 'react'
import '../css/header.css'
import { IconButton } from '@material-ui/core';
import googleimage from '../images/google-forms.png'
import SearchIcon from '@material-ui/icons/Search'
import AppIcon from '@material-ui/icons/Apps'
import Avatar from '@material-ui/core/Avatar'
import TempDrawer from './TempDrawer';

export default function Header() {
  return (
    <div className='header'>
     <div className='header-info'>
<TempDrawer/>
<img src={googleimage} height={"30px"} width={"30px"} alt="" />
<div className='info'>
Forms
</div>
     </div>
     <div className='header-search my-2'>
<IconButton>
    <SearchIcon/>
</IconButton>   
    <input className='input' type="text" name='search'  placeholder='Search'/>
     </div>
     <div className='header-right'>
<IconButton>
    <AppIcon/>
</IconButton>
<IconButton>
    <Avatar/>
</IconButton>
     </div>
      
    </div>
  )
}
