import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import AddBookModal from "./AddBookModal";
import EditBookModal from "./EditBookModal";
import { retrieveBooks } from "../../redux/book.effects";
import data from "./data";

//Material ui styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#D3D3D3",
    display: "flex",
    height: 224,
    padding: "20px",
    justifyContent: "center",
    paddingTop: "5%",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#C0C0C0",
    height: "70vh",
  },
  tabPanelStyle: {
    backgroundColor: " #F5F5F5",
    width: "50%",
    height: "70vh",
  },
  container: {
    backgroundColor: "blue",
    position: "relative",
  },
  contentStyle: {
    textAlign: "left",
  },
  addIcon: {
    position: "absolute",
    bottom: 0,
    top: "145%",
    right: "19%",
    height: "30px",
  },
}));

const theme = createMuiTheme({
  overrides: {
    MuiTab: {
      wrapper: {
        textAlign: "initial",
        alignItems: "left",
        flexDirection: "none",
        justifyContent: "none",
      },
    },
  },
});

// Tab section implementation
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

//Listing Book details
export const BookList = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [books, setBooks] = useState(props?.getBooks || "");

  useEffect(() => {
    const readBook = () => {
      if (
        localStorage.getItem("books") !== "[]" &&
        localStorage.getItem("books") !== null
      ) {
        setBooks(JSON.parse(localStorage.getItem("books")));
      } else 
      setBooks(data || books);
      
    };
    readBook();
  }, []);

  const retrieveBooks = async () => {
    const { retrieveBooks } = props.actions;
    await retrieveBooks();
  };

  useEffect(() => {
    retrieveBooks();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSave = (bookDetails) => {
    const updatedBooks = [...books, bookDetails];
    if (updatedBooks) {
      localStorage.setItem("books", JSON.stringify(updatedBooks));
      setBooks([...books, bookDetails]);
    }
  };

  const onEdit = (bookDetails, bookIndex) => {
    const updatedBookDetails = bookDetails;
    if (updatedBookDetails) {
      books[bookIndex] = updatedBookDetails;
      localStorage.setItem("books", JSON.stringify(books));
      setBooks([...books]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.container}>
        <Box className={classes.root}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            {books?.map((book, index) => (
              <Tab label={book.name} key={book.name} {...a11yProps(index)} />
            ))}
          </Tabs>
          {books?.map((book, index) => (
            <TabPanel
              className={classes.tabPanelStyle}
              value={value}
              index={index}
            >
              <Typography component={"div"} variant="h4" gutterBottom>
                {book.name}
                <EditBookModal onEdit={onEdit} index={value} />
              </Typography>
              <div
                className={classes.contentStyle}
                dangerouslySetInnerHTML={{ __html: book.content }}
              />
            </TabPanel>
          ))}
          <Box className={classes.addIcon}>
            <AddBookModal onSave={onSave} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

function mapStateToProps(state) {
  return {
    getBooks: state.books.getBooks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ retrieveBooks }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
