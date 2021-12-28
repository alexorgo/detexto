import React, {useRef} from "react";

const InputBlock = (props) => {
    const textInput = useRef(null);
  
    function handleClick() {
        props.handle(textInput.current.value);
  }
    return (
        <div>
        <input
        className="ayuda-no-se"
          type="text"
          ref={textInput} 
          placeholder="sobres date ogt"
          onChange={(e) => props.setter(textInput.current.value)}/>

        <input
        className="ayuda-no-se"
          type="button"
          value="sobress"
          onClick={handleClick}
        />
      </div>
    )
}

export default InputBlock;