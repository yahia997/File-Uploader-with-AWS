import express from 'express';
import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

// Connect ot S3
// const s3Client = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// just for testing
app.get('/hello', (req, res) => {
  res.json('{"message": "wadddddyyyy"}');
});

app.listen(port ,() => {
  console.log(`App is listening on port ${port}...`);
});