"use client";
import React from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File


// Assuming you have some specific props for this component
interface ContentProps {
  // Define your props here if any
}

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const Content: React.FC<ContentProps> = () => {
  const editorOptions = {
    buttonList: [
      [
        'formatBlock',
        'bold',
        'underline',
        'italic',
        'blockquote',
        'fontColor',
        'hiliteColor',
        'textStyle',
        'removeFormat',
        'align',
        'horizontalRule',
        'list',
        'lineHeight',
        'table',
        'link',
        'image',
        'video',
        'audio',
        'codeView'
      ]
    ]
  };

  return (<SunEditor setOptions={editorOptions} />);
};

export default Content;
