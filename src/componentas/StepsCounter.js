import React, {useRef} from "react";

const StepsCounterInput = (props) => {
    const numberInput = useRef(null);

    function handleSteps(){
        props.handle(numberInput.current.value);
    }

    return(
        <label>
            Numero de saltos:
            <input className="ayuda-no-se" type="number" onInput={handleSteps} ref={numberInput} placeholder='5'></input>
        </label>
    )
}

export default StepsCounterInput;