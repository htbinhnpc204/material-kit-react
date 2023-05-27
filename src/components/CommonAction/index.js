/* eslint-disable react/prop-types */
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function CommonActions(props) {
  const { handleView, handleEdit, handleDelete, entity } = props;
  return (
    <MKBox
      style={{
        marginTop: "auto",
        marginLeft: "auto",
        marginBottom: 5,
        marginRight: 5,
      }}
    >
      <MKButton
        startIcon={<VisibilityOutlinedIcon />}
        disabled={handleView ? false : true}
        color="info"
        variant="text"
        size="small"
        onClick={() => handleView(entity?.id)}
      >
        Xem
      </MKButton>
      <MKButton
        startIcon={<ModeEditOutlinedIcon />}
        disabled={handleEdit ? false : true}
        color="success"
        variant="text"
        size="small"
        onClick={() => handleEdit(entity)}
      >
        Sửa
      </MKButton>
      <MKButton
        startIcon={<DeleteOutlineOutlinedIcon />}
        disabled={handleDelete ? false : true}
        color="primary"
        variant="text"
        size="small"
        onClick={() => handleDelete(entity)}
      >
        Xóa
      </MKButton>
    </MKBox>
  );
}

export default CommonActions;
