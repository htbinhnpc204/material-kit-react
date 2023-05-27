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
import { toast } from "react-toastify";
import api from "utils/api";
import helper from "utils/helper";
import { users } from "utils/path";

function LabModal({ lab, isOpen, onClose, onSubmit }) {
  const [name, setName] = useState(lab?.name || "");
  const [description, setDescription] = useState(lab?.description || "");
  const [manager, setManager] = useState(lab?.manager || null);
  const [managers, setManagers] = useState([]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleManagerChange = (e, value) => {
    setManager(value);
  };

  const refreshState = () => {
    setName(lab?.name || "");
    setDescription(lab?.description || "");
    setManager(lab?.manager || null);
  };

  const handleSave = () => {
    onSubmit({
      id: lab?.id,
      name: name,
      description: description,
      manager: manager,
    });
  };

  useEffect(() => {
    if (isOpen) {
      api.setJwtToken(helper.getCookie());
      const res = api.get({ path: `${users}` });
      res
        .then((response) => {
          setManagers(response.data.data.items);
        })
        .catch(() => {
          toast.error("Đồng bộ danh sách cán bộ thất bại");
        });
    }
    refreshState();
  }, [isOpen]);

  return (
    <Dialog fullWidth open={isOpen} onClose={onClose}>
      <DialogTitle>{lab ? "Chỉnh sửa phòng máy" : "Thêm mới phòng máy"}</DialogTitle>
      <DialogContent>
        <MKBox mt={1} mb={2}>
          <MKInput label="Tên phòng máy" fullWidth value={name} onChange={handleNameChange} />
        </MKBox>
        <MKBox mb={2}>
          <MKInput
            label="Mô tả chi tiết"
            fullWidth
            value={description}
            onChange={handleDescriptionChange}
          />
        </MKBox>
        <MKBox mb={2}>
          <Autocomplete
            freeSolo
            id="manager"
            value={manager}
            options={managers}
            getOptionLabel={(option) => option?.name}
            onChange={handleManagerChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Quản lý"
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
  lab: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LabModal;
