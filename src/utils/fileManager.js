const fs = require("fs");
const path = require("path");

const deleteFile = async (filePath) => {
  if (!filePath) return;

  const fullPath = path.join(__dirname, "..", "uploads", filePath);

  try {
    if (fs.existsSync(fullPath)) {
      await fs.promises.unlink(fullPath);
    }
  } catch (error) {
    console.error(`Failed to delete file: ${fullPath}`, error);
    throw new Error("Failed to delete the file.");
  }
};

module.exports = {
  deleteFile,
};
