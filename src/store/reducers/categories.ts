import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  AddCategoryAttributeRequets,
  CategoriesState,
  MachineCategory,
  UpdateMachineAttributeTitleRequest,
  UpdateMachineCategoryRequest,
  UpdateOrDeleteMachineFieldRequest,
} from '../../types';
import shortid from 'shortid';

const initialState: CategoriesState = {
  machinesCategories: [],
};

export const initializeValue = (type: 'Text'|'Number'|'Date'|'Checkbox') => {
    if(type === "Text" || type === "Number"){
        return ''
    }else if(type === "Checkbox"){
        return false
    }else{
        return undefined
    }
}

const categoriesSlice = createSlice({
  name: 'machineCategories',
  initialState,
  reducers: {
    addNewCategory(state) {
      const fieldId = shortid.generate();
      const category: MachineCategory = {
        id: shortid.generate(),
        category: 'New Category',
        fields: [{id: fieldId, type: 'Text', label: 'Field', value: ''}],
        titleFieldId: fieldId,
      };
      state.machinesCategories.push(category);
    },
    updateCategory(state, action: PayloadAction<UpdateMachineCategoryRequest>) {
      const {index, value} = action.payload;
      state.machinesCategories[index].category = value;
    },
    addNewCategoryField(
      state,
      action: PayloadAction<AddCategoryAttributeRequets>,
    ) {
      const {categoryId, attribute} = action.payload;
      const index = state.machinesCategories.findIndex(
        item => item.id === categoryId,
      );
      if (index > -1) {
        state.machinesCategories[index].fields.push(attribute);
      }
    },
    updateCategoryField(
      state,
      action: PayloadAction<UpdateOrDeleteMachineFieldRequest>,
    ) {
      const {categoryId, fieldId, label, type} = action.payload;
      const index = state.machinesCategories.findIndex(
        item => item.id === categoryId,
      );
      if (index > -1) {
        const fieldIndex = state.machinesCategories[index].fields.findIndex(
          item => item.id === fieldId,
        );
        if (fieldIndex > -1) {
          if (label !== undefined) {
            if (index > -1) {
              state.machinesCategories[index].fields[fieldIndex].label = label;
            }
          } else if (type !== undefined) {
            state.machinesCategories[index].fields[fieldIndex].type = type;
            state.machinesCategories[index].fields[fieldIndex].value = initializeValue(type)
          }
        }
      }
    },
    updateTitleField(
      state,
      action: PayloadAction<UpdateMachineAttributeTitleRequest>,
    ) {
      const {index, fieldId} = action.payload
      state.machinesCategories[index].titleFieldId = fieldId
    },
    deleteCategory(state, action: PayloadAction<number>) {
      state.machinesCategories.splice(action.payload, 1);
    },
    deleteCategoryField(
      state,
      action: PayloadAction<UpdateOrDeleteMachineFieldRequest>,
    ) {
        const {fieldId, categoryId} = action.payload;
        const index = state.machinesCategories.findIndex(
            item => item.id === categoryId,
          );
          if (index > -1 && state.machinesCategories[index].fields.length > 1) {
            const fieldIndex = state.machinesCategories[index].fields.findIndex(
              item => item.id === fieldId,
            );
            if (fieldIndex > -1) {
                state.machinesCategories[index].fields.splice(fieldIndex, 1);
                if(state.machinesCategories[index].titleFieldId === fieldId){
                    state.machinesCategories[index].titleFieldId = state.machinesCategories[index].fields[0].id
                }
            }
        }
    },
  },
});

export const {
  addNewCategory,
  updateCategory,
  addNewCategoryField,
  updateCategoryField,
  updateTitleField,
  deleteCategory,
  deleteCategoryField,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
