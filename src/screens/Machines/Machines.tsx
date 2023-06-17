import {Box, Button, HStack, Heading} from 'native-base';
import React, {useCallback} from 'react';
import {View, FlatList, ListRenderItemInfo} from 'react-native';
import {MACHINE_SCREEN} from '../../constants/navigationScreens';
import {RootDrawerParamList} from '../../routes';
import {RouteProp} from '@react-navigation/native';
import {Machine, MachineState} from '../../types';
import {useAppDispatch, useAppSelector} from '../../store/store';
import styles from './Machines.styles';
import EmptyListComponent from '../../components/EmptyListComponent';
import MachineFormItem from '../../components/MachineFormItem';
import {addMachine} from '../../store/reducers/machines';
import shortid from 'shortid';

type MachineScreenProps = {
  route: RouteProp<RootDrawerParamList, typeof MACHINE_SCREEN>;
};

function Machines({route}: MachineScreenProps): JSX.Element {
  const machineCategoryIndex = route.params.categoryIndex;
  const machineState: MachineState = useAppSelector(state => state.machines);
  const dispatch = useAppDispatch();
  const {titleFieldId, machines, fields} =
    machineState.machinesCategories[machineCategoryIndex];

  const handleAddNewMachine = useCallback(() => {
    dispatch(addMachine({
      id: shortid.generate(),
      categoryIndex: machineCategoryIndex,
      attributes: fields.map(field => ({
        id: shortid.generate(),
        fieldId: field.id,
        label: field.label,
        type: field.type,
        value: undefined,
      })),
    }));
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
        <MachineFormItem
          index={index}
          titleFieldId={titleFieldId}
          machine={item}
        />
      );
    },
    [],
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
        ListEmptyComponent={renderListEmptyComponent}
        renderItem={renderItem}
      />
    </View>
  );
}

export default Machines;
