"use client";

import { useState } from "react";
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

interface ImageItem {
  id: string;
  url: string;
}

const Gallery = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selected, setSelected] = useState<ImageItem | null>(null);

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImgs: ImageItem[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImgs]);
  };

  const handleDelete = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        spacing={2}
      >
        <Typography variant="h4" fontWeight="bold">
          GalleryGo
        </Typography>
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          component="label"
        >
          Add Images
          <input
            hidden
            type="file"
            accept="image/*"
            multiple
            onChange={handleAdd}
          />
        </Button>
      </Stack>

      {images.length === 0 ? (
        <Typography color="text.secondary" align="center">
          No images yet. Click “Add Images” to get started.
        </Typography>
      ) : (
        <ImageList
          sx={{
            width: "100%",
            // you can constrain maxHeight if you like:
            // maxHeight: 600,
          }}
          cols={3}
          rowHeight={300}
          gap={18}
        >
          {images.map((img) => (
            <ImageListItem key={img.id}>
              <Box
                component="img"
                src={img.url}
                alt="gallery"
                loading="lazy"
                onClick={() => setSelected(img)}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  cursor: "pointer",
                  borderRadius: 1,
                }}
              />
              <IconButton
                size="small"
                onClick={() => handleDelete(img.id)}
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  color: "white",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </ImageListItem>
          ))}
        </ImageList>
      )}

      {/* Modal */}
      <Dialog
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        // maxWidth="md"
        // fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            justifyContent: "space-between",
          }}
        >
          {selected ? "Image Preview" : ""}

          <IconButton
            onClick={() => setSelected(null)}
            sx={{
              padding: "0px importent", // optional: remove extra padding
            }}
          >
            <CancelIcon
              sx={{
                padding: "0px importent", // optional: remove extra padding
              }}
              fontSize="small"
            />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center", p: 2 }}>
          {selected && (
            <Box
              component="img"
              src={selected.url}
              alt="full"
              sx={{
                maxWidth: "100%",
                maxHeight: "70vh",
                borderRadius: 1,
              }}
            />
          )}
        </DialogContent>
      </Dialog>

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
