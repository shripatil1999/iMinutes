import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

export default function ControlledAccordions() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="w-full mr-3 mt-4">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        // className="mb-2"
        sx={{ m: "0 !important", mb: "10px !important", borderRadius: "5px" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ bgcolor: "rgba(209, 213, 219)" }}
        >
          <Typography sx={{ flexShrink: 0 }}>Overdue Task</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>The Task Details will be shown here...!!!!</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        sx={{ m: "0 !important", mb: "10px !important" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          sx={{ bgcolor: "rgba(209, 213, 219)" }}
        >
          <Typography sx={{ flexShrink: 0 }}>In Progress Task</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>The Task Details will be shown here...!!!!</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        sx={{ m: "0 !important", mb: "10px !important" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
          sx={{ bgcolor: "rgba(209, 213, 219)" }}
        >
          <Typography sx={{ flexShrink: 0 }}>Completed Tasks</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>The Task Details will be shown here...!!!!</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
