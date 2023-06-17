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
import React from 'react';
import {Attribute, MachineState} from '../store/reducers/machines';
import AttributeItem from './AttributeItem';

interface CategoryFormItemProps {
  machine: MachineState;
}

function CategoryFormItem({machine}: CategoryFormItemProps): JSX.Element {
  const {id, category, fields} = machine;
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
          <Input variant="outline" placeholder="Outline" value={category} />
          {fields.map((item: Attribute) => (
            <AttributeItem
              key={`${item.id}_${item.label}`}
              attribute={item}
              onChangeText={text => console.log(text)}
            />
          ))}
          <Menu
            shouldOverlapWithTrigger={false}
            trigger={triggerProps => {
              return (
                <Button size="xs" variant="solid" {...triggerProps}>
                  {`TITLE FIELD: ${fields[0].label}`}
                </Button>
              );
            }}>
            {fields.map((item: Attribute) => (
              <Menu.Item key={`${item.id}_${item.label}`}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
          <HStack>
            <Menu
              shouldOverlapWithTrigger={false}
              trigger={triggerProps => {
                return (
                  <Button
                    alignSelf="center"
                    variant="ghost"
                    {...triggerProps}>
                    ADD NEW FIELD
                  </Button>
                );
              }}>
              <Menu.Item>Text</Menu.Item>
              <Menu.Item>Number</Menu.Item>
              <Menu.Item>Checkbox</Menu.Item>
              <Menu.Item>Date</Menu.Item>
            </Menu>
            <Button leftIcon={<DeleteIcon />} size="sm" variant="ghost">
              REMOVE
            </Button>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
}

export default CategoryFormItem;
