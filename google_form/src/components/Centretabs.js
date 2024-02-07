import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import  Paper  from '@material-ui/core/Paper'
import Tabs from  '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const usestyles = makeStyles({
    root:{
        flexGrow:1
    },
    tab:{
        fontSize:"12px",
        color:"#5f6368",
        textTransform:"capitalize",
        height:10,
        fontWeight:"600",
    },
    tabs:{
        height:10
    }
})
export default function Centertabs() {
    const classes=usestyles()
  return (
  <Paper className={classes.root}>
    <Tabs textColor="primary" indicateColor="primary" centered className={classes.tabs}>
        <Tab label="Question" className={classes.tab}></Tab>
        <Tab label="Response" className={classes.tab}></Tab>

    </Tabs>
  </Paper>
  )
}
