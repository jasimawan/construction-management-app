import {DeleteIcon, HStack} from 'native-base';
import React, { memo, useCallback, useRef } from 'react';
import {Attribute} from '../types';
import {fieldTypes} from '../constants/fieldTypes';
import partial from 'lodash/partial';
import { useMolecules, useToggle } from '@bambooapp/bamboo-molecules';
import { StyleSheet } from 'react-native';
import CustomMenu from './Menu';

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
  const { TextInput, View, Button, IconButton } = useMolecules()
  const {id, type, label} = attribute;

  const hanleUpdateAttributeType = useCallback((type: string | Number) => {
    onUpdateAttributeType(`${type}`, index, id)
  },[onUpdateAttributeType, index]);

  const handleChangeText = (text: string) => {
    onChangeText(text, index, id)
  }

  return (
    <HStack marginTop={3} alignItems="center">
      <View style={styles.inputView}>
        <TextInput
          variant="outlined"
          placeholder="Field"
          value={label !== "Field" ? label : ""}
          onChangeText={handleChangeText}
          label="Field"
        />
      </View>
      <CustomMenu 
        buttonText={type} 
        containerStyle={styles.menuView} 
        items={fieldTypes} 
        onMenuItemPress={hanleUpdateAttributeType}
      />
      <IconButton
        onPress={partial(onDeleteAttribute, index, id)}
        // colorScheme="red"
        // variant="ghost"
        // icon={<DeleteIcon />}
        name="icon-bitbucket"
        type="zocial"
      />
    </HStack>
  );
})

const styles = StyleSheet.create({
  inputView: {
    width: '60%',
    marginRight: 5
  },
  menuView: {
    width: '31%'
  }
})

export default AttributeItem;
