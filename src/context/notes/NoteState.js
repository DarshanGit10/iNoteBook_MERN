import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) =>{
    const s1 ={
        "name" :"Sam",
        "class" :"5th"
    }
    const [note, setNote] = useState(s1);
    const update = () =>{
        setTimeout(() => {
            setNote({
                "name" :"John",
            "class" :"10th"
        })    
        }, 2000);
    }
    return (
        <NoteContext.Provider value={{note, update}}>
          {props.children}
        </NoteContext.Provider>
      );
}

export default NoteState;