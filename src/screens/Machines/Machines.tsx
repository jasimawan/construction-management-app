import React from 'react';
import {MACHINE_SCREEN} from '../../constants/navigationScreens';
import {RootDrawerParamList} from '../../routes';
import {RouteProp} from '@react-navigation/native';
import MachinesListing from '../../components/MachinesListing';

type MachineScreenProps = {
  route: RouteProp<RootDrawerParamList, typeof MACHINE_SCREEN>;
};

function Machines({route}: MachineScreenProps): JSX.Element {
  const machineCategoryIndex = route.params.categoryIndex;
  return (
    <MachinesListing machineCategoryIndex={machineCategoryIndex}/>
  );
}

export default Machines;
