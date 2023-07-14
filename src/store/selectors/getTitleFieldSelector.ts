import {createSelector} from '@reduxjs/toolkit';
import {categoriesMapSelector} from './categoriesSelector';

export const getTitleFieldSelector = createSelector(
  categoriesMapSelector,
  categoryByIdSelector => {
    return (categoryId: string, fieldId: string) => {
      const category = categoryByIdSelector[categoryId];
      if (category) {
        const titleField = category.fields.find(item => item.id === fieldId)
        if(titleField){
            return titleField
        }
      }
      return null;
    };
  },
);
