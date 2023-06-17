import {
  Box,
  Button,
  Checkbox,
  DeleteIcon,
  Heading,
  Input,
  Stack,
} from 'native-base';
import React, {useCallback, useState} from 'react';
import {Machine, MachineAttributeData} from '../types';
import DatePicker from 'react-native-date-picker';
import {View} from 'react-native';
import {useAppDispatch} from '../store/store';
import {
  removeMachine,
  updateMachineAttributeValue,
} from '../store/reducers/machines';

interface MachineFormItemProps {
  index: number;
  machine: Machine;
  titleFieldId?: string;
}

function MachineFormItem({
  index,
  machine,
  titleFieldId,
}: MachineFormItemProps): JSX.Element {
  const {attributes, categoryIndex} = machine;
  const [open, setOpen] = useState(false);
  const [attributeLocalIndex, setAttriubteLocalIndex] = useState<number>();
  const dispatch = useAppDispatch();
  const titleAttribute = attributes.find(item => item.fieldId === titleFieldId);

  const handleRemoveMachine = useCallback(() => {
    dispatch(removeMachine({categoryIndex, machineIndex: index}));
  }, [dispatch, index, categoryIndex]);

  const hanldeUpdateAttributeValue = useCallback(
    (text: string | boolean | Date, attributeIndex: number) => {
      dispatch(
        updateMachineAttributeValue({
          categoryIndex,
          machineIndex: index,
          attributeIndex,
          text,
        }),
      );
    },
    [dispatch, categoryIndex, index],
  );

  const getAttributeField = (
    attribute: MachineAttributeData,
    index: number,
  ) => {
    switch (attribute.type) {
      case 'Text':
        return (
          <Input
            width="100%"
            variant="outline"
            placeholder={attribute.label}
            value={`${attribute.value ? attribute.value : ''}`}
            onChangeText={text => hanldeUpdateAttributeValue(text, index)}
          />
        );
      case 'Number':
        return (
          <Input
            width="100%"
            variant="outline"
            placeholder={attribute.label}
            value={`${attribute.value ? attribute.value : ''}`}
            keyboardType="number-pad"
            onChangeText={text => hanldeUpdateAttributeValue(text, index)}
          />
        );
      case 'Checkbox':
        return (
          <Checkbox
            onChange={(isSelected: boolean) =>
              hanldeUpdateAttributeValue(isSelected, index)
            }
            value={attribute.label}>
            {attribute.label}
          </Checkbox>
        );
      case 'Date':
        return (
          <Button
            colorScheme="light"
            onPress={() => {
              setAttriubteLocalIndex(index);
              setOpen(true);
            }}
            size="sm"
            variant="outline">
            {attribute.value
              ? attribute.value.toLocaleString().split(',')[0]
              : attribute.label}
          </Button>
        );
    }
  };
  return (
    <>
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
              {titleAttribute?.value?.toString()}
            </Heading>
            {attributes.map((attribute: MachineAttributeData, index) => {
              return (
                <View key={`${attribute.id}_${attribute.label}`}>
                  {getAttributeField(attribute, index)}
                </View>
              );
            })}
            <Button
              colorScheme="danger"
              onPress={handleRemoveMachine}
              leftIcon={<DeleteIcon />}
              size="sm"
              variant="solid">
              REMOVE
            </Button>
          </Stack>
        </Box>
      </Box>
      <DatePicker
        modal
        mode='date'
        open={open}
        date={new Date()}
        onConfirm={date => {
          setOpen(false);
          hanldeUpdateAttributeValue(date, attributeLocalIndex || 0);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
}

export default MachineFormItem;