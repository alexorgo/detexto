import React from "react";

const Downloader = (props) =>{
    const download = (filename, text) => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display='none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
    return(
        <button type="button" onClick={download(props.filename, props.text)}>Descargar</button>
    )
}

export default Downloader;