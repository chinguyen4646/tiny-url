import React, { useState, FormEvent } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { isValidDomain } from "@/helpers/urlHelpers";

const ShortenUrlForm = () => {
  const [urlToShorten, setUrlToShorten] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [shortenUrlError, setShortenUrlError] = useState("");

  const handleShortenSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (!isValidDomain(urlToShorten)) {
        setShortenUrlError("Input must be a valid URL");
        return;
      }

      const res = await axios.post("/api/createShortUrl", { url: urlToShorten });

      setShortUrl(res.data);
      setShortenUrlError("");
    } catch (error: any) {
      setShortenUrlError(`Error: ${error.response.data.error}`);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <form onSubmit={handleShortenSubmit} style={{ width: "30%" }}>
      <TextField
        type="text"
        value={urlToShorten}
        onChange={(e) => {
          setUrlToShorten(e.target.value);

          if (e.target.value === "" && shortenUrlError === "Input must be a valid URL") {
            setShortenUrlError("");
          }
        }}
        label="Input URL here"
        placeholder="e.g. https://www.google.com/"
        variant="outlined"
        fullWidth
        error={!!shortenUrlError}
        helperText={shortenUrlError}
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
        Shorten URL
      </Button>
      {shortUrl && (
        <Typography mt={2}>
          Your short URL: <a href={shortUrl}>{shortUrl}</a>
        </Typography>
      )}
    </form>
  );
};

export default ShortenUrlForm;
