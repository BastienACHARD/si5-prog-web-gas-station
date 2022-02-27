import React from "react";
import NavComp from './components/NavComp';

import { useEffect, useState,useCallback } from "react";
import useLocalStorage from './lib/useLocalStorage';
import { ToggleModeNight } from './components/ToggleModeNight';
//import { setTheme } from './components/ToggleModeNight';

import './App.scss';









function App() {

  const [title, setTitle] = useState("Gazify");

  useEffect(() => {
    // This will run when the page first loads and whenever the title changes
    document.title = title;
  }, [title]);

  const changeTitle = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTitle(event.target.value);


  return (
    <div >
      <input
        type="text"
        onChange={changeTitle}
        value={title}
      />  
    </div>
  );
};



	const [storageMode, setStorageMode] = useLocalStorage('darkmode');

	const handleChangeMode = useCallback(
		(e) => {
			const modeValue = !!e.target.checked;
			//setDarkMode(modeValue);
			setStorageMode(modeValue);
		},
		[setStorageMode],
	);
/*
    useEffect(() => {
		    setTheme(storageMode || 'light');
	    }, [storageMode]);
*/
      

  return (

    <div 
    className="App">
    <NavComp />
    </div>
    
  );
}

export default App;

