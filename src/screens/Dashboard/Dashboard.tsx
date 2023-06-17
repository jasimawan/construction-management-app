import React, {useCallback} from 'react';
import {FlatList, ListRenderItemInfo, Text, View} from 'react-native';
import {Box, Button} from 'native-base';
import styles from './Dashboard.style';
import {
  CATEGORIES_SCREEN,
  DASHBOARD_SCREEN,
} from '../../constants/navigationScreens';
import {useAppSelector} from '../../store/store';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootDrawerParamList} from '../../routes';
import CategoryFormItem from '../../components/CategoryFormItem';
import {MachineCategory, MachineState} from '../../types';
import EmptyListComponent from '../../components/EmptyListComponent';

type DashboardScreenProps = {
  navigation: DrawerNavigationProp<
    RootDrawerParamList,
    typeof DASHBOARD_SCREEN
  >;
};

function Dashboard({navigation}: DashboardScreenProps): JSX.Element {
  const machineState: MachineState = useAppSelector(state => state.machines);

  const handleAddCategory = useCallback(() => {
    navigation.navigate(CATEGORIES_SCREEN);
  }, [navigation]);

  const keyExtractor = useCallback(
    ({id, category}: MachineCategory, index: number) => `${id}_${category}`,
    [],
  );

  const renderItem = useCallback(
    ({item, index}: ListRenderItemInfo<MachineCategory>) => {
      return (
        <CategoryFormItem
          key={`${item.id}_${item.category}`}
          machineCategory={item}
          index={index}
        />
      );
    },
    [],
  );

  if (machineState.machinesCategories.length === 0) {
    return (
      <EmptyListComponent
        text="No Categories Found"
        onClick={handleAddCategory}
      />
    );
  }

  return (
    <View style={styles.containerStyle}>
      <FlatList
        keyExtractor={keyExtractor}
        data={machineState.machinesCategories}
        renderItem={renderItem}
      />
    </View>
  );
}

export default Dashboard;
