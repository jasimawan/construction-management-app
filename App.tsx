import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/store';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/routes';
import { ProvideMolecules, extendTheme } from '@bambooapp/bamboo-molecules';

const theme = extendTheme({
  View: {
    backgroundColor: 'black'
  }
})

const darkTheme = extendTheme({
  ...theme,
  colorMode: "dark",
})

function App(): JSX.Element {
  return (
    <ProvideMolecules theme={darkTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <DrawerNavigator/>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ProvideMolecules>
  );
}

export default App;
