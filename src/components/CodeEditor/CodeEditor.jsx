import "./CodeEditor.scss"
import  { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

const CodeEditor = () => {
  const [code, setCode] = useState('console.log("Hello, World!");');
  const [output, setOutput] = useState('');

  const handleChange = (newCode) => {
    setCode(newCode);
  };

  const runCode = () => {
    try {
      const consoleLog = (output) => {
        setOutput((prevOutput) => prevOutput + output + '\n');
      };
      const console = { log: consoleLog };
      // Execute the code in a sandboxed environment
      new Function('console', code)(console);
    } catch (error) {
      console.error(error);
    }
  };

  const clearCode = () =>{
    setOutput("");
  }

  return (
    <div className="code-editor">
        <div className="code-editor__container">
      <AceEditor
        mode="javascript"
        theme="monokai"
        onChange={handleChange}
        value={code}
        fontSize={16}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        width="100%"
        height="20rem"
        setOptions={{ useWorker: false }}
      />
      
      <div className="output">
        <h2>Output:</h2>
        <pre>{output}</pre>
      </div>
      </div>
      <div className="button-container">
        <button className="button-container__run-button" onClick={runCode}>Run</button>
        <button className="button-container__clear-button" onClick={() => clearCode(output)}>Clear</button>
      </div>
    </div>
  );
};

export default CodeEditor;
