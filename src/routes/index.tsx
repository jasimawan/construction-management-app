import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Dashboard from '../screens/Dashboard/Dashboard';
import Categories from '../screens/Categories/Categories';

import {
  CATEGORIES_SCREEN,
  DASHBOARD_SCREEN,
  MACHINE_SCREEN,
} from '../constants/navigationScreens';
import {MachineState} from '../types';
import {useAppSelector} from '../store/store';
import Machines from '../screens/Machines/Machines';

export interface RootDrawerParamList extends Record<string, Record<string, unknown> | undefined> {
  [DASHBOARD_SCREEN]: undefined;
  [CATEGORIES_SCREEN]: undefined;
  [MACHINE_SCREEN]: { categoryIndex: number };
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigator = () => {
  const machineState: MachineState = useAppSelector(state => state.machines);
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={DASHBOARD_SCREEN} component={Dashboard} />
      {machineState.machinesCategories.map((machineCategory, index) => (
        <Drawer.Screen
          key={`${machineCategory.id}_${machineCategory.category}`}
          name={machineCategory.id as any}
          component={Machines}
          options={{
            drawerLabel: machineCategory.category,
            headerTitle: machineCategory.category,
          }}
          initialParams={{ categoryIndex: index }}
        />
      ))}
      <Drawer.Screen name={CATEGORIES_SCREEN} component={Categories} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
