export default function fixNestedName(name) {
  let s = "";
  for(let i = name.length-2; i >= 0; i--) {
    s = name[i] + s;
    if(name[i] === '/') break;
  }
  return s.replace('/', '');
}