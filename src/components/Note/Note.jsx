import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
const Note = ({ notesTitle, notes, createdAt }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <NoteContainer>
        <div className="note-header">
          <h3 className="title">{notesTitle || <Skeleton count={1} />}</h3>
        </div>
        <div className="note-body">
          <p>{notes || <Skeleton count={5} />}</p>
        </div>
        <div className="note-footer">
          <span>
            {/* {(createdAt ? createdAt || createdAt?.toDate().toDateString() : null} */}
          </span>

          <div>
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MoreHorizOutlinedIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Edit</MenuItem>
              <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
          </div>
        </div>
      </NoteContainer>
    </>
  );
};

const NoteContainer = styled.div`
  position: relative;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.08);
  padding: 0.6rem;
  .title {
    padding: 0.4rem 0.6rem;
    background: #f8f8f8;
    font-size: 1.1rem;
  }
  .note-body {
    padding: 1rem 0.3rem;
    font-size: 0.9rem;
    color: #444;
    line-height: 1.6;
    min-height: 180px;
    overflow-y: auto;
  }
  .note-body::-webkit-scrollbar {
    display: none;
  }
  .note-footer {
    border-top: 1px solid #ddd;
    padding: 0.2rem 0.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #555;
    font-size: 0.9rem;
  }
`;

export default Note;
