import React, {memo, useCallback, useMemo} from 'react';
import AttributeItem from './AttributeItem';
import {Attribute, MachineCategory, MachineState} from '../types';
import {fieldTypes} from '../constants/fieldTypes';
import {RootState, useAppDispatch, useAppSelector} from '../store/store';
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
import { getTitleFieldSelector } from '../store/selectors/getTitleFieldSelector';

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
  const titleField = useAppSelector((state: RootState) => getTitleFieldSelector(state)(id, titleFieldId))

  const dispatch = useAppDispatch();

  const handledAddNewCategoryField = useCallback(
    (type: 'Text' | 'Number' | 'Date' | 'Checkbox') => {
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
        dispatch(addNewAttribute({categoryId: id, attributeKey: 'Field', attributeValue: initializeValue(type)}))
    },
    [dispatch, id, initializeValue],
  );

  const handleDeleteCategoryField = useCallback(
    (fieldId: string, attributeKey: string) => {
      dispatch(deleteCategoryField({categoryId: id, fieldId}));
      dispatch(deleteAttribute({categoryId: id, attributeKey}))
    },
    [dispatch, id],
  );

  const handleDeleteCategory = useCallback(() => {
    dispatch(deleteCategory(index));
    dispatch(deleteCategoryMachines(id))
  }, [dispatch, index, id]);

  const handleUpdateCetgoryFieldType = useCallback(
    (type: 'Text' | 'Number' | 'Date' | 'Checkbox', fieldId: string, attributeKey: string) => {
        dispatch(updateCategoryField({fieldId, categoryId: id, type}));
        dispatch(updateMachinesField({categoryId: id, attributeKey, attributeValue: initializeValue(type)}))
    },
    [dispatch, id, initializeValue],
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
      dispatch(updateMachinesField({categoryId: id, attributeKey: text, oldAttributeKey: oldLabel, attributeValue: null}))
    },
    [id],
  );

  const handleChangeTitleField = useCallback(
    (type: string, fieldId?: string) => {
      if(fieldId){
        dispatch(updateTitleField({index, fieldId}));
      }
    },
    [dispatch, index],
  );

  const renderItem = useCallback(({item: { id }}: ListRenderItemInfo<Attribute>) => {
      return (
        <AttributeItem
          attributeId={id}
          categoryId={machineCategory.id}
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
              buttonText={`TITLE FIELD: ${titleField?.label}`}
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
