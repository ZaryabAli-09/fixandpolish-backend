import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import sharp from "sharp";

// Finding absolute path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function removeBg(req, res, next) {
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
          fs.unlinkSync(filePath);
          fs.unlinkSync(outputPath);
        }
      });
    });
  } catch (error) {
    // when we catch error the file will be remain in public folder   .... bug
    return next(error);
  }
}

// bug to solve when we give resize image it return error and also gives correct output and files are not deleted
async function resizeImg(req, res, next) {
  try {
    let { width, height } = req.body;
    if (!req.file || !width || !height) {
      return res.status(400).json({
        message: "Parameters missing",
      });
    }
    // converting strings to integers
    width = parseInt(width);
    height = parseInt(height);

    const filePath = path.resolve(__dirname, "../public/", req.file.filename);
    const outputFilePath = path.resolve(
      __dirname,
      "../public/",
      `quickResize_${req.file.filename}.png`
    );

    // resize the image
    await sharp(filePath)
      .resize(width, height, { fit: "cover", position: "center" })
      .toFormat("jpeg", { quality: 90 }) // Set quality level (for lossy formats like JPEG)
      .toFile(outputFilePath);

    res.download(outputFilePath, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error downloading resized image" });
      }
      // Optionally delete the original and resized images after download
      fs.unlinkSync(filePath);
      fs.unlinkSync(outputFilePath);
    });
  } catch (error) {
    return next(error);
  }
}

export { removeBg, resizeImg };
