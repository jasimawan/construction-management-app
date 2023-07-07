import React from 'react';
import {StyleSheet} from 'react-native';
import {useMolecules} from '@bambooapp/bamboo-molecules';

interface EmptyListComponentProps {
  text: string;
  onClick?: () => void;
}

function EmptyListComponent({
  text,
  onClick,
}: EmptyListComponentProps): JSX.Element {
  const {Button, Text, View} = useMolecules();
  return (
    <View style={styles.emptyViewStyle}>
      <Text>{text}</Text>
      {onClick && (
        <Button
          style={styles.button}
          variant="contained"
          size="lg"
          onPress={onClick}>
          Add a Category
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyViewStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  button: {
    marginTop: 8,
  },
});

export default EmptyListComponent;
