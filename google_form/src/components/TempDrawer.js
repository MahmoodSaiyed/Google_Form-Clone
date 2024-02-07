import React, { useState } from "react";
import '../css/drawer.css'
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ListItemText } from "@mui/material";
// import Divider from "@material-ui/core/Divider";
import formimg from "../images/google-forms.png";
import {FiSettings} from  "react-icons/fi"
import {BsQuestionCircle} from  "react-icons/bs"
import drive from '../images/png-transparent-google-logo-drive-new-google-new-logos-icon.png'


export default function TempDrawer() {
  const [state, setstate] = useState({ left: false });
  const toggledrawer = (anchor, open) => (e) => {
    setstate({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div style={{ width: "250px" }} role="presentation">
      <List>
        <ListItem>
          <ListItemText style={{ fontSize: "48px", marginLeft: "5px" }}>
            <span style={{ color: "blue", fontWeight: "700", fontSize: "22px" }}>G</span>
            <span style={{ color: "red", fontWeight: "500", fontSize: "22px" }}>O</span>
            <span style={{ color: "yellow", fontWeight: "500", fontSize: "22px" }} >O</span>
            <span style={{ color: "blue", fontWeight: "500", fontSize: "22px" }}>G</span>
            <span style={{ color: "green", fontWeight: "500", fontSize: "22px" }} >L</span>
            <span style={{ color: "blue", fontWeight: "500", fontSize: "22px" }} >E</span>
            <span style={{ color: "#5f6368", fontWeight: "700", fontSize: "22px" }} >   Docs</span>
          </ListItemText>
        </ListItem>
      </List>
      <hr />
      <List style={{ marginLeft: "08px", marginRight: "08px", marginTop: "15px" }}>
        <ListItem className="list-item">
          <img src={formimg} alt="" height={"20px"} width={"28px"} />
          <div style={{ marginLeft: "20px", fontSize: "14px", fontWeight: "500", color: "grey" }}>Docs</div>
       </ListItem>

       <ListItem className="list-item">
          <img src={formimg} alt="" height={"20px"} width={"28px"} />
          <div style={{ marginLeft: "20px", fontSize: "14px", fontWeight: "500", color: "grey" }}>Sheets</div>
       </ListItem>

       <ListItem className="list-item">
          <img src={formimg} alt="" height={"20px"} width={"28px"} />
          <div style={{ marginLeft: "20px", fontSize: "14px", fontWeight: "500", color: "grey" }}>Slides</div>
       </ListItem>

       <ListItem className="list-item">
          <img src={formimg} alt="" height={"20px"} width={"28px"} />
          <div style={{ marginLeft: "20px", fontSize: "14px", fontWeight: "500", color: "grey" }}>Forms</div>
       </ListItem>

      </List>
      <hr />
      <List style={{ marginLeft: "08px", marginRight: "08px", marginTop: "15px" }}>
        <ListItem className="list-item">
            <FiSettings/>
            <div style={{ marginLeft: "20px", fontSize: "14px", fontWeight: "500", color: "grey" }}>Settings</div>
        </ListItem>
        <ListItem className="list-item">
            <BsQuestionCircle/>
        <div style={{ marginLeft: "20px", fontSize: "14px", fontWeight: "500", color: "grey" }}>Help & Feedback</div>
        </ListItem>
      </List>
      <hr />
      <List style={{ marginLeft: "08px", marginRight: "08px", marginTop: "15px" }}>
        <ListItem className="list-items">
        <img src={drive} height={"20px"} width={"20px"} alt="" />
        <div  style={{ marginLeft: "20px", fontSize: "14px", fontWeight: "500", color: "grey" }}>Drive</div>
        </ListItem>
      </List>
      <hr />
    </div>
  );
  return (
    <div>
      <React.Fragment>
        <IconButton onClick={toggledrawer("left", true)}>
          <MenuIcon />
        </IconButton>
        <Drawer
          open={state["left"]}
          onClose={toggledrawer("left", false)}
          anchor={"left"}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
