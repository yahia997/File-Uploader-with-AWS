app.post('upload', async (req, res) => {
  try {
    const { fileName, fileType } = req.body;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${fileName}`,
      ContentType: fileType,
    });
    
    const uploadURL = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    res.json({ uploadURL });
  } catch (error) {
    console.error('Error generating upload URL:', error);
    res.status(500).json({ error: 'Failed to generate upload URL' });
  }
});