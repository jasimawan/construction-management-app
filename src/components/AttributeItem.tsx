import {Box, Button, DeleteIcon, HStack, IconButton, Input, Menu} from 'native-base';
import React from 'react';
import {Attribute} from '../store/reducers/machines';

interface AttributeItemProps {
  attribute: Attribute;
  onChangeText: (text: string) => void;
}

function AttributeItem({attribute, onChangeText}: AttributeItemProps): JSX.Element {
  const {type, value, label} = attribute;

  //   const getAttribute = () => {
  //     switch(type){
  //         case 'string':
  //             return <Input variant="outline" placeholder={label}/>
  //         case 'boolean':
  //             return <Checkbox value="test" accessibilityLabel={label} />
  //     }
  //   }

  return (
    <HStack>
      <Input
        variant="outline"
        placeholder={label}
        onChangeText={onChangeText}
        width="75%"
      />
      <Menu
        shouldOverlapWithTrigger={false}
        trigger={triggerProps => {
          return (
            <Button alignSelf="center" variant="ghost" {...triggerProps}>
              {type}
            </Button>
          );
        }}>
        <Menu.Item>Text</Menu.Item>
        <Menu.Item>Number</Menu.Item>
        <Menu.Item>Checkbox</Menu.Item>
        <Menu.Item>Date</Menu.Item>
      </Menu>
      <IconButton colorScheme="red" variant="ghost" icon={<DeleteIcon/>} />
    </HStack>
  );
}

export default AttributeItem
