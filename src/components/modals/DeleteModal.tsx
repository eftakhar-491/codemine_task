import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal({
  setDelOpen,
  delOpen,
  handleDelete,
}: any) {
  const handleClose = () => setDelOpen(false);

  return (
    <Dialog open={delOpen}>
      <DialogTitle>Are you sure you want to delete?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    // <div>
    //   <Modal
    //     aria-labelledby="transition-modal-title"
    //     aria-describedby="transition-modal-description"
    //     open={delOpen}
    //     onClose={handleClose}
    //     closeAfterTransition
    //     slots={{ backdrop: Backdrop }}
    //     slotProps={{
    //       backdrop: {
    //         timeout: 500,
    //       },
    //     }}
    //   >
    //     <Fade in={open}>
    //       <Box sx={style}>
    //         <Typography id="transition-modal-title" variant="h6" component="h2">
    //           Text in a modal
    //         </Typography>
    //         <Typography id="transition-modal-description" sx={{ mt: 2 }}>
    //           Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    //         </Typography>
    //       </Box>
    //     </Fade>
    //   </Modal>
    // </div>
  );
}
