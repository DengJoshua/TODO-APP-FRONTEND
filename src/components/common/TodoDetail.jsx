import React from "react";
import { Box } from "@mui/system";
import { Toolbar, Drawer, Divider } from "@mui/material";

function TodoDetail({ todo }) {
  return (
    <div className="hidden lg:contents">
      <Drawer
        variant="permanent"
        sx={{
          width: "35%",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: "35%",
            boxSizing: "border-box"
          },
          fontSize: "10px"
        }}
        anchor="right"
      >
        <Box>
          <span>{todo ? todo.title : "click a todo to view details"}</span>
          <Divider />
        </Box>
      </Drawer>
    </div>
  );
}

export default TodoDetail;
