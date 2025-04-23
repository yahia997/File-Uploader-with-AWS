import File from "./File";
export default function Files({data}) {
  
  

  return (
    <>
      <h3>Uploaded Files</h3>
      <div className="files">
        {
          data.map((obj, i) => <File key={i} obj={obj}/>)
        }
      </div>
    </>
  );
}