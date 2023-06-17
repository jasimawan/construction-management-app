import {Button, DeleteIcon, HStack, IconButton, Input, Menu} from 'native-base';
import React, { memo, useCallback, useState } from 'react';
import {Attribute} from '../types';
import {fieldTypes} from '../constants/fieldTypes';
import partial from 'lodash/partial';

interface AttributeItemProps {
  index: number;
  attribute: Attribute;
  onChangeText: (text: string, fieldIndex: number, fieldId: string) => void;
  onDeleteAttribute: (fieldIndex: number, fieldId: string) => void;
  onUpdateAttributeType: (type: string, index: number, fieldId: string) => void
}

const AttributeItem = memo(({
  index,
  attribute,
  onChangeText,
  onDeleteAttribute,
  onUpdateAttributeType,
}: AttributeItemProps) =>  {
  const {id, type, label} = attribute;

  const hanleUpdateAttributeType = useCallback((type: string) => {
    onUpdateAttributeType(type, index, id)
  },[onUpdateAttributeType, index]);

  const handleChangeText = (text: string) => {
    onChangeText(text, index, id)
  }

  return (
    <HStack>
      <Input
        variant="outline"
        placeholder="Field"
        value={label !== "Field" ? label : ""}
        onChangeText={handleChangeText}
        width="60%"
      />
      <Menu
        shouldOverlapWithTrigger={false}
        trigger={triggerProps => {
          return (
            <Button width='32%' alignSelf="center" variant="outline" {...triggerProps}>
              {type.toUpperCase()}
            </Button>
          );
        }}>
        {fieldTypes.map(item => (
          <Menu.Item key={item} onPress={partial(hanleUpdateAttributeType, item)}>
            {item.toUpperCase()}
          </Menu.Item>
        ))}
      </Menu>
      <IconButton
        onPress={partial(onDeleteAttribute, index, id)}
        colorScheme="red"
        variant="ghost"
        icon={<DeleteIcon />}
      />
    </HStack>
  );
})

export default AttributeItem;
