import React, {useCallback} from 'react';
import {FlatList, ListRenderItemInfo, View} from 'react-native';
import {Button} from 'native-base';
import {addNewCategory} from '../../store/reducers/machines';
import styles from './Categories.style';
import {useAppDispatch, useAppSelector} from '../../store/store';
import CategoryFormItem from '../../components/CategoryFormItem';
import shortId from 'shortid';
import {MachineCategory, MachineState} from '../../types';
import EmptyListComponent from '../../components/EmptyListComponent';

function Categories(): JSX.Element {
  const machineState: MachineState = useAppSelector(state => state.machines);
  const dispatch = useAppDispatch();

  const handleAddNew = () => {
    const fieldId = shortId.generate()
    dispatch(
       addNewCategory({
        id: shortId.generate(),
        category: 'New Category',
        fields: [
          {id: fieldId, type: 'Text', label: 'Field'},
        ],
        titleFieldIndex: 0,
        machines: []
      }),
    );
  };

  const renderListEmptyComponent = () => <EmptyListComponent text="No Categories to display"/>

  const keyExtractor = useCallback(({ id }: MachineCategory, index: number) => id,[]);

  const renderItem = ({item, index}: ListRenderItemInfo<MachineCategory>) => {
    return (
      <CategoryFormItem
        key={`${item.id}_${item.category}`}
        index={index}
        machineCategory={item}
      />
    );
  }

  return (
    <View style={styles.containerStyle}>
      <FlatList
        keyExtractor={keyExtractor}
        data={machineState.machinesCategories}
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
