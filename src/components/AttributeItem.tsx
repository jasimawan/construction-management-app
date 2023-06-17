import {Button, DeleteIcon, HStack, IconButton, Input, Menu} from 'native-base';
import React, { useCallback, useState } from 'react';
import {Attribute} from '../types';
import {fieldTypes} from '../constants/fieldTypes';
import partial from 'lodash/partial';

interface AttributeItemProps {
  index: number;
  attribute: Attribute;
  onChangeText: (text: string, fieldIndex: number) => void;
  onDeleteAttribute: (fieldIndex: number) => void;
  onUpdateAttributeType: (type: string, index: number) => void
}

function AttributeItem({
  index,
  attribute,
  onChangeText,
  onDeleteAttribute,
  onUpdateAttributeType,
}: AttributeItemProps): JSX.Element {
  const {type, label} = attribute;
  const [text, setText] = useState(label)

  //   const getAttribute = () => {
  //     switch(type){
  //         case 'string':
  //             return <Input variant="outline" placeholder={label}/>
  //         case 'boolean':
  //             return <Checkbox value="test" accessibilityLabel={label} />
  //     }
  //   }

  const hanleUpdateAttributeType = useCallback((type: string) => {
    onUpdateAttributeType(type, index)
  },[onUpdateAttributeType, index]);

  const handleChangeText = (text: string) => {
    setText(text)
  }

  const handleUpdateStoreAttribute = useCallback(() => {
    onChangeText(text, index)
  },[text, index])

  return (
    <HStack>
      <Input
        variant="outline"
        placeholder={text}
        value={text !== "Field" ? text : ""}
        onChangeText={handleChangeText}
        width="68%"
        onBlur={handleUpdateStoreAttribute}
      />
      <Menu
        shouldOverlapWithTrigger={false}
        trigger={triggerProps => {
          return (
            <Button width='25%' alignSelf="center" variant="outline" {...triggerProps}>
              {type}
            </Button>
          );
        }}>
        {fieldTypes.map(item => (
          <Menu.Item key={item} onPress={partial(hanleUpdateAttributeType, item)}>
            {item}
          </Menu.Item>
        ))}
      </Menu>
      <IconButton
        onPress={partial(onDeleteAttribute, index)}
        colorScheme="red"
        variant="ghost"
        icon={<DeleteIcon />}
      />
    </HStack>
  );
}

export default AttributeItem;
