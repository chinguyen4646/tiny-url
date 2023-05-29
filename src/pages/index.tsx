import React from "react";
import { Box } from "@mui/material";
import ShortenUrlForm from "../components/ShortenUrlForm";
import GetOriginalUrlForm from "../components/GetOriginalUrlForm";

const Home = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <ShortenUrlForm />
      <GetOriginalUrlForm />
    </Box>
  );
};

export default Home;
