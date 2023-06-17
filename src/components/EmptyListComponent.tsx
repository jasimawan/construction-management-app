import {Box, Button} from 'native-base';
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
  return (
    <Box style={styles.emptyViewStyle}>
      <Text>{text}</Text>
      {onClick && (
        <Button size="lg" marginTop={4} onPress={onClick}>
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
    justifyContent: 'center',
  },
});

export default EmptyListComponent;
