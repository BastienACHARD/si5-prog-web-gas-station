import React from "react";

import NavComp from './Contexts/NavComp';

import { useEffect, useState } from "react";


function App() {

  const [title, setTitle] = useState("Gazify");

  useEffect(() => {
    // This will run when the page first loads and whenever the title changes
    document.title = title;
  }, [title]);

  const changeTitle = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTitle(event.target.value);


  return (
    <div style={styles.container}>
      <input
        type="text"
        onChange={changeTitle}
        value={title}
        style={styles.input}
      />
    </div>
  );
};

  const styles = {
    container: {
      width: 500,
      margin: "50px auto",
      display: "flex",
      justifyContent: "center",
    },
    input: {
      width: 300,
      padding: "5px 20px",
    },
  };
      

  return (
    <div 
   
    className="App">
    <NavComp />
    </div>
  );
}

export default App;

