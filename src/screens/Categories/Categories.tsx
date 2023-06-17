import React, {useCallback} from 'react';
import {FlatList, ListRenderItemInfo, Text, View} from 'react-native';
import {Box, Button} from 'native-base';
import {addNewMachine} from '../../store/reducers/machines';
import styles from './Categories.style';
import {useAppDispatch, useAppSelector} from '../../store/store';
import CategoryFormItem from '../../components/CategoryFormItem';
import shortId from 'shortid';
import {Machine, MachineState} from '../../types';

function Categories(): JSX.Element {
  const machineState: MachineState = useAppSelector(state => state.machines);
  const dispatch = useAppDispatch();

  const handleAddNew = () => {
    const fieldId = shortId.generate()
    dispatch(
      addNewMachine({
        id: shortId.generate(),
        category: 'New Category',
        fields: [
          {id: fieldId, type: 'Text', value: '', label: 'Field'},
        ],
        titleFieldIndex: 0
      }),
    );
  };

  const renderListEmptyComponent = () => {
    return (
      <Box style={styles.emptyViewStyle}>
        <Text>No Categories to display</Text>
      </Box>
    );
  };

  const keyExtractor = useCallback(
    ({id, category}: Machine, index: number) => `${id}_${category}`,
    [],
  );

  const renderItem = useCallback(({item, index}: ListRenderItemInfo<Machine>) => {
    return (
      <CategoryFormItem
        key={`${item.id}_${item.category}`}
        index={index}
        machine={item}
      />
    );
  }, []);

  return (
    <View style={styles.containerStyle}>
      <FlatList
        keyExtractor={keyExtractor}
        data={machineState.machines}
        ListEmptyComponent={renderListEmptyComponent}
        renderItem={renderItem}
      />
      <Button style={styles.buttonStyle} onPress={handleAddNew}>
        ADD NEW CATEGORY
      </Button>
    </View>
  );
}

export default Categories;
