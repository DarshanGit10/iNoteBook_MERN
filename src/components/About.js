import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
  const a = useContext(noteContext)

useEffect(() => {
  a.update();
}, [a])
  
  return (
    <div>About Page: {a.note.name} is in class {a.note.class}</div>
  )
}

export default About