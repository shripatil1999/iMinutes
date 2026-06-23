import React from "react";
import { createRoot } from "react-dom/client";
import { Alert, AlertTitle } from "@mui/material";

// Function to show the alert
const alertField = (message, type) => {
  // Create a container for the alert
  const alertContainer = document.createElement("div");
  alertContainer.id = "alert-container"; // Optional: give an ID for easier reference
  document.body.appendChild(alertContainer);

  const root = createRoot(alertContainer);

  // Function to remove the alert from the DOM
  const closeAlert = () => {
    root.unmount(); // Unmount the React component
    document.body.removeChild(alertContainer);
  };

  root.render(
    <Alert
      className="alertShadow fixed top-5 left-1/2 transform -translate-x-1/2 w-[80%] sm:w-[70%] md:w-[65%] lg:w-[60%] xl:w-[55%]"
      severity={type} //(warning, success, error, info )
      onClose={closeAlert}
    >
      <AlertTitle>{type.charAt(0).toUpperCase() + type.slice(1)}</AlertTitle>
      {message}
    </Alert>
  );

  // Automatically remove the alert after 2 seconds
  setTimeout(closeAlert, 2500);
};

export { alertField };
