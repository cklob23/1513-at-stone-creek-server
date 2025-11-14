import express from "express";
import cors from "cors";
//import { guestTemplate, hostTemplate } from "./templates/resultTemplate.js";
import { sendEmail } from "./utils/sendEmail.js";

const app = express();
const PORT = 4000;

//app.use(cors());

app.use(
  cors({
    origin: "https://one513atstonecreek.onrender.com",
    methods: ["POST", "GET"],
  })
);
app.use(express.json());

/**
 * Send inquiries to customer and host
 * Expects email, html, and subject
 */
app.post("/sendEmail", async (req, res) => {
  const { email, html, subject } = req.body;
  console.log(email, html, subject);
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
