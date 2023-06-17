import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  Attribute,
  Machine,
  MachineState,
  UpdateMachineAttributeTitleRequest,
  UpdateMachineCategoryRequest,
  UpdateOrDeleteMachineFieldRequest,
} from '../../types';

const initialState: MachineState = {
  machines: [],
};

const getUpdatedValueBasedOnType = (
  type: 'Text' | 'Number' | 'Date' | 'Checkbox',
) => {
  switch (type) {
    case 'Text':
      return '';
    case 'Number':
      return 0;
    case 'Date':
      return undefined;
    case 'Checkbox':
      return false;
    default:
      return '';
  }
};

const machinesSlice = createSlice({
  name: 'machines',
  initialState,
  reducers: {
    addNewMachine(state, action: PayloadAction<Machine>) {
      state.machines.push(action.payload);
    },
    updateMachineCategory(
      state,
      action: PayloadAction<UpdateMachineCategoryRequest>,
    ) {
      const {index, value} = action.payload;
      state.machines[index].category = value;
    },
    addNewMachineAttribute(state, action: PayloadAction<Attribute>) {
      if (action.payload.machineIndex !== undefined) {
        state.machines[action.payload.machineIndex].fields.push(action.payload);
      }
    },
    updateMachineAttribute(
      state,
      action: PayloadAction<UpdateOrDeleteMachineFieldRequest>,
    ) {
      const {index, fieldIndex} = action.payload;
      if (action.payload.label) {
        state.machines[index].fields[fieldIndex].label = action.payload.label;
      } else if (action.payload.type) {
        state.machines[index].fields[fieldIndex].value =
          getUpdatedValueBasedOnType(action.payload.type);
        state.machines[index].fields[fieldIndex].type = action.payload.type;
      }
    },
    updateMachineTitleField(state, action: PayloadAction<UpdateMachineAttributeTitleRequest>){
        const {index, fieldIndex} = action.payload
        state.machines[index].titleFieldIndex = fieldIndex
    },
    deleteMachine(state, action: PayloadAction<number>) {
      state.machines.splice(action.payload, 1);
    },
    deleteMachineAttribute(
      state,
      action: PayloadAction<UpdateOrDeleteMachineFieldRequest>,
    ) {
      const machineIndex = action.payload.index;
      if (state.machines[machineIndex].fields.length > 1) {
        state.machines[machineIndex].titleFieldIndex = 0
        state.machines[machineIndex].fields.splice(
          action.payload.fieldIndex,
          1,
        );
      }
    },
  },
});

export const {
  addNewMachine,
  addNewMachineAttribute,
  updateMachineCategory,
  updateMachineAttribute,
  updateMachineTitleField,
  deleteMachine,
  deleteMachineAttribute,
} = machinesSlice.actions;
export default machinesSlice.reducer;
