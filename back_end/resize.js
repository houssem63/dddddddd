const fs = require('fs');
const sharp = require('sharp');

// Function to resize an image and delete the original
async function resizeAndDeleteOriginal(inputPath, outputPath, width, height) {
  try {
    // Resize the image
    await sharp(inputPath)
      .resize({
        width: width,
        height: height,
        fit: 'cover', // Resize strategy
        withoutEnlargement: true // Prevent enlarging smaller images
      })
      .toFile(outputPath);

    // Delete the original image
    fs.unlinkSync(inputPath);

    console.log('Image resized and original deleted successfully');
  } catch (error) {
    console.error('Error resizing image:', error);
  }
}

// Example usage
const inputPath = 'path/to/original/image.jpg';
const outputPath = 'path/to/resized/image.jpg';
const targetWidth = 300; // Desired width
const targetHeight = 200; // Desired height

resizeAndDeleteOriginal(inputPath, outputPath, targetWidth, targetHeight);
module.exports={resizeAndDeleteOriginal}