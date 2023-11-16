import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AccordionContainer = (props) => {
  return (
    <div style={{ margin: "10px 20px" }}>
      <Accordion
        className="accordion-container"
        defaultExpanded={props.defaultExpanded}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h2>{props.title}</h2>
        </AccordionSummary>
        <AccordionDetails>{props.children}</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionContainer;
