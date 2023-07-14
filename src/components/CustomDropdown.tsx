import {useMolecules, useToggle} from '@bambooapp/bamboo-molecules';
import {Attribute} from '../types';
import {ListRenderItemInfo, StyleSheet, ViewStyle} from 'react-native';
import {useCallback, useMemo, useRef} from 'react';

interface CustomMenuProps {
  items: Attribute[];
  containerStyle: ViewStyle;
  buttonText: string;
  onMenuItemPress: (type: string, fieldId?: string) => void;
}

const CustomDropdown = ({
  items,
  containerStyle,
  buttonText,
  onMenuItemPress,
}: CustomMenuProps) => {
  const {Button, View, DropdownList, ListItem} = useMolecules();
  const {state: isOpen, onToggle, setState: setIsOpen} = useToggle();
  const triggerRef = useRef(null);

  const dropDownlist = useMemo(
    () => [
      {
        data: items || [],
      },
    ],
    [items],
  );

  const renderDropDownItem = useCallback(
    ({item}: ListRenderItemInfo<Attribute>) => {
      const handleListItemClick = useMemo(() => () => {
        onMenuItemPress(item.type, item.id);
        onToggle()
      }, [onMenuItemPress, onToggle]);

      return (
        <ListItem hoverable onPress={handleListItemClick}>
          <ListItem.Title>{item.label}</ListItem.Title>
        </ListItem>
      );
    },
    [ListItem, onMenuItemPress],
  );

  return (
    <>
      <View style={containerStyle}>
        <Button
          variant="outlined"
          size="sm"
          ref={triggerRef}
          onPress={onToggle}>
          {buttonText.toUpperCase()}
        </Button>
      </View>
      <DropdownList
        style={styles.dropdownStyle}
        records={dropDownlist}
        searchable={false}
        triggerRef={triggerRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        renderItem={renderDropDownItem}
      />
    </>
  );
};

const styles = StyleSheet.create({
  dropdownStyle: {
    width: 200,
  },
});

export default CustomDropdown;
