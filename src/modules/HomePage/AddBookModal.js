import React, { useState } from "react";

import { Button, TextField, Box } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";

import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import TextEditor from "./TextEditor";

//styles
const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      paperWidthSm: {
        maxWidth: "857px",
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    marginLeft: "10px",
  },
}));

//Add modal component
export const AddBookModal = ({ onSave }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [htmlEditorFormat, setHtmlEditorFormat] = useState(null);
  const [title, setTitle] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onHtmlEditorFormat = (htmlEditorState) => {
    setHtmlEditorFormat(htmlEditorState);
  };
  const onSaveBook = (event) => {
    event.preventDefault();
    if (title && htmlEditorFormat) {
      const bookDetails = { name: title, content: htmlEditorFormat };
      onSave(bookDetails);
      handleClose();
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add new pages
        <AddIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Create new page"}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              required
              fullWidth
              label="Page Title"
              name="name"
              onChange={onTitleChange}
              autoComplete="name"
            />

            <Box p={2}>
              <TextEditor htmlOutput={onHtmlEditorFormat} />
            </Box>
            <Box textAlign="right" pb={2}>
              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
                BACK TO BOOK
              </Button>
              <Button
                className={classes.buttonStyle}
                type="submit"
                onClick={onSaveBook}
                variant="contained"
                color="primary"
                autoFocus
              >
                SAVE PAGE
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default AddBookModal;
