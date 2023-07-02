import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Snackbar, Slide } from "@mui/material";

const ToastContext = React.createContext();

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const showCommon = (message, severity) => {
    setOpen(true);
    setMessage(message);
    setSeverity(severity);
  };

  const showSuccess = (message) => showCommon(message, "success");
  const showInfo = (message) => showCommon(message, "info");
  const showWarning = (message) => showCommon(message, "warning");
  const showError = (message) => showCommon(message, "error");

  const handleClose = () => {
    setOpen(false);
    setMessage("");
  };

  const anchorOrigin = {
    horizontal: "center",
    vertical: "bottom",
  };

  return (
    <ToastContext.Provider value={{ showSuccess, showInfo, showWarning, showError }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        TransitionComponent={Slide}
      >
        <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node,
};

export const useToast = () => useContext(ToastContext);
