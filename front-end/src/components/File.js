export default function File({obj}) {
  const {name, size, url} = obj;

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