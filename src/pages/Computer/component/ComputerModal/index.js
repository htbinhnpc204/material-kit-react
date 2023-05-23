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

function LabModal({ computer, labs, isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lab, setLab] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleManagerChange = (e, value) => {
    setLab(value);
  };

  const refreshState = () => {
    setName(computer?.name || "");
    setDescription(computer?.description || "");
    setLab(computer?.lab || null);
  };

  const handleSave = () => {
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
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{lab ? "Chỉnh sửa máy tính" : "Thêm mới máy tính"}</DialogTitle>
      <DialogContent>
        <MKBox mt={1} mb={2}>
          <MKInput label="Tên" fullWidth value={name} onChange={handleNameChange} />
        </MKBox>
        <MKBox mb={2}>
          <MKInput
            label="Mô tả"
            type="textarea"
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
            onChange={handleManagerChange}
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
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleSave} color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}

LabModal.propTypes = {
  computer: PropTypes.object.isRequired,
  labs: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LabModal;
