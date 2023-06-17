import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Dashboard from '../screens/Dashboard/Dashboard';
import Categories from '../screens/Categories/Categories';
import { CATEGORIES_SCREEN, DASHBOARD_SCREEN } from '../constants/navigationScreens';

const Drawer = createDrawerNavigator();

export type RootDrawerParamList = {
  [DASHBOARD_SCREEN]: undefined;
  [CATEGORIES_SCREEN]: undefined;
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={DASHBOARD_SCREEN} component={Dashboard} />
      <Drawer.Screen name={CATEGORIES_SCREEN} component={Categories} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
