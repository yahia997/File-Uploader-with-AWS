import { useEffect, useState } from "react";

export default function File({obj}) {
  let {name, size} = obj;
  const [url, setUrl] = useState();

  useEffect(() => {
    (async() => {
      let res = await fetch(`/api/generate-download-url/${name}`);
      if(res.ok) {
        let u = await res.json();
        setUrl(u['downloadURL']);
      }
    })();
  }, [name]);

  return (
    <div className='file'>
      <div>
        <p>{name}</p>
        <p>{size} MB</p>
      </div>
      <a href={url} download='true'>Download</a>
    </div>
  );
}