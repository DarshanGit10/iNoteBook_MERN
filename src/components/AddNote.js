import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext)
    const { addNote } = context

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const onClickHandle = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="container my-3">
                <h2>Add a note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} placeholder='Title - Min Characters 3' onChange={onChange} required minLength={3} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" value={note.description} placeholder='Description - Min Characters 5' name="description" onChange={onChange} required minLength={5} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" value={note.tag} placeholder='Tag' name="tag" onChange={onChange} />
                    </div>
                    <button type="submit" disabled={note.title.length < 3 || note.description.length < 5} className="btn btn-primary" onClick={onClickHandle} >Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddNote