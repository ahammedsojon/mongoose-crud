import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';

export const sendImageToClodinary = async (
  fileName: string,
  filePath: string,
) => {
  {
    // Configuration
    cloudinary.config({
      cloud_name: 'dudllxvo7',
      api_key: '864875841668941',
      api_secret: '<your_api_secret>', // Click 'View API Keys' above to copy your API secret
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(filePath, {
        public_id: fileName,
      })
      .catch((error) => {
        console.log(error);
        throw new Error('Faile to upload profile image!');
      });
    console.log(uploadResult);

    // Delete file named 'exampleFile.txt'
    await fs.unlink(filePath, (err) => {
      if (err) {
        console.error('An error occurred: to delete file!', err);
      } else {
        console.log('File deleted successfully!');
      }
    });

    return uploadResult;
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
