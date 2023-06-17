import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Dashboard from '../screens/Dashboard/Dashboard';
import Categories from '../screens/Categories/Categories';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Categories" component={Categories} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
