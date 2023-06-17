import React, {useCallback} from 'react';
import {FlatList, ListRenderItemInfo, Text, View} from 'react-native';
import {Box, Button} from 'native-base';
import {MachineState} from '../../store/reducers/machines';
import styles from './Dashboard.style';
import {
  CATEGORIES_SCREEN,
  DASHBOARD_SCREEN,
} from '../../constants/navigationScreens';
import {useAppSelector} from '../../store/store';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootDrawerParamList} from '../../routes';
import CategoryFormItem from '../../components/CategoryFormItem';

type DashboardScreenProps = {
  navigation: DrawerNavigationProp<
    RootDrawerParamList,
    typeof DASHBOARD_SCREEN
  >;
};

function Dashboard({navigation}: DashboardScreenProps): JSX.Element {
  const machines: MachineState[] = useAppSelector(state => state.machines);

  const handleAddCategory = useCallback(() => {
    navigation.navigate(CATEGORIES_SCREEN);
  }, [navigation]);

  const keyExtractor = useCallback(
    ({id}: MachineState, index: number) => `${index}_${id}`,
    [],
  );

  const renderItem = useCallback(({item}: ListRenderItemInfo<MachineState>) => {
    return (
      <CategoryFormItem key={`${item.id}_${item.category}`} machine={item} />
    );
  }, []);

  if (machines.length === 0) {
    return (
      <Box style={styles.emptyViewStyle}>
        <Text>No Categories Found</Text>
        <Button size="lg" marginTop={4} onPress={handleAddCategory}>
          Add a Category
        </Button>
      </Box>
    );
  }

  return (
    <View style={styles.containerStyle}>
      <FlatList
        keyExtractor={keyExtractor}
        data={machines}
        renderItem={renderItem}
      />
    </View>
  );
}

export default Dashboard;
