import React from "react";

import NavComp from './components/NavComp';

import { useEffect, useState,useCallback } from "react";
import useLocalStorage from './lib/useLocalStorage';
import { ToggleModeNight } from './components/ToggleModeNight';
//import { setTheme } from './components/ToggleModeNight';

import './App.scss';
import { MapContainer } from "react-leaflet";
import L, { map } from "leaflet";









function App() {

  const [title, setTitle] = useState("Gazify");
  /*
  var map = new MapContainer('map', {

    fullscreenControl: {
        pseudoFullscreen: false // if true, fullscreen to page width and height
    }
});
// or, add to an existing map:
map.addControl(new L.Control.Fullscreen());
  useEffect(() => {
    document.title = title;
  }, [title]);
*/



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
   
    className={`App ${storageMode ? 'dark' : 'light'}`}>
      					<ToggleModeNight
						onChange={handleChangeMode}
						mode={storageMode}
					/>    <NavComp />
    
    </div>
    
  );
}

export default App;

