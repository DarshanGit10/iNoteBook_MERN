
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = 'http://localhost:5000/'
    const initialNotes = [

    ]
    const [notes, setNotes] = useState(initialNotes)

//   get All Notes
const getAllNotes = async () => {
    // API Call
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyN2Y1OTcwMDkyMjAzM2I5YWZjZTZiIn0sImlhdCI6MTY4MDM0MDQwNn0.jqBDaD9ptZiYpNmrHHbpX-nM61HQ8xTtEBCMMTO0CO0"
        },
        
    });
    const json = await response.json();
   console.log(json)
   setNotes(json)
}


    //   Add Notes
    const addNote = async (title, description, tag) => {
        // API Call
        const response = await fetch(`${host}api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyNWIzNzVkNzkwMzgxMmVlYTk2MzI5In0sImlhdCI6MTY4MDM1NTE5Nn0.WR2nUAgw48kyeTKDseyDuWS4bJqAAOj43NhT3e-UzJA"
            },
            body: JSON.stringify({ title, description, tag }),
        });
        //   const json = response.json()
        console.log("Adding a new Note")
        const note = {
            "_id": "6427f6111e070922033b9afce72",
            "user": "6427f59700922033b9afce6b",
            "title": title,
            "tag": tag,
            "description": description,
            "date": "2023-04-01T09:15:10.878Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }

    // delete Note
    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        console.log("Deleting the note" + id)
        setNotes(newNotes)
    }

    // Edit Note
    const editNote = async (id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyNWIzNzVkNzkwMzgxMmVlYTk2MzI5In0sImlhdCI6MTY4MDM1NTE5Nn0.WR2nUAgw48kyeTKDseyDuWS4bJqAAOj43NhT3e-UzJA"
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = response.json()
        // logic to edit in Client
        for (let index = 0; index < notes.length; index++) {
            if (notes[index]._id === id) {
                notes[index].title = title;
                notes[index].description = description;
                notes[index].tag = tag;
            }
        }
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;