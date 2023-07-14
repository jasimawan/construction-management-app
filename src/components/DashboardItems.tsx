import React, {useCallback} from 'react';
import {CategoriesState, MachineCategory} from '../types';
import {useAppSelector} from '../store/store';
import {ListRenderItemInfo} from 'react-native';
import MachinesListing from './MachinesListing';
import { useMolecules } from '@bambooapp/bamboo-molecules'

function DashboardItems(): JSX.Element {
  const machinecategoriesState: CategoriesState = useAppSelector(state => state.categories);
  const { FlatList } = useMolecules()

  const keyExtractor = useCallback(
    ({id}: MachineCategory, index: number) => id,
    [],
  );

  const renderItem = ({item}: ListRenderItemInfo<MachineCategory>) => {
    return <MachinesListing machineCategory={item} />;
  };

  return (
    <FlatList
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      data={machinecategoriesState.machinesCategories}
    />
  );
}

export default DashboardItems;
