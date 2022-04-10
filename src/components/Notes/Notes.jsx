import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { v4 } from "uuid";
import { AuthContext } from "../../App";
import useNotes from "../../hooks/useNotes";
import { auth, db } from "../Firebase/Firebase.config";
import Note from "../Note/Note";

const Notes = () => {
  const { notesData, buffer } = useNotes();
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [docId, setDocId] = useState(null);
  const navigate = useNavigate();

  const [notesTitle, setNotesTitle] = useState("");
  const [notes, setNotes] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsUpdate(false);
    setNotes("");
    setNotesTitle("");
  };

  const handleLogOut = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  const handleAddNote = async () => {
    if (!notesTitle) return toast.error("Required Notes Title Field");
    if (!notes) return toast.error("Required Notes Field.");
    setLoading(true);
    const collectionRef = collection(db, "notes");
    addDoc(collectionRef, {
      notesTitle,
      notes,
      author: { name: user.displayName, uid: user.uid },
      createdAt: Timestamp.now().toDate(),
      id: v4(),
    }).then(() => {
      toast.success("Notes Added Successfully.");
      handleClose();
      setLoading(false);
    });
  };

  /* delete notes */
  const deleteNotes = async (id) => {
    const deleteDocRef = doc(db, "notes", id);
    await deleteDoc(deleteDocRef)
      .then(() => {
        toast.success("Notes is deleted");
      })
      .catch((err) => toast.error(err.message));
  };

  /* edit notes  */
  const editNotes = (id) => {
    setIsUpdate(true);
    const updateNote = notesData.find((noteData) => noteData.id === id);
    setNotesTitle(updateNote?.notesTitle);
    setNotes(updateNote?.notes);
    setOpen(true);
    setDocId(id);
  };

  const handleUpdateNote = async () => {
    const updateDocRef = doc(db, "notes", docId);
    await updateDoc(updateDocRef, {
      notesTitle,
      notes,
    }).then(() => {
      toast.success("Notes is updated.");
      handleClose();
      setIsUpdate(false);
      setNotes("");
      setNotesTitle("");
    });
  };

  return (
    <>
      <div className="section-title">
        <h1>Notes by {user?.displayName}</h1>
        {user && (
          <div>
            <Avatar alt="Remy Sharp" src={user?.photoURL} />

            <span className="cursor-pointer" onClick={handleLogOut}>
              <LogoutOutlinedIcon /> LogOut
            </span>
          </div>
        )}
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{isUpdate ? "Update Notes" : "Add Notes"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {isUpdate
                ? "Update your notes you need to fil up all the field for move forward"
                : "To add additional notes you need to fil up all the field for move forward"}
            </DialogContentText>

            <TextField
              id="demo-helper-text-misaligned-no-helper"
              label="Name"
              style={{ margin: "2rem 0rem" }}
              fullWidth
              value={notesTitle}
              onChange={(e) => setNotesTitle(e.target.value)}
            />
            <TextField
              id="demo-helper-text-misaligned-no-helper"
              label="Description"
              fullWidth
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={isUpdate ? handleUpdateNote : handleAddNote}
              className={`${loading && "disabled"}`}
            >
              {!loading
                ? `${isUpdate ? "Update Note" : "Add Note"}`
                : `${isUpdate ? "Updating note...." : "Saving note..."}`}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {buffer ? (
        <NotesContainer>
          <CreateNote handleClickOpen={handleClickOpen} />
          {notesData?.map((note) => (
            <Note
              key={note.id}
              editNotes={editNotes}
              deleteNotes={deleteNotes}
              {...note}
            />
          ))}
        </NotesContainer>
      ) : (
        <>
          <SkeletonTheme baseColor="#f8f8f8" highlightColor="#eee">
            <SkeletonContainer>
              {[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20,
              ].map((index) => (
                <Skeleton key={index} height={200} />
              ))}
            </SkeletonContainer>
          </SkeletonTheme>
        </>
      )}
    </>
  );
};
const NotesContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
  .create-notes {
    font-size: 4rem;
    display: grid;
    place-items: center;
    border: 1px dashed #444;
    color: #444;
    user-select: none;
    cursor: pointer;
    height: 280px;
    & > .plus {
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      border: 1px dashed #444;
      border-radius: 50%;
    }
  }
`;
const SkeletonContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
`;
const CreateNote = ({ handleClickOpen }) => {
  return (
    <Button
      title="Create Brand New Notes"
      variant="text"
      onClick={handleClickOpen}
      className="create-notes"
    >
      <span className="plus">+</span>
    </Button>
  );
};

export default Notes;
