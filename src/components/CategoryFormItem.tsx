import React, {memo, useCallback, useMemo} from 'react';
import AttributeItem from './AttributeItem';
import {Attribute, MachineCategory, MachineState} from '../types';
import {fieldTypes} from '../constants/fieldTypes';
import {useAppDispatch, useAppSelector} from '../store/store';
import {
  addNewCategoryField,
  deleteCategoryField,
  updateCategoryField,
  deleteCategory,
  updateCategory,
  updateTitleField,
  initializeValue
} from '../store/reducers/categories';
import shortid from 'shortid';
import { ListRenderItemInfo, PixelRatio, StyleSheet } from 'react-native';
import { useMolecules } from '@bambooapp/bamboo-molecules'
import CustomDropdown from './CustomDropdown';
import { updateMachinesField, deleteAttribute, addNewAttribute, deleteCategoryMachines } from '../store/reducers/machines';

interface CategoryFormItemProps {
  machineCategory: MachineCategory;
  index: number;
}

const CategoryFormItem = memo(({
  machineCategory,
  index,
}: CategoryFormItemProps) => {
  const { TextInput, Button, FlatList, View, Text } = useMolecules()
  const { id ,category, fields, titleFieldId } = machineCategory;
  const machineState: MachineState = useAppSelector(state => state.machines);

  const titleField: string | undefined = useMemo(() => {
    return fields.find(item => item.id === titleFieldId)?.label
  }, [titleFieldId, fields])

  const dispatch = useAppDispatch();

  const handledAddNewCategoryField = useCallback(
    (type: string) => {
      if (
        type === 'Text' ||
        type === 'Number' ||
        type === 'Checkbox' ||
        type === 'Date'
      ) {
        dispatch(
          addNewCategoryField({
            categoryId: id,
            attribute: {
              id: shortid.generate(),
              label: 'Field',
              value: initializeValue(type),
              type
            }
          }),
        );
        if(machineState.machines.filter(item => item.categoryId === id).length > 0){
          dispatch(addNewAttribute({categoryId: id, attributeKey: 'Field', attributeValue: initializeValue(type)}))
        }
      }
    },
    [dispatch, id, machineState, initializeValue],
  );

  const handleDeleteCategoryField = useCallback(
    (fieldId: string, attributeKey: string) => {
      dispatch(deleteCategoryField({categoryId: id, fieldId}));
      if(machineState.machines.filter(item => item.categoryId === id).length > 0){
        dispatch(deleteAttribute({categoryId: id, attributeKey}))
      }
    },
    [dispatch, id, machineState],
  );

  const handleDeleteCategory = useCallback(() => {
    dispatch(deleteCategory(index));
    if(machineState.machines.filter(item => item.categoryId === id).length > 0){
      dispatch(deleteCategoryMachines(id))
    }
  }, [dispatch, index, machineState, id]);

  const handleUpdateCetgoryFieldType = useCallback(
    (type: string, fieldId: string, attributeKey: string) => {
      if (
        type === 'Text' ||
        type === 'Number' ||
        type === 'Checkbox' ||
        type === 'Date'
      ) {
        dispatch(updateCategoryField({fieldId, categoryId: id, type}));
        if(machineState.machines.filter(item => item.categoryId === id).length > 0){
          dispatch(updateMachinesField({categoryId: id, attributeKey, attributeValue: initializeValue(type)}))
        }
      }
    },
    [dispatch, id, machineState, initializeValue],
  );

  const handleChangeCategory = useCallback(
    (text: string) => {
      dispatch(updateCategory({index, value: text}));
    },
    [index],
  );

  const handleChangeCategoryField = useCallback(
    (text: string, fieldId: string, oldLabel: string) => {
      dispatch(updateCategoryField({fieldId, categoryId: id, label: text}));
      if(machineState.machines.filter(item => item.categoryId === id).length > 0){
        dispatch(updateMachinesField({categoryId: id, attributeKey: text, oldAttributeKey: oldLabel, attributeValue: null}))
      }
    },
    [id, machineState],
  );

  const handleChangeTitleField = useCallback(
    (type: string, fieldId?: string) => {
      if(fieldId){
        dispatch(updateTitleField({index, fieldId}));
      }
    },
    [dispatch, index],
  );

  const renderItem = useMemo(() => ({item}: ListRenderItemInfo<Attribute>) => {
      return (
        <AttributeItem
          attribute={item}
          onChangeText={handleChangeCategoryField}
          onDeleteAttribute={handleDeleteCategoryField}
          onUpdateAttributeType={handleUpdateCetgoryFieldType}
        />
      );
    },[handleChangeCategoryField, handleDeleteCategoryField, handleUpdateCetgoryFieldType])
  
  return (
      <View style={styles.containerStyle}>
        <View>
          <Text style={styles.headingStyle}>  
            {category}
          </Text>
          <TextInput
            style={styles.categoryInputStyle}
            autoFocus
            variant="outlined"
            placeholder="Enter Category"
            label="Category"
            value={category}
            onChangeText={handleChangeCategory}
          />
          <FlatList 
            keyExtractor={(item: Attribute) => item.id}
            data={fields}
            renderItem={renderItem}
          />
          <CustomDropdown
              buttonText={`TITLE FIELD: ${titleField}`}
              containerStyle={styles.menuView} 
              items={fields}
              onMenuItemPress={handleChangeTitleField}
            />
          <View style={styles.lastChildStyle}>
            <CustomDropdown
              buttonText='ADD NEW FIELD'
              containerStyle={styles.addMenuView} 
              items={fieldTypes}
              onMenuItemPress={handledAddNewCategoryField}
            />
            <Button
              onPress={handleDeleteCategory}
              size="sm"
              variant="contained-tonal">
              REMOVE
            </Button>
          </View>
        </View>
    </View>
  );
})

const styles = StyleSheet.create({
  containerStyle: {
    overflow: 'hidden',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 14,
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 20
  },
  categoryInputStyle: {
    marginTop: 14
  },
  headingStyle: {
    fontWeight: 'bold',
    fontSize: 20 / PixelRatio.getFontScale(),
  },
  menuView: {
    flex: 1,
    marginVertical: 14
  },
  addMenuView: {
    width: '50%',
    marginRight: 10
  },
  lastChildStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default CategoryFormItem;
