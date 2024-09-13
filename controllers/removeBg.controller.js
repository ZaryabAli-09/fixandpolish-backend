import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
// import "../public/";

// finding absolute path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function removeBg(req, res) {
  try {
    if (!req.file) {
      return res.status(404).json({
        message: "Error occur while uploading file to server",
      });
    }

    // Define file paths for input and output
    const filePath = path.resolve(__dirname, "../public/", req.file.filename);
    const outputPath = path.resolve(
      __dirname,
      "../public/",
      `quickbgremove_${req.file.filename}.png`
    );

    // Verify the uploaded file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "Uploaded file not found",
      });
    }

    // Command to run the Python script with proper path quoting
    const command = `python "remove_background.py" "${filePath}" "${outputPath}"`;

    // Execute the Python command
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).send("Error occur while processing image");
      }
      // Check if the output file exists before sending it back
      if (!fs.existsSync(outputPath)) {
        return res.status(404).send("Output file not found");
      }
      // Send the processed file as a response
      res.sendFile(outputPath, (err) => {
        if (err) {
          res.status(404).send("Error occur while sending image back to you:");
        } else {
          // Optionally delete the file after sending
          fs.unlinkSync(filePath);
          fs.unlinkSync(outputPath);
        }
      });
    });
  } catch (error) {
    fs.unlinkSync(filePath);
    fs.unlinkSync(outputPath);
    return res
      .status(501)
      .send("Error occur while proccesing image please try again");
  }
}

export { removeBg };
