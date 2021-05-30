import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Typography } from "@material-ui/core";

//Text Editor component
export const TextEditor = ({ htmlOutput, type, editContent }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (type === "edit" && editContent) {
      const contentBlock = htmlToDraft(editContent);
      const contentState = ContentState.createFromBlockArray(
        contentBlock?.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [type]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    htmlOutput(draftToHtml(convertToRaw(editorState?.getCurrentContent())));
  };
  return (
    <>
      <Typography variant="subtitle2" gutterBottom>
        Please add content :
      </Typography>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
      />
    </>
  );
};
export default TextEditor;
