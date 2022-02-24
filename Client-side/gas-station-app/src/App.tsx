import React from 'react';
import './App.css';
import LeafletMap from './Components/LeafletMap';
import ListStationsComponent from './Components/ListStationsComponent';
import { StationProvider } from './Contexts/stationContext';


const App = () => {

  return (
    <StationProvider>
      <table>
        <tbody>
          <tr>
            <td className='listStation'><ListStationsComponent /></td>
            <td className='Map'><LeafletMap /></td>
          </tr>
        </tbody>
      </table>
    </StationProvider>
  );
}

export default App;
