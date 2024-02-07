import React from 'react'
import '../css/submit.css'
import { Typography } from '@material-ui/core'

export default function Submitted() {
  return (
    <div className='submit'>
         <div className="user_form_submit">
            <div className="user_form_section">
       <div className="user_title_section">
                    <Typography style={{fontSize:"26px"}} >Submitted</Typography> <br />
                    <Typography style={{fontSize:"15px"}} >Your response has been recorded.</Typography> <br />
                    <a href="/response">Submit another response</a>

                </div>
                </div>
                </div>
    </div>
  )
}
