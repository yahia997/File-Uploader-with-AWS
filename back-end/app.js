import express from 'express';
import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';


// to load system variables
dotenv.config();

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

// To make the application faster
app.use(compression());

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../front-end/build')));

// for testing ------------------------------------------
app.get('/api/test', (req, res) => {
  res.json('{"message from server": "Hellow I am yahya"}');
});

// Connect ot S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Get all Floders and files ------------------------------------------------------------
app.get('/api/files', async (req, res) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET_NAME,
    });

    const { Contents } = await s3Client.send(command);
    const content = Contents
      .map(item => ({
        name: item.Key,
        size: item.Size/1e6,
        lastModified: item.LastModified
      }));

    res.json(content);
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).json({ error: 'Failed to list files' });
  }
});
// ---------------------------------------------------------------------------------


// upload files -------------------------------------------------------------
app.post('/api/generate-upload-url', async (req, res) => {
  try {
    const { fileName, fileType } = await req.body;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
    });
    
    const uploadURL = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    res.json({ uploadURL });
  } catch (error) {
    console.error('Error generating upload URL:', error);
    res.status(500).json({ error: 'Failed to generate upload URL' });
  }
});
// --------------------------------------------------------------------------------------------------------------------------

// generate download link ----------------------------------------------------------------
app.get('/api/generate-download-url/:fileName', async (req, res) => {
  try {
    const { fileName } = req.params;
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      ResponseContentDisposition: `attachment; filename="${fileName}"`,
    });
    
    const downloadURL = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    res.json({ downloadURL });
  } catch (error) {
    console.error('Error generating download URL:', error);
    res.status(500).json({ error: 'Failed to generate download URL' });
  }
});
// -------------------------------------------------------------------------------------------------

app.listen(port ,() => {
  console.log(`App is listening on port ${port}...`);
});
