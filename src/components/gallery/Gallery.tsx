import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ImageList,
  ImageListItem,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import Filter from "./Filter";
import DeleteModal from "../modals/DeleteModal";
import AddButton from "../buttons/AddButton";

import UploadModal from "../modals/UploadModal";
import GalleryCard from "./GalleryCard";

interface ImageItem {
  id: string;
  url: string;
}

const Gallery = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* <Filter /> */}

      <AddButton />
      <GalleryCard />
      {/* pagination */}
      <Stack spacing={2} sx={{ mt: 4 }} alignItems="center">
        <Pagination
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
            },
            "& .Mui-selected": {
              backgroundColor: "white",
              color: "black",
            },
          }}
          count={10}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
};

export default Gallery;
