/* eslint-disable no-unused-vars */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MKInput from "components/MKInput";
import { useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import { Autocomplete, TextField } from "@mui/material";
import MKBox from "components/MKBox";
import PropTypes from "prop-types";

function ComputerModal({ computer, labs, isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lab, setLab] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleLabChange = (e, value) => {
    setLab(value);
  };

  const refreshState = () => {
    setName(computer?.name || "");
    setDescription(computer?.description || "");
    setLab(computer?.lab || null);
  };

  const handleSave = () => {
    if (!name || !description || !lab) {
      return;
    }
    onSubmit({
      id: computer?.id,
      name: name,
      description: description,
      lab: lab,
    });
  };

  useEffect(() => {
    refreshState();
  }, [isOpen]);

  return (
    <Dialog fullWidth open={isOpen} onClose={onClose}>
      <DialogTitle>{computer ? "Chỉnh sửa máy tính" : "Thêm mới máy tính"}</DialogTitle>
      <DialogContent>
        <MKBox mt={1} mb={2}>
          <MKInput label="Tên" fullWidth value={name} onChange={handleNameChange} />
        </MKBox>
        <MKBox mb={2}>
          <TextField
            label="Mô tả"
            type="textarea"
            rows={4}
            multiline
            fullWidth
            value={description}
            onChange={handleDescriptionChange}
          />
        </MKBox>
        <MKBox>
          <Autocomplete
            freeSolo
            id="lab"
            value={lab}
            options={labs}
            getOptionLabel={(option) => option?.name}
            onChange={handleLabChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Phòng máy"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
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

ComputerModal.propTypes = {
  computer: PropTypes.object.isRequired,
  labs: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ComputerModal;
