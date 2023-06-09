/* eslint-disable no-unused-vars */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import { TextField } from "@mui/material";
import MKBox from "components/MKBox";
import PropTypes from "prop-types";

function ErrorModal({ computer, isOpen, onClose, onSubmit }) {
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const refreshState = () => {
    setDescription("");
  };

  const handleSave = () => {
    if (!description) {
      return;
    }
    onSubmit({
      id: computer?.id,
      description: description,
    });
  };

  useEffect(() => {
    if (isOpen) {
      refreshState();
    }
  }, [isOpen]);

  return (
    <Dialog fullWidth open={isOpen} onClose={onClose}>
      <DialogTitle mt={2}>{`Báo lỗi máy tính - ${computer?.name}`}</DialogTitle>
      <DialogContent>
        <MKBox mb={2}>
          <TextField
            label="Mô tả lỗi"
            type="textarea"
            rows={4}
            multiline
            fullWidth
            value={description}
            onChange={handleDescriptionChange}
          />
        </MKBox>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="info">
          Hủy
        </Button>
        <Button onClick={handleSave}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
}

ErrorModal.propTypes = {
  computer: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ErrorModal;
