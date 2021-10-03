import React from 'react';
import { Controller } from 'react-hook-form';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const buttonList = [
  ['bold', 'italic', 'underline', 'strike'],
  ['formatBlock', 'fontSize', 'fontColor', 'hiliteColor'],
  ['list', 'align'],
  ['table', 'link', 'image'],
  ['showBlocks', 'codeView', 'removeFormat'],
  ['undo', 'redo'],
  [':r-More Formats-default.more_plus', 'subscript', 'superscript', 'lineHeight', 'horizontalRule'],
];

export default function RichEditor({ name, control }) {
  const SunEditorWrapper = React.forwardRef((props, ref) => {
    return <SunEditor {...props} ref={ref} height={300} setContents={control.getValues(name)} />;
  });

  return (
    <Controller
      as={SunEditorWrapper}
      name={name}
      control={control}
      defaultValue=""
      setOptions={{
        buttonList,
      }}
    />
  );
}
