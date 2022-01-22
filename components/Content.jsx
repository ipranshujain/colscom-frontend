import React, { useRef} from "react";
import Draft, {Editor} from "draft-js";

// import Editor from '@draft-js-plugins/editor';


const { RichUtils, getDefaultKeyBinding } = Draft;

export function Content({editorState, setEditorState}){
    const editor = useRef(null);
    const focus = () => {
        editor.current.focus()
    };
    // const onChange = editorState =>{ 
    //     console.log("val", editorState.getCurrentContent().getPlainText(''));    
    //     setEditorState(editorState)
    // };
    function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  }
  function mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 ) {
      const newEditorState = RichUtils.onTab(
        e,
        editorState,
        4 
      );
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }
  
    return (
        
      <div className="RichEditor-root">
        <div className={"RichEditor-editor"}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={mapKeyToEditorCommand}
            placeholder=""
            ref={editor}
            spellCheck={true}
          />
        </div>
      </div>
    );
}

const styleMap = {
  
};
function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

