import {
  Box,
  Button,
  DeleteIcon,
  HStack,
  Heading,
  Input,
  Menu,
  Stack,
} from 'native-base';
import React, { useCallback, useState } from 'react';
import AttributeItem from './AttributeItem';
import partial from 'lodash/partial';
import {Attribute, Machine} from '../types';
import {fieldTypes} from '../constants/fieldTypes';
import { useAppDispatch } from '../store/store';
import { addNewMachineAttribute, deleteMachineAttribute, updateMachineAttribute, deleteMachine, updateMachineCategory, updateMachineTitleField } from '../store/reducers/machines';
import shortid from 'shortid';

interface CategoryFormItemProps {
  machine: Machine;
  index: number;
}

function CategoryFormItem({
  machine,
  index
}: CategoryFormItemProps): JSX.Element {
  const {id, category, fields, titleFieldIndex} = machine;
  const [categoryText, setCategoryText] = useState(category)
  const dispatch = useAppDispatch()

  const handledAddNewAttribute = useCallback((type: string) => {
    if(type === "Text" || type === "Number" ||type === "Checkbox" ||type === "Date"){
        dispatch(addNewMachineAttribute({id: shortid.generate(), label: 'Field', value: '', type, machineIndex: index}))
    }
  },[dispatch, index]);

  const handleDeleteAttribute = useCallback((fieldIndex: number) => {
    dispatch(deleteMachineAttribute({index, fieldIndex})) 
  },[dispatch, index])

  const handleDeleteMachine = useCallback(() => {
    dispatch(deleteMachine(index))
  },[dispatch, index])

  const handleUpdateAttributeType = useCallback((type: string, fieldIndex: number) => {
    if(type === "Text" || type === "Number" ||type === "Checkbox" || type === "Date"){
        dispatch(updateMachineAttribute({index, fieldIndex, type}))
    }
  },[dispatch, index])

  const handleChangeCategory = (text: string) => {
    setCategoryText(text)
  }

  const handleUpdateStoreCategory = useCallback(() => {
    if(category !== categoryText){
        dispatch(updateMachineCategory({index, value: categoryText}))
    }
  },[dispatch, index, categoryText, category])

  const handleChangeAttributeLabel = (text: string, fieldIndex: number) => {
    dispatch(updateMachineAttribute({index, fieldIndex, label: text}))
  }

  const handleChangeTitleField = useCallback((fieldIndex: number) => {
    dispatch(updateMachineTitleField({index, fieldIndex}))
  },[dispatch, index])
 
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
            {categoryText}
          </Heading>
          <Input onBlur={handleUpdateStoreCategory} variant="outline" placeholder="Category" value={categoryText} onChangeText={handleChangeCategory}/>
          {fields.map((item: Attribute, index) => (
            <AttributeItem
              key={`${item.id}_${item.label}`}
              index={index}
              attribute={item}
              onChangeText={handleChangeAttributeLabel}
              onDeleteAttribute={handleDeleteAttribute}
              onUpdateAttributeType={handleUpdateAttributeType}
            />
          ))}
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
              <Menu.Item onPress={partial(handleChangeTitleField, index)} key={`${item.id}_${item.label}`}>
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
                  onPress={partial(handledAddNewAttribute, item)}>
                  {item}
                </Menu.Item>
              ))}
            </Menu>
            <Button
              onPress={partial(handleDeleteMachine, id)}
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
}

export default CategoryFormItem;
