import React from "react";
import { Modal, Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomModal = ({ open, onClose, children }: ModalProps) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="custom-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <Close />
        </IconButton>

        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
