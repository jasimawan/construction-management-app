import React, {useCallback, useMemo} from 'react';
import {Machine, MachineCategory, MachineState} from '../types';
import {useAppDispatch, useAppSelector} from '../store/store';
import {addMachine} from '../store/reducers/machines';
import shortid from 'shortid';
import EmptyListComponent from './EmptyListComponent';
import {ListRenderItemInfo, PixelRatio, StyleSheet} from 'react-native';
import MachineFormItem from './MachineFormItem';
import DeviceInfo from 'react-native-device-info';
import { useMolecules } from '@bambooapp/bamboo-molecules';

const isTablet = DeviceInfo.isTablet();
const isiPad = DeviceInfo.getModel() === 'iPad';

interface MachinesListingProps {
  machineCategory: MachineCategory;
}

function MachinesListing({
  machineCategory,
}: MachinesListingProps): JSX.Element {
  const { Button, View, Text, FlatList } = useMolecules()
  const machineState: MachineState = useAppSelector(state => state.machines);
  const dispatch = useAppDispatch();

  const machines = useMemo(() => machineState.machines.filter(item => item.categoryId === machineCategory.id), [machineState, machineCategory])

  const handleAddNewMachine = useCallback(() => {
    const attributes: Record<string, string | boolean | number | Date | undefined> = {}
    machineCategory.fields?.forEach(item => {
      attributes[`${item.label}_${item.id}`] = item.value
    })
      dispatch(
        addMachine({
          id: shortid.generate(),
          categoryId: machineCategory.id,
          attributes,
        }),
      );
  }, [dispatch, machineCategory]);

  console.log("hello", machineCategory)

  const renderListEmptyComponent = () => (
    <EmptyListComponent text="No Items to display" />
  );

  const keyExtractor = useCallback(
    ({id, categoryId}: Machine, index: number) => `${id}_${categoryId}`,
    [],
  );

  const renderItem = useCallback(
    ({item, index}: ListRenderItemInfo<Machine>) => {
      return (
        <View
          style={styles.listItemStyle}
          key={`${item.id}_${item.categoryId}`}>
          <MachineFormItem
            index={index}
            machine={item}
            machineCategory={machineCategory}
          />
        </View>
      );
    },
    [machineCategory],
  );

  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <Text style={styles.headingTextStyle}>
          {machineCategory.category}
        </Text>
        <Button onPress={handleAddNewMachine} size="sm" variant="contained">
          ADD NEW ITEM
        </Button>
      </View>
      <FlatList
        contentContainerStyle={styles.listContainerStyle}
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
    flex: 1
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 12
  },
  headingTextStyle: {
    fontWeight: 'bold',
    fontSize: 24 / PixelRatio.getFontScale()
  },
  listItemStyle: {
    width: isTablet || isiPad ? '50%' : '100%',
  },
  listContainerStyle: { paddingBottom: 20 }
});

export default MachinesListing;
