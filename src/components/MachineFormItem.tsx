import React, {useCallback, useMemo, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {useAppDispatch} from '../store/store';
import {
  removeMachine,
  updateMachineAttributeValue,
} from '../store/reducers/machines';
import { useMolecules } from '@bambooapp/bamboo-molecules';
import { Machine, MachineCategory } from '../types';
import { PixelRatio, StyleSheet } from 'react-native';

interface MachineFormItemProps {
  index: number;
  machine: Machine;
  machineCategory: MachineCategory;
}

const MachineFormItem = ({
  index,
  machine,
  machineCategory
}: MachineFormItemProps): JSX.Element => {
  const {View, TextInput, Button, Text, Checkbox} = useMolecules()
  const {attributes} = machine;
  const [open, setOpen] = useState(false);
  const [attributeKeyLocal, setAttriubteKeyLocal] = useState<string>();
  const dispatch = useAppDispatch();

  const titleAttribute = useMemo(() => {
    const titleField = machineCategory.fields.find(item => item.id = machineCategory.titleFieldId)
    if(titleField){
      return attributes[`${titleField.label}_${titleField.id}`]
    }
    return ''
  }, [machineCategory, attributes])

  const handleRemoveMachine = useCallback(() => {
    dispatch(removeMachine({machineIndex: index}));
  }, [dispatch, index]);

  const hanldeUpdateAttributeValue = useCallback(
    (text: string | boolean | Date, attributeKey: string) => {
      dispatch(
        updateMachineAttributeValue({
          machineIndex: index,
          attributeKey,
          text,
        }),
      );
    },
    [dispatch, index],
  );

  const getAttributeField = (
    attribute: string | boolean | number | Date | undefined,
    attributeKey: string,
  ) => {
    const key = attributeKey.split('_')[0]
    switch (typeof attribute) {
      case 'string':
        return (
          <TextInput
            variant='outlined'
            label={key}
            placeholder={key}
            value={`${attribute ? attribute : ''}`}
            onChangeText={text => hanldeUpdateAttributeValue(text, attributeKey)}
          />
        );
      case 'number':
        return (
          <TextInput
            variant='outlined'
            label={key}
            placeholder={key}
            value={`${attribute ? attribute : ''}`}
            keyboardType="number-pad"
            onChangeText={text => hanldeUpdateAttributeValue(text, attributeKey)}
          />
        );
      case 'boolean':
        return (
          <Checkbox.Item
            onChange={(isSelected: boolean) =>
              hanldeUpdateAttributeValue(isSelected, attributeKey)
            }
            label={key}
            defaultValue={attribute} />
        );
      default:
        return (
          <Button
            onPress={() => {
              setAttriubteKeyLocal(attributeKey);
              setOpen(true);
            }}
            size="sm"
            variant="outlined">
            {attribute
              ? attribute.toLocaleString().split(',')[0]
              : key}
          </Button>
        );
    }
  };
  return (
    <>
      <View>
        <View
          style={styles.containerStyle}>
            <Text style={styles.headingStyle}>
              {`${titleAttribute !== undefined ?  titleAttribute : ''}`}
            </Text>
            {Object.keys(attributes).map((attributeKey: string) => {
              return (
                <View style={styles.attributeStyle} key={attributeKey}>
                  {getAttributeField(attributes[attributeKey], attributeKey)}
                </View>
              );
            })}
            <Button
              style={styles.buttonStyle}
              onPress={handleRemoveMachine}
              size="sm"
              variant="contained-tonal">
              REMOVE
            </Button>
          </View>
      </View>
      <DatePicker
        modal
        mode='date'
        open={open}
        date={new Date()}
        onConfirm={date => {
          setOpen(false);
          hanldeUpdateAttributeValue(date, attributeKeyLocal || '');
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
}

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
  headingStyle: {
    fontWeight: 'bold',
    fontSize: 20 / PixelRatio.getFontScale(),
  },
  attributeStyle: {
    marginTop: 16
  },
  buttonStyle: {
    marginTop: 24
  }
})

export default MachineFormItem;
