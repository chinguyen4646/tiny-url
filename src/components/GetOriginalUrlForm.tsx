import React, { useState, FormEvent } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { isValidShortUrl } from "@/helpers/urlHelpers";

const GetOriginalUrlForm = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrlError, setShortUrlError] = useState("");

  const handleGetOriginalUrlSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const code = shortUrl.substring(window.location.origin.length + 1);

    try {
      if (!isValidShortUrl(shortUrl)) {
        setShortUrlError("Input must be a valid short URL");
        return;
      }

      const res = await axios.get(`/api/getOriginalUrl?code=${code}`);

      setOriginalUrl(res.data);
      setShortUrlError("");
    } catch (error: any) {
      setShortUrlError(`Error: ${error.response.data.error}`);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <form onSubmit={handleGetOriginalUrlSubmit} style={{ width: "30%", marginTop: "15px" }}>
      <TextField
        type="text"
        value={shortUrl}
        onChange={(e) => {
          setShortUrl(e.target.value);

          if (e.target.value === "" && shortUrlError === "Input must be a valid short URL") {
            setShortUrlError("");
          }
        }}
        label="Input short URL here"
        placeholder="e.g. http://localhost:3000/JU4MjKdk"
        variant="outlined"
        fullWidth
        error={!!shortUrlError}
        helperText={shortUrlError}
        onKeyPress={handleKeyPress}
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        style={{ marginTop: "8px" }}
      >
        Get Original URL
      </Button>
      {originalUrl && (
        <Typography mt={2}>
          The original URL: <a href={originalUrl}>{originalUrl}</a>
        </Typography>
      )}
    </form>
  );
};

export default GetOriginalUrlForm;
