import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Finding absolute path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function removeBg(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const filePath = path.resolve(__dirname, "../public/", req.file.filename);
    const outputPath = path.resolve(
      __dirname,
      "../public/",
      `quickbgremove_${req.file.filename}.png`
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "Uploaded file not found",
      });
    }

    const pythonScriptPath = path.resolve(__dirname, "../remove_background.py");

    const command = `python "${pythonScriptPath}" "${filePath}" "${outputPath}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error.message}`);
        console.error(`stderr: ${stderr}`);
        return res
          .status(500)
          .json({ message: "Error occurred while processing image" });
      }

      console.log(`stdout: ${stdout}`);

      if (!fs.existsSync(outputPath)) {
        console.log("Output file not found");
        return res.status(404).json({ message: "Output file not found" });
      }

      res.sendFile(outputPath, (err) => {
        if (err) {
          res.status(500).json({
            message: "Error occurred while sending image back to you",
          });
        } else {
          // fs.unlinkSync(filePath);
          // fs.unlinkSync(outputPath);
        }
      });
    });
  } catch (error) {
    // when we catch error the file will be remain in public folder   .... bug
    return res.status(500).json({
      message: "Error occurred while processing image, please try again",
    });
  }
}

export { removeBg };
