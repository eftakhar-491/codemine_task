"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import UploadModal from "../modals/UploadModal";

const actions = [{ icon: <FileUploadIcon />, name: "Upload Image" }];

export default function AddButton() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      {open && <UploadModal open={open} onClose={() => setOpen(false)} />}
      <Box
        sx={{
          height: 320,
          transform: "translateZ(0px)",
          flexGrow: 1,
          position: "absolute",
          zIndex: 30,
          bottom: 90,
          right: 16,
        }}
      >
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => setOpen(true)}
            />
          ))}
        </SpeedDial>
      </Box>
    </>
  );
}
