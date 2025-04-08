"use client";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";
const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250, bgcolor: "#000", height: "100%", color: "#fff" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          GalleryGo
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />

      <Box sx={{ position: "absolute", bottom: 16, left: 16 }}>
        <IconButton color="inherit" aria-label="github">
          <GitHubIcon />
        </IconButton>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#fff",
            marginLeft: "10px",
            color: "#fff",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          Get a Demo
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Mobile: Hamburger */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
              ml: { xs: 1, md: 0 },
            }}
          >
            GalleryGo
          </Typography>

          {/* Right icons + button (md+) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Link href="/">
              <IconButton size="large" color="inherit" aria-label="github">
                <GitHubIcon />
              </IconButton>
            </Link>

            <Button
              variant="outlined"
              sx={{
                borderColor: "#fff",
                color: "#fff",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Get a Demo
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { backgroundColor: "#000" } }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
