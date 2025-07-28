const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/uploadthing-presign", async (req, res) => {
  const { filename, filetype } = req.body;

  try {
    const response = await axios.post(
      "https://uploadthing.com/api/requestUpload",
      {
        files: [
          {
            name: filename,
            type: filetype,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.UPLOADTHING_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Erreur Uploadthing", err);
    res.status(500).json({ error: "Uploadthing API failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Backend listening on port ${PORT}`));
