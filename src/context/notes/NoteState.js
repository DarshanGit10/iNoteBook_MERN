import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000/";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  //   get All Notes
  const getAllNotes = async () => {
    // API Call
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    //    console.log(json)
    setNotes(json);
  };

  //   Add Notes
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // delete Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}api/notes//deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')      },
    });
    await response.json();
    // console.log(json)
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    // console.log("Deleting the note" + id)
    setNotes(newNotes);
  };

  // Edit Note or Update
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')      },
      body: JSON.stringify({ title, description, tag }),
    });
    await response.json();
    //    console.log(json)
    // logic to edit in Client
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const ele = newNotes[index];
      if (ele._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    // console.log(notes)
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
