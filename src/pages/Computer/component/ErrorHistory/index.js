/* eslint-disable no-unused-vars */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { CheckRounded, Unarchive } from "@mui/icons-material";

function ErrorHistory({ computer, isOpen, onClose, fetchErrors }) {
  const [errors, setErrors] = useState([]);
  let i = 1;

  useEffect(() => {
    if (isOpen) {
      const res = fetchErrors(computer?.id);
      res.then((response) => {
        setErrors(response.data?.data?.items);
      });
    }
  }, [isOpen]);

  return (
    <Dialog fullWidth open={isOpen} onClose={onClose}>
      <DialogTitle mt={2}>{`Lịch sử báo lỗi - ${computer?.name}`}</DialogTitle>
      <DialogContent>
        {errors.map((error) => {
          return (
            <Grid item xs={12} sm={12} md={12} key={computer.id}>
              <Typography>
                {`${i++}: ${error.user?.name} - ${error.description}`}
                {error.fixed ? (
                  <CheckRounded color="success" style={{ marginLeft: 5 }} />
                ) : (
                  <Unarchive color="error" style={{ marginLeft: 5 }} />
                )}
              </Typography>
            </Grid>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="info">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ErrorHistory.propTypes = {
  computer: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fetchErrors: PropTypes.func.isRequired,
};

export default ErrorHistory;
