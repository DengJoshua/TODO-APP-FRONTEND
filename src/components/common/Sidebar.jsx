import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { TagIcon, PlusIcon } from "@heroicons/react/24/outline";

const classes = {
  page: {
    background: "#f9f9f9",
    width: "100%"
  },
  root: {
    display: "flex"
  },
  active: {
    background: "#c2d5f9"
  },
  sider_bar_icon: {
    height: "10px",
    color: "red"
  }
};

function Sidebar({ menuItems1, setOpenTagModal, tags, tagsLoading }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropDown, setOpenDropDown] = useState(true);

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
          },
          fontSize: "10px"
        }}
      >
        <Toolbar />
        <Toolbar>
          <span>BEREADY</span>
        </Toolbar>
        <Box sx={{ overflow: "auto", fontSize: "10px" }}>
          <List sx={{ fontSize: "10px" }}>
            {menuItems1.map(item => (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={
                  location.pathname.substring(
                    location.pathname.lastIndexOf("/") + 1
                  ) === item.path
                    ? classes.active
                    : null
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItemButton
              className="flex w-full"
              onClick={() => setOpenDropDown(!openDropDown)}
            >
              {openDropDown ? <ExpandLess /> : <ExpandMore />}
              <span className="pl-2 text-sm">Tags</span>
              <PlusIcon
                className="w-5 h-5 ml-auto"
                onClick={() => setOpenTagModal(true)}
              />
            </ListItemButton>
            <Collapse in={openDropDown} unmountOnExit>
              <ul>
                {tagsLoading ? (
                  <h1>loading tags</h1>
                ) : (
                  tags.map(tag => (
                    <li
                      key={tags.indexOf(tag)}
                      onClick={() => navigate(tag.toLowerCase())}
                      className="cursor-pointer flex pl-8 font items-center py-2 text-sm"
                      style={
                        location.pathname.substring(
                          location.pathname.lastIndexOf("/") + 1
                        ) === tag
                          ? classes.active
                          : null
                      }
                    >
                      <TagIcon className="w-5 h-5 mr-2" />
                      <span>{tag}</span>
                    </li>
                  ))
                )}
              </ul>
            </Collapse>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}

export default Sidebar;
