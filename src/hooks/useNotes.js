import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../components/Firebase/Firebase.config";

const useNotes = () =>{
    const [notesData, setNotesData] = useState([]);
    const [buffer, setBuffer] = useState(false)
    useEffect(()=>{
        const getNotesFromDatabase = async () =>{
            const getDocsRef = collection(db, "notes");
            await getDocs(getDocsRef).then((res)=>{
                const notesFromDb = res.docs.map(doc => ({...doc.data(), id: doc.id}));
                const currentUserNotes = notesFromDb.filter(notes => notes?.author?.uid === auth?.currentUser?.uid);
                setNotesData(currentUserNotes)
                setBuffer(true)
            })
        }
        getNotesFromDatabase();
    }, [])
    return {notesData, buffer, setNotesData}
}
export default useNotes;