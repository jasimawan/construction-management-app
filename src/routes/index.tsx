import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Dashboard from '../screens/Dashboard/Dashboard';
import Categories from '../screens/Categories/Categories';

import {
  CATEGORIES_SCREEN,
  DASHBOARD_SCREEN,
  MACHINE_SCREEN,
} from '../constants/navigationScreens';
import {MachineCategory} from '../types';
import {useAppSelector} from '../store/store';
import Machines from '../screens/Machines/Machines';

export interface RootDrawerParamList extends Record<string, Record<string, unknown> | undefined> {
  [DASHBOARD_SCREEN]: undefined;
  [CATEGORIES_SCREEN]: undefined;
  [MACHINE_SCREEN]: { categoryId: string };
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigator = () => {
  const machineCategories: MachineCategory[] = useAppSelector(state => state.categories.machinesCategories);
  
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={DASHBOARD_SCREEN} component={Dashboard} />
      {machineCategories.map((machineCategory) => (
        <Drawer.Screen
          key={`${machineCategory.id}_${machineCategory.category}`}
          name={machineCategory.id as any}
          component={Machines}
          options={{
            drawerLabel: machineCategory.category,
            headerTitle: machineCategory.category,
          }}
          initialParams={{ categoryId: machineCategory.id }}
          listeners={({ navigation }) => ({
            focus: () => {
              navigation.setParams({ categoryId: machineCategory.id });
            },
          })}
        />
      ))}
      <Drawer.Screen name={CATEGORIES_SCREEN} component={Categories} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
