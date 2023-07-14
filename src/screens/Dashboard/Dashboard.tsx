import React, {useCallback} from 'react';
import styles from './Dashboard.style';
import {
  CATEGORIES_SCREEN,
  DASHBOARD_SCREEN,
} from '../../constants/navigationScreens';
import {useAppSelector} from '../../store/store';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootDrawerParamList} from '../../routes';
import {MachineState} from '../../types';
import EmptyListComponent from '../../components/EmptyListComponent';
import DashboardItems from '../../components/DashboardItems';
import { useMolecules } from '@bambooapp/bamboo-molecules';

type DashboardScreenProps = {
  navigation: DrawerNavigationProp<
    RootDrawerParamList,
    typeof DASHBOARD_SCREEN
  >;
};

function Dashboard({navigation}: DashboardScreenProps): JSX.Element {
  const machineState: MachineState = useAppSelector(state => state.machines);
  const { View } = useMolecules()

  const handleAddCategory = useCallback(() => {
    navigation.navigate(CATEGORIES_SCREEN);
  }, [navigation]);

  if (machineState.machines.length === 0) {
    return (
      <EmptyListComponent
        text="No Categories Found"
        onClick={handleAddCategory}
      />
    );
  }

  return (
    <View style={styles.containerStyle}>
      <DashboardItems/>
    </View>
  );
}

export default Dashboard;
