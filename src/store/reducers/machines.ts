import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  Attribute,
  DeleteMachineRequest,
  Machine,
  MachineCategory,
  MachineState,
  UpdateMachineAttributeRequest,
  UpdateMachineAttributeTitleRequest,
  UpdateMachineCategoryRequest,
  UpdateOrDeleteMachineFieldRequest,
} from '../../types';
import shortid from 'shortid';

const initialState: MachineState = {
  machinesCategories: []
};

const machinesSlice = createSlice({
  name: 'machines',
  initialState,
  reducers: {
    // CATEGORIES REDUCERS
    addNewCategory(state, action: PayloadAction<MachineCategory>) {
      state.machinesCategories.push(action.payload);
    },
    updateCategory(
      state,
      action: PayloadAction<UpdateMachineCategoryRequest>,
    ) {
      const {index, value} = action.payload;
      state.machinesCategories[index].category = value;
    },
    addNewCategoryField(state, action: PayloadAction<Attribute>) {
      if (action.payload.machineIndex !== undefined) {
        const { machineIndex, label, type, id} = action.payload
        state.machinesCategories[machineIndex].fields.push(action.payload);
        state.machinesCategories[machineIndex].machines = state.machinesCategories[machineIndex].machines.map(item => {
            item.attributes.push({id: shortid.generate(), fieldId: id, label, type, value: undefined})
            return item
        })
      }
    },
    updateCategoryField(
      state,
      action: PayloadAction<UpdateOrDeleteMachineFieldRequest>,
    ) {
      const {index, fieldIndex, fieldId} = action.payload;
      if (action.payload.label !== undefined) {
        state.machinesCategories[index].fields[fieldIndex].label = action.payload.label;
        state.machinesCategories[index].machines = state.machinesCategories[index].machines.map(item => {
            const attributeIndex = item.attributes.findIndex(item => item.fieldId === fieldId)
            if(attributeIndex > -1){
                item.attributes[attributeIndex].label = action.payload.label || ""
            }
            return item
        })
      } else if (action.payload.type !== undefined) {
        state.machinesCategories[index].fields[fieldIndex].type = action.payload.type;
        state.machinesCategories[index].machines = state.machinesCategories[index].machines.map(item => {
            const attributeIndex = item.attributes.findIndex(item => item.fieldId === fieldId)
            if(attributeIndex > -1){
                item.attributes[attributeIndex].type = action.payload.type || "Text"
                item.attributes[attributeIndex].value = undefined
            }
            return item
        })
      }
    },
    updateTitleField(state, action: PayloadAction<UpdateMachineAttributeTitleRequest>){
        const {index, fieldIndex, fieldId} = action.payload
        state.machinesCategories[index].titleFieldIndex = fieldIndex
        state.machinesCategories[index].titleFieldId = fieldId
    },
    deleteCategory(state, action: PayloadAction<number>) {
      state.machinesCategories.splice(action.payload, 1);
    },
    deleteCategoryField(
      state,
      action: PayloadAction<UpdateOrDeleteMachineFieldRequest>,
    ) {
      const {index: machineIndex, fieldIndex, fieldId} = action.payload;
      if (state.machinesCategories[machineIndex].fields.length > 1) {
        state.machinesCategories[machineIndex].titleFieldIndex = 0
        state.machinesCategories[machineIndex].machines = state.machinesCategories[machineIndex].machines.map(item => {
            const newAttributes = item.attributes.filter(attribute => attribute.fieldId !== fieldId)
            return {...item, attributes: newAttributes}
        })
        state.machinesCategories[machineIndex].fields.splice(fieldIndex,1);
      }
    },
    // MACHINE REDUCERS
    addMachine(state, action: PayloadAction<Machine>){
        state.machinesCategories[action.payload.categoryIndex].machines.push(action.payload)
    },
    removeMachine(state, action: PayloadAction<DeleteMachineRequest>){
        const {categoryIndex, machineIndex} = action.payload
        state.machinesCategories[categoryIndex].machines.splice(machineIndex, 1)
    },
    updateMachineAttributeValue(state, action: PayloadAction<UpdateMachineAttributeRequest>){
        const {categoryIndex, machineIndex, attributeIndex, text} = action.payload
        state.machinesCategories[categoryIndex].machines[machineIndex].attributes[attributeIndex].value = text
    }
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
  addMachine,
  removeMachine,
  updateMachineAttributeValue
} = machinesSlice.actions;
export default machinesSlice.reducer;
