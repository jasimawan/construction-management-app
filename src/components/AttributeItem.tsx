import React, {memo, useCallback} from 'react';
import {Attribute} from '../types';
import {fieldTypes} from '../constants/fieldTypes';
import {useMolecules} from '@bambooapp/bamboo-molecules';
import {StyleSheet} from 'react-native';
import CustomMenu from './CustomDropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RootState, useAppSelector } from '../store/store';
import { getFieldByIdSelector } from '../store/selectors/attributeSelector';

interface AttributeItemProps {
  attributeId: string;
  categoryId: string;
  onChangeText: (text: string, fieldId: string, oldLabel: string) => void;
  onDeleteAttribute: (fieldId: string, attributeKey: string) => void;
  onUpdateAttributeType: (
    type: 'Text' | 'Number' | 'Date' | 'Checkbox',
    fieldId: string,
    attributeKey: string,
  ) => void;
}

const AttributeItem = memo(
  ({
    attributeId,
    categoryId,
    onChangeText,
    onDeleteAttribute,
    onUpdateAttributeType,
  }: AttributeItemProps) => {
    const attribute = useAppSelector((state: RootState) => getFieldByIdSelector(state)(categoryId, attributeId) as Attribute);
    const {TextInput, View} = useMolecules();
    const {id, type, label} = attribute;

    const hanleUpdateAttributeType = useCallback(
      (type: 'Text' | 'Number' | 'Date' | 'Checkbox') => {
        onUpdateAttributeType(type, id, `${label}_${id}`);
      },
      [onUpdateAttributeType, label, id],
    );

    const handleChangeText = useCallback(
      (text: string) => {
        onChangeText(text, id, `${label}_${id}`);
      },
      [onChangeText, id, label],
    );

    const handleOnDeleteAttribute = useCallback(() => {
      onDeleteAttribute(id, `${label}_${id}`);
    }, [onDeleteAttribute, id, label]);

    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            variant="outlined"
            placeholder="Field"
            value={label !== 'Field' ? label : ''}
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
        <Icon
          style={styles.button}
          name="trash"
          color="red"
          size={24}
          onPress={handleOnDeleteAttribute}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  inputView: {
    flex: 1,
    marginRight: 5,
  },
  menuView: {
    flex: 0
  },
  button: {
    marginLeft: 5
  }
});

export default AttributeItem;
