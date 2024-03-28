import { useEffect, useState } from 'react'
import beautify from "js-beautify"

import './App.css'

function App() {
  const [value, setValue] = useState("")

  useEffect(() => {
    console.log(value)
  }, [value])

  const sanitizeSvg = (svg: string) => {
    const sanitized = svg.replace(/xmlns:xlink="http:\/\/www\.w3\.org\/1999\/xlink"/g, '')
    .replace(/class="[^"]*"/, '')
    .replace(/width="[^"]*"/, '')
    .replace(/height="[^"]*"/, '');
    return sanitized;
  }

  return (
  <div className="grid grid-cols-3 min-h-screen">
    <textarea
      onChange={(e) => setValue(e.target.value)}
     value={value}
   />
      <textarea value={beautify.html(sanitizeSvg(value), {indent_size: 4})}/>
      <div dangerouslySetInnerHTML={{__html: sanitizeSvg(value)}} />
  </div>
  )
}

export default App
