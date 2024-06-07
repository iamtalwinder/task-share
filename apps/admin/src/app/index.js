import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import Routes from 'app/routes';
import themes from 'app/themes';
import Auth from 'app/auth';
import NavigationScroll from 'app/layout/NavigationScroll';

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <Auth>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </Auth>
  );
};

export default App;
