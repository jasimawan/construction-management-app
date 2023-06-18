import {Button, HStack, Heading} from 'native-base';
import React, {useCallback} from 'react';
import {Machine, MachineState} from '../types';
import {useAppDispatch, useAppSelector} from '../store/store';
import {addMachine} from '../store/reducers/machines';
import shortid from 'shortid';
import EmptyListComponent from './EmptyListComponent';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import MachineFormItem from './MachineFormItem';
import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();
const isiPad = DeviceInfo.getModel() === 'iPad';

interface MachinesListingProps {
  machineCategoryIndex: number;
}

function MachinesListing({
  machineCategoryIndex,
}: MachinesListingProps): JSX.Element {
  const machineState: MachineState = useAppSelector(state => state.machines);
  const dispatch = useAppDispatch();
  const {titleFieldId, machines, fields} =
  machineState.machinesCategories[machineCategoryIndex];

  const handleAddNewMachine = useCallback(() => {
    dispatch(
      addMachine({
        id: shortid.generate(),
        categoryIndex: machineCategoryIndex,
        attributes: fields.map(field => ({
          id: shortid.generate(),
          fieldId: field.id,
          label: field.label,
          type: field.type,
          value: undefined,
        })),
      }),
    );
  }, [dispatch, machineCategoryIndex, fields]);

  const renderListEmptyComponent = () => (
    <EmptyListComponent text="No Items to display" />
  );

  const keyExtractor = useCallback(
    ({id, categoryIndex}: Machine, index: number) => `${id}_${categoryIndex}`,
    [],
  );

  const renderItem = useCallback(
    ({item, index}: ListRenderItemInfo<Machine>) => {
      return (
        <View
          style={styles.listItemStyle}
          key={`${item.id}_${item.categoryIndex}`}>
          <MachineFormItem
            index={index}
            titleFieldId={titleFieldId}
            machine={item}
          />
        </View>
      );
    },
    [titleFieldId],
  );

  return (
    <View style={styles.containerStyle}>
      <HStack justifyContent="space-between" margin={2}>
        <Heading size="md">
          {machineState.machinesCategories[machineCategoryIndex]?.category}
        </Heading>
        <Button onPress={handleAddNewMachine} size="sm" variant="solid">
          ADD NEW ITEM
        </Button>
      </HStack>
      <FlatList
        keyExtractor={keyExtractor}
        data={machines}
        numColumns={isTablet || isiPad ? 2 : 1}
        ListEmptyComponent={renderListEmptyComponent}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
  },
  listItemStyle: {
    width: isTablet || isiPad ? '50%' : '100%',
  },
});

export default MachinesListing;
