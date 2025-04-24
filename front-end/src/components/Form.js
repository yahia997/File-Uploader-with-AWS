import { useState} from 'react';

export default function Form({setUploading, uploading, path}) {
  const [file, setFile] = useState(null);
  const [fileSize, setFileSize] = useState(0);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");

  function handleChange(e) {
    let name = e.target.files[0].name;
    let size = e.target.files[0].size;
    let type = e.target.files[0].type;
    setFileSize(size);
    setFileName(name);
    setFileType(type);
    setFile(e.target.files[0]);

    console.log(e.target.files);
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    let s = new Set(["application/pdf", "image/jpeg", "image/jpg", "image/png", "text/plain"]);
    
    if(s.has(fileType)) {

      const obj = {
        fileName: fileName,
        fileType: fileType
      }
      
      // To get link for upload
      var res = await fetch(`/api/generate-upload-url`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
          });
          
          if (!res.ok) {
              throw new Error('Failed to get upload URL');
            }
            
            const { uploadURL } = await res.json();

            // Step 2: Upload directly to S3 using the presigned URL
            const uploadResponse = await fetch(uploadURL, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                  },
                });
                
                if (!uploadResponse.ok) {
                    throw new Error('Upload failed');
                  }
                  
                  console.log("Successfully uploaded !!!");
                  setUploading(!uploading);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">{fileName} ({fileSize/1e6} MB)</label>
          <input type="file" id="file" onChange={handleChange}/>
        </div>
        <button type="submit">Upload</button>
      </form>
    </>
  );
}