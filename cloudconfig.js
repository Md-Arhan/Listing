const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

if(process.env.NODE_ENV !== "production"){
  require('dotenv').config()
}

console.log(process.env.CLOUD_API_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    allowed_formats: ['jpg', 'png', 'jpeg'], // Use snake_case
  },
});

module.exports = {
  cloudinary,
  storage,
};
