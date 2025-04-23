import { useEffect, useState } from "react";
import Files from "./components/Files";
import Form from "./components/Form";

function App() {
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async() => {
      const res = await fetch('http://localhost:8000/api/files');
      if(res.ok) {
        const d = await res.json();
        setData(d);
      }
    })();
  }, [uploading]);

  return (
    <>
      <main>
        <h3>Upload Files</h3>
        <Form uploading={uploading} setUploading={setUploading} />
        <Files data={data} />
      </main>
    </>
  );
}

export default App;
