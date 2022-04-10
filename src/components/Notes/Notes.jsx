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
import { addDoc, collection, Timestamp } from "firebase/firestore";
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
  const { notesData, buffer, setNotesData } = useNotes();
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [notesTitle, setNotesTitle] = useState("");
  const [notes, setNotes] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    }).then((res) => {
      toast.success("Notes Added Successfully.");
      handleClose();
      setLoading(false);
      const data = [
        ...notesData,
        {
          notesTitle,
          notes,
          author: { name: user.displayName, uid: user.uid },
          createdAt: Timestamp.now().toDate(),
          id: v4(),
        },
      ];
    });
  };

  console.log(notesData);
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
          <DialogTitle>Add Note</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add additional notes you need to fil up all the field for move
              forward.
            </DialogContentText>

            <TextField
              id="demo-helper-text-misaligned-no-helper"
              label="Name"
              style={{ margin: "2rem 0rem" }}
              fullWidth
              onChange={(e) => setNotesTitle(e.target.value)}
            />
            <TextField
              id="demo-helper-text-misaligned-no-helper"
              label="Description"
              fullWidth
              onChange={(e) => setNotes(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={handleAddNote}
              className={`${loading && "disabled"}`}
            >
              {!loading ? "Add Note" : "Saving Data..."}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {buffer ? (
        <NotesContainer>
          <CreateNote handleClickOpen={handleClickOpen} />
          {notesData?.map((note) => (
            <Note key={note.id} {...note} />
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
    <Button variant="text" onClick={handleClickOpen} className="create-notes">
      +
    </Button>
  );
};

export default Notes;
