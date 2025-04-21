import File from "./File";
export default function Files() {
  let arr= [
    {
      "name": "File name for testing",
      "url": "gg",
      "size": 45
    },
    {
      "name": "File name for testing",
      "url": "gg",
      "size": 45
    },
    {
      "name": "File name for testing",
      "url": "gg",
      "size": 45
    },
    {
      "name": "File name for testing",
      "url": "gg",
      "size": 45
    },
  ]
  return (
    <>
      <h3>Uploaded Files</h3>
      <div className="files">
        {
          arr.map((obj, i) => <File key={i} obj={obj}/>)
        }
      </div>
    </>
  );
}