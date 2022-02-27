import React from 'react';
import Select from 'react-select';
import Cities from './assets/data/Cities.json'

const SearchBar = (props:any) =>  {
  return (
    <div style={{  width:'200px',zIndex:10,position:"relative"}} className="App">
      <Select 
        defaultValue={props.selectedOption}
                onChange={props.setSelectedOption}
                placeholder="City"
       options={Cities.map(e => ({ label: e.city, value: e.city}))}/>
  </div>
  );}

  export default SearchBar;
