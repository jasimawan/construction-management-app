import {createSelector} from '@reduxjs/toolkit';
import {Attribute} from '../../types';
import {categoriesMapSelector} from './categoriesSelector';

export const getFieldByIdSelector = createSelector(
  categoriesMapSelector,
  categoryByIdSelector => {
    return (categoryId: string, fieldId: string) => {
      const category = categoryByIdSelector[categoryId];
      if (category) {
        const field: Attribute | undefined = category.fields.find(
          item => item.id === fieldId,
        );
        if (field) {
          return field;
        }
      }
      return null;
    };
  },
);
