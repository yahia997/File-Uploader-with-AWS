import { useState} from 'react';

export default function Form() {
  const [content, setContent] = useState("Choose a file");

  function handleChange(e) {
    let name = e.target.files[0].name;
    let size = e.target.files[0].size/1e6;
    setContent(`${name} (${size} MB)`);

    console.log(e.target.files);
  }
  
  async function handleSubmit(e) {
    e.preventDefault();

    // just for testing
    var res = fetch('http://localhost:8000/hello');
    res = await res;
    res = await res.json();
    console.log(res);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">{content}</label>
          <input type="file" id="file" onChange={handleChange}/>
        </div>
        <button type="submit">Upload</button>
      </form>
    </>
  );
}