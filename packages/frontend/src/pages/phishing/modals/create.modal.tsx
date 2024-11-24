import { Box, Button, Modal, SxProps, Typography } from "@mui/material";
import { PhishingForm } from "../forms/phishing.form";
import CloseIcon from "@mui/icons-material/Close";

interface CreateModalProps {
  visible: boolean;
  close: () => void;
}

const style: SxProps = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "18px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const CreateModal: React.FC<CreateModalProps> = ({ visible, close }) => {
  return (
    <Modal open={visible} onClose={close}>
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button endIcon={<CloseIcon />} onClick={close} />
        </Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Enter email to make phishing attempt
        </Typography>
        <PhishingForm closeModal={close} />
      </Box>
    </Modal>
  );
};

export default CreateModal;
