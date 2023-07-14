import React, {useCallback} from 'react';
import {Machine} from '../types';
import {RootState, useAppDispatch, useAppSelector} from '../store/store';
import {addMachine} from '../store/reducers/machines';
import EmptyListComponent from './EmptyListComponent';
import {ListRenderItemInfo, PixelRatio, StyleSheet} from 'react-native';
import MachineFormItem from './MachineFormItem';
import DeviceInfo from 'react-native-device-info';
import { useMolecules } from '@bambooapp/bamboo-molecules';
import { getCategoryByIdSelector } from '../store/selectors/categoriesSelector';
import { getCategoryMachinesSelector } from '../store/selectors/getCategoryMachines';

const isTablet = DeviceInfo.isTablet();
const isiPad = DeviceInfo.getModel() === 'iPad';

interface MachinesListingProps {
  machineCategoryId: string;
}

const renderListEmptyComponent = () => (
  <EmptyListComponent text="No Items to display" />
);

const keyExtractor = ({id, categoryId}: Machine, index: number) => `${id}_${categoryId}`

function MachinesListing({
  machineCategoryId,
}: MachinesListingProps): JSX.Element {
  const { Button, View, Text, FlatList } = useMolecules()
  const machineCategory = useAppSelector((state: RootState) => getCategoryByIdSelector(state, machineCategoryId));
  const machines = useAppSelector((state: RootState) => getCategoryMachinesSelector(state)(machineCategoryId))
  const dispatch = useAppDispatch();

  const handleAddNewMachine = useCallback(() => {
      dispatch(addMachine({categoryId: machineCategoryId, machineCategoryFields: machineCategory.fields}));
  }, [dispatch, machineCategory, machineCategoryId]);

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
