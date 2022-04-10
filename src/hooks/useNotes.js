import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../components/Firebase/Firebase.config";

const useNotes = () =>{
    const [notesData, setNotesData] = useState([]);
    const [buffer, setBuffer] = useState(false)
    useEffect(()=>{

        const getDocsRef = collection(db, "notes");
        const realtimeNotes = onSnapshot(getDocsRef, snapshot =>{
            const notesFromDb = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
            const currentUserNotes = notesFromDb.filter(notes => notes?.author?.uid === auth?.currentUser?.uid);
            setNotesData(currentUserNotes);
            setBuffer(true);
        })
        return () =>{
            realtimeNotes();
        }
    }, [])
    return {notesData, buffer, setNotesData}
}
export default useNotes;