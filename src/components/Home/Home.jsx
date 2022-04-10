import styled from "@emotion/styled";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import PrintIcon from "@mui/icons-material/Print";
import SaveIcon from "@mui/icons-material/Save";
import ShareIcon from "@mui/icons-material/Share";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Toaster } from "react-hot-toast";
import Notes from "../Notes/Notes";
const Home = () => {
  const actions = [
    { icon: <FileCopyIcon />, name: "Copy" },
    { icon: <SaveIcon />, name: "Save" },
    { icon: <PrintIcon />, name: "Print" },
    { icon: <ShareIcon />, name: "Share" },
  ];
  return (
    <>
      <Toaster />
      <HomeContainer>
        <Box>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: "absolute", top: 500, right: 50 }}
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </SpeedDial>
        </Box>
        <Notes />
      </HomeContainer>
    </>
  );
};
const HomeContainer = styled.section`
  padding: 3rem;
`;
export default Home;
