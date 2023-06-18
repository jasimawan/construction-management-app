import React, {useCallback} from 'react';
import {MachineCategory, MachineState} from '../types';
import {useAppSelector} from '../store/store';
import {FlatList} from 'native-base';
import {ListRenderItemInfo} from 'react-native';
import MachinesListing from './MachinesListing';

function DashboardItems(): JSX.Element {
  const machineState: MachineState = useAppSelector(state => state.machines);

  const keyExtractor = useCallback(
    ({id}: MachineCategory, index: number) => id,
    [],
  );

  const renderItem = ({index}: ListRenderItemInfo<MachineCategory>) => {
    return <MachinesListing machineCategoryIndex={index} />;
  };

  return (
    <FlatList
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      data={machineState.machinesCategories}
    />
  );
}

export default DashboardItems;
