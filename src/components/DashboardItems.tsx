import React from 'react';
import {CategoriesState, MachineCategory} from '../types';
import {useAppSelector} from '../store/store';
import {ListRenderItemInfo} from 'react-native';
import MachinesListing from './MachinesListing';
import { useMolecules } from '@bambooapp/bamboo-molecules'

const keyExtractor = (({id}: MachineCategory, index: number) => id);

const renderItem = ({item}: ListRenderItemInfo<MachineCategory>) => {
  return <MachinesListing machineCategoryId={item.id} />;
};

function DashboardItems(): JSX.Element {
  const machinesCategories: MachineCategory[] = useAppSelector(state => state.categories.machinesCategories);
  const { FlatList } = useMolecules()
  return (
    <FlatList
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      data={machinesCategories}
    />
  );
}

export default DashboardItems;
