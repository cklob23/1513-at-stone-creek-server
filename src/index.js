import express from "express";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post("/sendEmail", async (req, res) => {
  const { email, html, subject } = req.body;
  console.log(email, subject);

  if (!email || !html || !subject) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await sendEmail(email, html, subject);
    res.json({ success: true });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
