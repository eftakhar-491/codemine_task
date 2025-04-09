import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import { createClient } from "@/lib/supabase/supabase-server";
import DeleteImage from "./DeleteImage";

// Define the type for the file data returned by Supabase
interface FileData {
  id: string;
  name: string;
  [key: string]: any; // Add additional fields if needed
}

// Define the type for the public URL data
interface PublicUrlData {
  publicUrl: string;
}

// Define the type for the error object
interface SupabaseError {
  message: string;
}

// Define the type for the component props (if any)
interface GalleryCardProps {}

const GalleryCard: React.FC<GalleryCardProps> = async () => {
  const supabase = await createClient();
  const {
    data,
    error,
  }: { data: FileData[] | null; error: SupabaseError | null } =
    await supabase.storage.from("images").list();

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  if (!data || data.length === 0) {
    return (
      <Typography color="text.secondary" align="center">
        No images yet. Click “Add Images” to get started.
      </Typography>
    );
  }

  return (
    <ImageList sx={{ width: "100%" }} cols={3} rowHeight={300} gap={18}>
      {data
        ?.filter((file) => file.name !== ".emptyFolderPlaceholder")
        ?.map(async (file) => {
          const { data: urlData }: { data: PublicUrlData | null } =
            await supabase.storage.from("images").getPublicUrl(file.name);

          return (
            <ImageListItem key={file.id}>
              <Box
                component="img"
                src={urlData?.publicUrl || ""}
                alt={file.name}
                loading="lazy"
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
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  color: "white",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                }}
              >
                {/* <DeleteIcon fontSize="small" /> */}
                <DeleteImage name={file.name} />
              </IconButton>
            </ImageListItem>
          );
        })}
    </ImageList>
  );
};

export default GalleryCard;
