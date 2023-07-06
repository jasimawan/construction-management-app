import {useMolecules, useToggle} from '@bambooapp/bamboo-molecules';
import {Attribute} from '../types';
import {ViewStyle} from 'react-native';
import {useRef} from 'react';

interface CustomMenuProps {
  items: Attribute[] | string[];
  containerStyle: ViewStyle;
  buttonText: string;
  onMenuItemPress: (
    item: string | number,
    fieldId?: string,
  ) => void;
}

const CustomMenu = ({
  items,
  containerStyle,
  buttonText,
  onMenuItemPress,
}: CustomMenuProps) => {
  const {Button, Menu, View} = useMolecules();
  const {state: isOpen, handleClose, onToggle} = useToggle();
  const triggerRef = useRef(null);

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
      <Menu isOpen={isOpen} onClose={handleClose} triggerRef={triggerRef}>
        {items.map((item, index) => {
          const handleMenuItemPress = () => {
            if (typeof item === 'string') {
              onMenuItemPress(item);
            } else {
              onMenuItemPress(index, item.id);
            }
          };
          if (typeof item === 'string') {
            return (
              <Menu.Item key={item} onPress={handleMenuItemPress}>
                {item.toUpperCase()}
              </Menu.Item>
            );
          }
          return (
            <Menu.Item
              onPress={handleMenuItemPress}
              key={`${item.id}_${item.label}`}>
              {item.label}
            </Menu.Item>
          );
        })}
      </Menu>
    </>
  );
};

export default CustomMenu;
