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
          width: { xs: "90%", sm: "75%", md: "50%", lg: "40%" },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
          maxHeight: "90vh",
          overflowY: "auto",
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
