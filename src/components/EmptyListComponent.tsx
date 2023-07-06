import {useMolecules} from '@bambooapp/bamboo-molecules';
import {Box} from 'native-base';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

interface EmptyListComponentProps {
  text: string;
  onClick?: () => void;
}

function EmptyListComponent({
  text,
  onClick,
}: EmptyListComponentProps): JSX.Element {
  const {Button} = useMolecules();
  return (
    <Box style={styles.emptyViewStyle}>
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
    </Box>
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
