import React from "react";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { v4 as uuidv4 } from "uuid";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { createClient } from "@/lib/supabase/supabase-client";
interface ImageUploadModalProps {
  open: boolean;
  onClose: () => void;
}

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%", // for small screens
    sm: 400,
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
  backgroundColor: "black",
  border: "2px solid #fff",
};

const UploadModal: React.FC<ImageUploadModalProps> = ({
  open,
  onClose,
}: ImageUploadModalProps) => {
  const router = useRouter();
  const supabase = createClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = React.useState(false);
  // const handleUpload = async (formData: FormData) => {
  //   const file = formData.get("image") as File;
  //   console.log(file);
  //   if (!file) return;

  //   const { data, error } = await supabase.storage
  //     .from("images")
  //     .upload(`image-${uuidv4()}`, file);
  //   console.log(data);
  //   if (!error) {
  //     router.refresh();
  //     if (inputRef.current) inputRef.current.value = "";
  //   }
  // };
  const handleUpload = async (formData: FormData) => {
    setLoading(true);
    const files = formData.getAll("image") as File[]; // Get all files

    if (!files || files.length === 0) return;

    const uploadPromises = files.map(async (file) => {
      // Generate unique filename for each file
      const uniqueName = `${file.name}-${uuidv4()}`;

      const { data, error } = await supabase.storage
        .from("images")
        .upload(uniqueName, file);

      return { data, error };
    });

    try {
      const results = await Promise.all(uploadPromises);
      const hasErrors = results.some((result) => result.error);

      if (!hasErrors) {
        router.refresh();
        if (inputRef.current) inputRef.current.value = "";
      }
      onClose();
      setLoading(false);
    } catch (error) {
      console.error("Upload failed:", error);
      setLoading(false);
    }
  };
  return (
    <Modal open={true} onClose={onClose} aria-labelledby="image-upload-modal">
      <Box sx={modalStyle}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" component="h2">
            Upload Images
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>
        <form action={handleUpload}>
          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadFileIcon />}
            fullWidth
          >
            Select Images
            <input
              ref={inputRef}
              name="image"
              type="file"
              hidden
              accept="image/*"
              multiple
            />
          </Button>

          {loading ? (
            <Button loading variant="outlined">
              Submit
            </Button>
          ) : (
            <Button
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "white",
                color: "black",
                "&:hover": {
                  backgroundColor: "#f0f0f0", // light gray hover
                },
              }}
            >
              Upload
            </Button>
          )}
        </form>
      </Box>
    </Modal>
  );
};

export default UploadModal;
