import {
  Box,
  FlatList,
  HStack,
  Heading,
  Stack,
} from 'native-base';
import React, {memo, useCallback, useMemo} from 'react';
import AttributeItem from './AttributeItem';
import {Attribute, MachineCategory} from '../types';
import {fieldTypes} from '../constants/fieldTypes';
import {useAppDispatch} from '../store/store';
import {
  addNewCategoryField,
  deleteCategoryField,
  updateCategoryField,
  deleteCategory,
  updateCategory,
  updateTitleField,
} from '../store/reducers/machines';
import shortid from 'shortid';
import { ListRenderItemInfo, StyleSheet } from 'react-native';
import { useMolecules } from '@bambooapp/bamboo-molecules'
import CustomMenu from './Menu';
import isUndefined from 'lodash/isUndefined';

interface CategoryFormItemProps {
  machineCategory: MachineCategory;
  index: number;
}

const CategoryFormItem = memo(({
  machineCategory,
  index,
}: CategoryFormItemProps) => {
  const { TextInput, Button } = useMolecules()
  const {category, fields, titleFieldIndex} = machineCategory;

  const dispatch = useAppDispatch();

  const handledAddNewCategoryField = useCallback(
    (type: string | number) => {
      if (
        type === 'Text' ||
        type === 'Number' ||
        type === 'Checkbox' ||
        type === 'Date'
      ) {
        dispatch(
          addNewCategoryField({
            id: shortid.generate(),
            label: 'Field',
            type,
            machineIndex: index,
          }),
        );
      }
    },
    [dispatch, index],
  );

  const handleDeleteCategoryField = useCallback(
    (fieldIndex: number, fieldId: string) => {
      dispatch(deleteCategoryField({index, fieldIndex, fieldId}));
    },
    [dispatch, index],
  );

  const handleDeleteCategory = useCallback(() => {
    dispatch(deleteCategory(index));
  }, [dispatch, index]);

  const handleUpdateCetgoryFieldType = useCallback(
    (type: string, fieldIndex: number, fieldId: string) => {
      if (
        type === 'Text' ||
        type === 'Number' ||
        type === 'Checkbox' ||
        type === 'Date'
      ) {
        dispatch(updateCategoryField({index, fieldIndex, type, fieldId}));
      }
    },
    [dispatch, index],
  );

  const handleChangeCategory = useCallback(
    (text: string) => {
      dispatch(updateCategory({index, value: text}));
    },
    [index],
  );

  const handleChangeCategoryField = useCallback(
    (text: string, fieldIndex: number, fieldId: string) => {
      dispatch(updateCategoryField({index, fieldIndex, label: text, fieldId}));
    },
    [index],
  );

  const handleChangeTitleField = useCallback(
    (fieldIndex: string | number, fieldId?: string) => {
      if(typeof fieldIndex === "number" && !isUndefined(fieldId)){
        dispatch(updateTitleField({index, fieldIndex, fieldId}));
      }
    },
    [dispatch, index],
  );

  const renderItem = useMemo(() => ({item, index}: ListRenderItemInfo<Attribute>) => {
      return (
        <AttributeItem
          index={index}
          attribute={item}
          onChangeText={handleChangeCategoryField}
          onDeleteAttribute={handleDeleteCategoryField}
          onUpdateAttributeType={handleUpdateCetgoryFieldType}
        />
      );
    },[handleChangeCategoryField, handleDeleteCategoryField, handleUpdateCetgoryFieldType])

  return (
    <Box marginX={4}>
      <Box
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        backgroundColor="white"
        marginTop={4}>
        <Stack p="4" space={3}>
          <Heading size="md" ml="-1">
            {category}
          </Heading>
          <TextInput
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
          <CustomMenu 
            buttonText={`TITLE FIELD: ${fields[titleFieldIndex || 0].label}`} 
            containerStyle={styles.menuView} 
            items={fields}
            onMenuItemPress={handleChangeTitleField}
          />
          <HStack>
            <CustomMenu 
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
          </HStack>
        </Stack>
    </Box>
  </Box>
  );
})

const styles = StyleSheet.create({
  menuView: {
    flex: 1
  },
  addMenuView: {
    width: '50%',
    marginRight: 10
  }
})

export default CategoryFormItem;
