import S3 from "aws-sdk/clients/s3";
require("dotenv").config();
import fs from "fs";

const bucketName = process.env.WEARO_AWS_BUCKET_NAME;
const region = process.env.AWS_WEARO_BUCKET_REGION;
const accessKey = process.env.WEARO_AWS_ACCESS_KEY;
const secretKey = process.env.WEARO_AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
});

export const uploadImage = (file: Express.Multer.File) => {
  const fileStream = fs.createReadStream(file.path);

  return s3
    .upload({
      Bucket: bucketName,
      Body: fileStream,
      Key: file.filename,
    })
    .promise();
};
