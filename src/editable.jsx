import React, { useRef, useEffect } from "react";

const EditableElement = (props) => {
  const { onChange } = props;
  const element = useRef();
  let elements = React.Children.toArray(props.children);

  const handleChange = () => {
    const value = element.current?.value || element.current?.innerText;
    if (onChange) {
      onChange(value);
    }
  };
  useEffect(() => {
    const value = element.current?.value || element.current?.innerText;
    if (onChange) {
      onChange(value);
    }

  
  }, []);
  elements = React.cloneElement(elements[0], {
    contentEditable: true,
   
    suppressContentEditableWarning: true,
    ref: element,
    onKeyUp: handleChange
  });''
  return (elements);
};

export default EditableElement;