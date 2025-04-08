"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";

const Hero = () => {
  return (
    <Box
      sx={{
        backgroundColor: "transparent",

        display: "flex",
        marginTop: "10px",
        textAlign: "center",
        color: "white",
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
          GalleryGo
        </Typography>

        <Typography variant="h6" color="grey.400" mb={4}>
          Organize Your Memories Effortlessly with GalleryGo Add and delete
          images instantly in a sleek, responsive gallery experience.
        </Typography>
      </Container>
    </Box>
  );
};

export default Hero;
