// Imports 
import { useState, useContext } from 'react';

// Map
import LeafletMap from './Components/Map/LeafletMap';

// Components
import ListStationsComponent from './Components/ListStation/ListStationsComponent';
import { Header } from './Components/Header';
import { GraphComponent } from './Components/Statistiques/graphComponent';

// Context
import { StationProvider } from './Contexts/stationContext';
import { GraphCtx } from './Contexts/graphContext';
import { GraphProvider } from './Contexts/graphContext';

// theme
import usePersistedState from './utils/usePersistedState';
import GlobalStyle from './Styles/global';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import light from './Styles/Themes/light';
import dark from './Styles/Themes/dark';

// CSS
import './App.css';


const App = () => {
  // Récupérer le theme du navigateur (dark ou light)
  const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Hooks
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', userPrefersDark ? dark : light);
  const [graph, setGraph] = useState<boolean>(false);
  const context = useContext(GraphCtx);

  // change le theme en fonction du Switch
  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  }

  const toggleMap = () => {
    setGraph(false);
  }

  // change la vue pour afficher les statistiques
  const toggleGraph = () => {
    context!.updateGraphData();
    setGraph(true);
  }

  return (
    <StationProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Header toggleTheme={toggleTheme} toggleMap={toggleMap} toggleGraph={toggleGraph} />
          {graph && <div className='statistiques'><GraphComponent /></div>}
          {!graph && <div className='listStation'><ListStationsComponent /></div>}
          {!graph && <div className='map'><LeafletMap /></div>}        
        </ThemeProvider>
    </StationProvider>
  );
}

export default App;
