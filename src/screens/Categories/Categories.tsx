import React, {useCallback} from 'react';
import {FlatList, ListRenderItemInfo, Text, View} from 'react-native';
import {Box, Button} from 'native-base';
import {MachineState, addNewMachine} from '../../store/reducers/machines';
import styles from './Categories.style';
import {useAppDispatch, useAppSelector} from '../../store/store';
import CategoryFormItem from '../../components/CategoryFormItem';

function Categories(): JSX.Element {
  const machines: MachineState[] = useAppSelector(state => state.machines);
  const dispatch = useAppDispatch();

  const renderListEmptyComponent = () => {
    return (
      <Box style={styles.emptyViewStyle}>
        <Text>No Categories to display</Text>
      </Box>
    );
  };

  const keyExtractor = useCallback(
    ({id, category}: MachineState, index: number) => `${id}_${category}`,
    [],
  );

  const renderItem = useCallback(({item}: ListRenderItemInfo<MachineState>) => {
    return <CategoryFormItem key={`${item.id}_${item.category}`} machine={item}/>;
  }, []);

  const handleAddNew = () => {
    dispatch(
      addNewMachine({
        id: 1,
        category: 'Test',
        fields: [{id: 1, type: 'Text', value: '', label: 'Test'}],
      }),
    );
  };

  return (
    <View style={styles.containerStyle}>
      <FlatList
        keyExtractor={keyExtractor}
        data={machines}
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
