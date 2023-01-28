import React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InboxIcon from "@mui/icons-material/MoveToInbox";

const classes = {
  page: {
    background: "#f9f9f9",
    width: "100%"
  },
  root: {
    display: "flex"
  },
  active: {
    background: "#f4f4f4"
  }
};

function Sidebar({ menuItems1, menuItems2 }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="hidden md:contents">
      <Drawer
        variant="permanent"
        sx={{
          width: "20%",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: "20%",
            boxSizing: "border-box"
          }
        }}
      >
        <Toolbar />
        <Toolbar>
          <span>BEREADY</span>
        </Toolbar>
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuItems1.map(item => (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={location.pathname == item.path ? classes.active : null}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["Lists", "Tags", "Filters"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {menuItems2.map(item => (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={location.pathname == item.path ? classes.active : null}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}

export default Sidebar;
