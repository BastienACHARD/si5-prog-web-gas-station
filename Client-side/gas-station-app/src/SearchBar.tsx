import React, { useState } from 'react';
import Select from 'react-select';
import Cities from './Cities.json'


const SearchBar = (props:any) =>  {
  return (
    <div className="App">
      <Select
        defaultValue={props.selectedOption}
                onChange={props.setSelectedOption}
                
       options={Cities.map(e => ({ label: e.city, value: e.city}))}         
                
                 />
  

    </div>
  );}

  export default SearchBar;