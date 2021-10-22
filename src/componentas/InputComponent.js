import React, {useRef} from "react";

const InputBlock = (props) => {
    const textInput = useRef(null);
  
    function handleClick() {
        props.handle(textInput.current.value);
  }
    return (
        <div>
        <input
          type="text"
          ref={textInput} 
          placeholder="sobres date ogt"/>
        <input
          type="button"
          value="Dijo que te des ogt"
          onClick={handleClick}
        />
      </div>
    )
}

export default InputBlock;