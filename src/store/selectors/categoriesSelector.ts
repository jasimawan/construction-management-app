import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {MachineCategory} from '../../types';
import keyBy from 'lodash/keyBy';

const categoriesSelector = (state: RootState) =>
  state.categories.machinesCategories as MachineCategory[];

export const categoriesMapSelector = createSelector(
  categoriesSelector,
  (categories: MachineCategory[]) =>
    keyBy(categories, 'id') as Record<string, MachineCategory>,
);

export const getCategoryByIdSelector = createSelector(
  categoriesMapSelector,
  (_: RootState, categoryId: string) => categoryId,
  (
    categoriesMap: Record<string, MachineCategory>,
    categoryId: string,
  ): MachineCategory => categoriesMap[categoryId],
);


  
  
  
  
  
  
  
