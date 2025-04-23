import express from 'express';
import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';
import cors from 'cors';

// to load system variables
dotenv.config();

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

// Connect ot S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// just for testing
app.get('/hello', (req, res) => {
  res.json('{"message": "wadddddyyyy"}');
});

// test s3
app.get('/api/files', async (req, res) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET_NAME
      // Prefix: '/'
    });

    const { Contents } = await s3Client.send(command);
    const files = Contents
      .filter(item => item.Size > 0)
      .map(item => ({
        name: item.Key.replace('uploads/', ''),
        size: item.Size,
        lastModified: item.LastModified
      }));

    res.json(files);
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).json({ error: 'Failed to list files' });
  }
});

app.listen(port ,() => {
  console.log(`App is listening on port ${port}...`);
});