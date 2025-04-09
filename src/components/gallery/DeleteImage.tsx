"use client";
import React from "react";
import DeleteModal from "../modals/DeleteModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { createClient } from "@/lib/supabase/supabase-client";
import { useRouter } from "next/navigation";

const DeleteImage = ({ name }: { name: any }) => {
  const supabase = createClient();
  const router = useRouter();

  const [delOpen, setDelOpen] = React.useState(false);

  const handleDelete = async () => {
    try {
      const { error } = await supabase.storage.from("images").remove([name]);

      if (error) throw error;

      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete image");
    }
  };
  return (
    <>
      <DeleteModal
        delOpen={delOpen}
        setDelOpen={setDelOpen}
        handleDelete={handleDelete}
      />
      <DeleteIcon onClick={() => setDelOpen(true)} fontSize="small" />
    </>
  );
};

export default DeleteImage;
