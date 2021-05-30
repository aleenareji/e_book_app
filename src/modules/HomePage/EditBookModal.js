import React, { useEffect, useState } from "react";

import { Button, TextField, Box } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";

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
    cursor: "pointer",
  },
}));

//Edit modal component
export const EditBookModal = ({ onEdit, index }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const bookIndex = index;
  const [htmlEditorFormat, setHtmlEditorFormat] = useState(null);
  const [updatedBook, setUpdatedBook] = useState(null);

  useEffect(() => {
    if (bookIndex) {
      const books = JSON.parse(localStorage.getItem("books"));
      const selectedBook = books?.filter((book, i) => i === bookIndex);
      setUpdatedBook(selectedBook?.[0]);
    }
  }, [bookIndex]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onTitleChange = (event) => {
    setUpdatedBook({ ...updatedBook, name: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onHtmlEditorFormat = (htmlEditorState) => {
    setHtmlEditorFormat(htmlEditorState);
  };
  const onEditeBook = (event) => {
    event.preventDefault();
    if (updatedBook.name && htmlEditorFormat) {
      const editedBookDetails = {
        name: updatedBook.name,
        content: htmlEditorFormat,
      };
      onEdit(editedBookDetails, bookIndex);
      handleClose();
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <EditIcon
        className={classes.buttonStyle}
        color="primary"
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit page"}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              required
              fullWidth
              label="Page Title"
              name="name"
              value={updatedBook?.name}
              onChange={onTitleChange}
              autoComplete="name"
            />
            <Box p={2}>
              <TextEditor
                editContent={updatedBook?.content}
                type="edit"
                htmlOutput={onHtmlEditorFormat}
              />
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
                onClick={onEditeBook}
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
export default EditBookModal;
