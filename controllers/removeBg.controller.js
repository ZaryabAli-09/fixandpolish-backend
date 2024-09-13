import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Finding absolute path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the public directory exists
const publicDir = path.resolve(__dirname, "public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

async function removeBg(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Error: No file uploaded" });
    }

    // Define file paths for input and output
    const filePath = path.resolve(publicDir, req.file.filename);
    const outputPath = path.resolve(
      publicDir,
      `quickbgremove_${req.file.filename}.png`
    );

    // Check if the file exists before processing
    if (!fs.existsSync(filePath)) {
      console.error("Uploaded file not found:", filePath);
      return res.status(404).json({ message: "Uploaded file not found" });
    }

    // Command to run the Python script
    const command = `python "remove_background.py" "${filePath}" "${outputPath}"`;

    // Execute the Python command
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Error executing Python script:", error);
        return res.status(500).send("Error occurred while processing image");
      }

      // Check if the output file exists before sending it back
      if (!fs.existsSync(outputPath)) {
        console.error("Output file not found:", outputPath);
        return res.status(404).send("Output file not found");
      }

      // Send the processed file as a response
      res.sendFile(outputPath, (err) => {
        if (err) {
          console.error("Error sending image back:", err);
          res.status(500).send("Error occurred while sending image back");
        } else {
          // Optionally delete the file after sending
          fs.unlinkSync(filePath);
          fs.unlinkSync(outputPath);
        }
      });
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    res.status(500).send("Unexpected error occurred while processing image");
  }
}

export { removeBg };
