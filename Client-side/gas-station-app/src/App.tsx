// Map
import LeafletMap from './Components/Map/LeafletMap';

// Components
import ListStationsComponent from './Components/ListStation/ListStationsComponent';
import { Header } from './Components/Header';

// Context
import { StationProvider } from './Contexts/stationContext';

// theme
import usePersistedState from './utils/usePersistedState';
import GlobalStyle from './Styles/global';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import light from './Styles/Themes/light';
import dark from './Styles/Themes/dark';

// CSS
import './App.css';
import { GraphProvider } from './Contexts/graphContext';
import { useState } from 'react';
import { useContext } from 'react';
import { GraphCtx } from './Contexts/graphContext';


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
    //context!.updateGraphData();
    setGraph(true);
  }

  return (
    <StationProvider>
      <GraphProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Header toggleTheme={toggleTheme} toggleMap={toggleMap} toggleGraph={toggleGraph} />
          {graph && <div className='statistiques'></div>}
          {!graph && <div className='listStation'><ListStationsComponent /></div>}
          {!graph && <div className='map'><LeafletMap /></div>}        
        </ThemeProvider>
      </GraphProvider>
    </StationProvider>
  );
}

export default App;
