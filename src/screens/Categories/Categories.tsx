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
import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();
const isiPad = DeviceInfo.getModel() === 'iPad';

function Categories(): JSX.Element {
  const machineState: MachineState = useAppSelector(state => state.machines);
  const dispatch = useAppDispatch();

  const handleAddNew = () => {
    const fieldId = shortId.generate();
    dispatch(
      addNewCategory({
        id: shortId.generate(),
        category: 'New Category',
        fields: [{id: fieldId, type: 'Text', label: 'Field'}],
        titleFieldIndex: 0,
        titleFieldId: fieldId,
        machines: [],
      }),
    );
  };

  const renderListEmptyComponent = () => (
    <EmptyListComponent text="No Categories to display" />
  );

  const keyExtractor = useCallback(
    ({id}: MachineCategory, index: number) => id,
    [],
  );

  const renderItem = ({item, index}: ListRenderItemInfo<MachineCategory>) => {
    return (
      <View style={styles.listItemStyle} key={`${item.id}_${item.category}`}>
        <CategoryFormItem index={index} machineCategory={item} />
      </View>
    );
  };

  return (
    <View style={styles.containerStyle}>
      <FlatList
        keyExtractor={keyExtractor}
        data={machineState.machinesCategories}
        numColumns={(isTablet || isiPad) ? 2 : 1}
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
