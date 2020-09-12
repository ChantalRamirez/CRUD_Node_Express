const AWS = require('aws-sdk');
const fs = require('fs');
const uploadFileToS3 = async (filePathAndName, fileName) => {
  // Subiendo archivos a S3 Amazon Web Services
  // https://stackabuse.com/uploading-files-to-aws-s3-with-node-js
  // Haciendo público contenido del bucket
  // https://havecamerawilltravel.com/photographer/how-allow-public-access-amazon-bucket/
  const { AWS_ACCESS_KEY_ID, AWS_SECRET_KEY, S3_BUCKET_NAME } = process.env;
  const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_KEY
  });
  const fileContent = fs.readFileSync(filePathAndName);
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: fileName, // El nombre del archivo que quieres guardar en S3
    Body: fileContent,
    ACL: 'public-read' // Concede permisos de lectura publica al archivo
  };
  // Subiendo archivos al bucket
  return new Promise((resolve, reject) => {
    s3.upload(params, function(err, data) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log(`File uploaded successfully. ${data.Location}`);
      return resolve(data.Location);
    });
  })
};
module.exports = {
  uploadFileToS3
};
