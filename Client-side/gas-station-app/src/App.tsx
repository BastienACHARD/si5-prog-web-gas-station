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


const App = () => {
  // Récupérer le theme du navigateur (dark ou light)
  const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Hooks
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', userPrefersDark ? dark : light);

  // change le theme en fonction du Switch
  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  }

  return (
    <StationProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header toggleTheme={toggleTheme} />
        <div className='listStation'>
          <ListStationsComponent />
        </div>
        <div className='map'>
          <LeafletMap />
        </div>
      </ThemeProvider>
    </StationProvider>
  );
}

export default App;
