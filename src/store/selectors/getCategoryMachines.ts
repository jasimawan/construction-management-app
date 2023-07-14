import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Machine} from '../../types';

const machinesSelector = (state: RootState) =>
  state.machines.machines as Machine[];

export const getCategoryMachinesSelector = createSelector(
  machinesSelector,
  (machines: Machine[]) => {
    return (categoryId: string) => {
      return machines.filter(item => item.categoryId === categoryId);
    };
  },
);
