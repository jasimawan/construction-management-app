import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/store';
import {NativeBaseProvider} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/routes';
import { ProvideMolecules } from '@bambooapp/bamboo-molecules';

function App(): JSX.Element {
  return (
    <ProvideMolecules>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NativeBaseProvider>
              <NavigationContainer>
                <DrawerNavigator/>
              </NavigationContainer>
          </NativeBaseProvider>
        </PersistGate>
      </Provider>
    </ProvideMolecules>
  );
}

export default App;
