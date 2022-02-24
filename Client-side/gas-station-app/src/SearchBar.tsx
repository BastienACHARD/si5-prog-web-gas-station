import React, { useState } from 'react';
import Select from 'react-select';
import Cities from './Cities.json'


const SearchBar = (props:any) =>  {
  return (
    <div style={{  width: '300px' ,marginLeft:'10px'}} className="App">
      <Select 
        defaultValue={props.selectedOption}
                onChange={props.setSelectedOption}
                placeholder="City"
                
       options={Cities.map(e => ({ label: e.city, value: e.city}))}         
                
                 />
  
  <div className="input-group-addon" ><i className="fa fa-search"></i></div>

    </div>
  );}

  export default SearchBar;
