import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../App";
import Note from "../Note/Note";
const Notes = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="section-title">
        <h1>Notes by {user?.displayName}</h1>
        {user && (
          <div>
            <Avatar alt="Remy Sharp" src={user?.photoURL} />

            <span className="cursor-pointer">
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
            />
            <TextField
              id="demo-helper-text-misaligned-no-helper"
              label="Description"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Add Note</Button>
          </DialogActions>
        </Dialog>
      </div>
      <NotesContainer>
        <CreateNote handleClickOpen={handleClickOpen} />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
      </NotesContainer>
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

const CreateNote = ({ handleClickOpen }) => {
  return (
    <Button variant="text" onClick={handleClickOpen} className="create-notes">
      +
    </Button>
  );
};

export default Notes;
