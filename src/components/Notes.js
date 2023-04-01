import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
const Notes = () => {
    const context = useContext(noteContext)
    const { notes, getAllNotes} = context
    useEffect(() => {
        getAllNotes();
    }, [])

    return (
        <>
        <AddNote />
        <div className="container row my-2">
            <h2>Your NOtes</h2>
            {
                notes.map((note) => {
                    return <Noteitem key={note._id} note={note} />
                })
            }
        </div>
        </>
    )
}

export default Notes