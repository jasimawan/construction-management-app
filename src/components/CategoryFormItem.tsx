import {
  Box,
  Button,
  DeleteIcon,
  FlatList,
  HStack,
  Heading,
  Input,
  Menu,
  Stack,
} from 'native-base';
import React, {memo, useCallback, useMemo} from 'react';
import AttributeItem from './AttributeItem';
import partial from 'lodash/partial';
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
import { ListRenderItemInfo } from 'react-native';

interface CategoryFormItemProps {
  machineCategory: MachineCategory;
  index: number;
}

const CategoryFormItem = memo(({
  machineCategory,
  index,
}: CategoryFormItemProps) => {
  const {category, fields, titleFieldIndex} = machineCategory;

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
    (fieldIndex: number, fieldId: string) => {
      dispatch(updateTitleField({index, fieldIndex, fieldId}));
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
          <Input
            autoFocus
            variant="outline"
            placeholder="Category"
            value={category}
            onChangeText={handleChangeCategory}
          />
          <FlatList 
            keyExtractor={(item: Attribute) => item.id}
            data={fields}
            renderItem={renderItem}
          />
          <Menu
            shouldOverlapWithTrigger={false}
            trigger={triggerProps => {
              return (
                <Button size="xs" variant="solid" {...triggerProps}>
                  {`TITLE FIELD: ${fields[titleFieldIndex || 0].label}`}
                </Button>
              );
            }}>
            {fields.map((item: Attribute, index) => (
              <Menu.Item
                onPress={partial(handleChangeTitleField, index, item.id)}
                key={`${item.id}_${item.label}`}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
          <HStack>
            <Menu
              shouldOverlapWithTrigger={false}
              trigger={triggerProps => {
                return (
                  <Button alignSelf="center" variant="ghost" {...triggerProps}>
                    ADD NEW FIELD
                  </Button>
                );
              }}>
              {fieldTypes.map(item => (
                <Menu.Item
                  key={item}
                  onPress={partial(handledAddNewCategoryField, item)}>
                  {item.toUpperCase()}
                </Menu.Item>
              ))}
            </Menu>
            <Button
              onPress={handleDeleteCategory}
              leftIcon={<DeleteIcon />}
              size="sm"
              variant="ghost">
              REMOVE
            </Button>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
})

export default CategoryFormItem;
