import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  DeleteMachineRequest,
  Machine,
  MachineState,
  UpdateMachineAttributeParams,
  UpdateMachineAttributeRequest,
} from '../../types';

const initialState: MachineState = {
  machines: []
};

const machinesSlice = createSlice({
  name: 'machines',
  initialState,
  reducers: {
    addMachine(state, action: PayloadAction<Machine>){
        state.machines.push(action.payload)
    },
    removeMachine(state, action: PayloadAction<DeleteMachineRequest>){
        const {machineIndex} = action.payload
        state.machines.splice(machineIndex, 1)
    },
    updateMachineAttributeValue(state, action: PayloadAction<UpdateMachineAttributeRequest>){
      const {machineIndex, attributeKey, text} = action.payload
      state.machines[machineIndex].attributes[attributeKey] = text
    },
    updateMachinesField(state, action: PayloadAction<UpdateMachineAttributeParams>){
      const {categoryId, attributeKey, oldAttributeKey, attributeValue} = action.payload
      state.machines = state.machines.map(item => {
        if(item.categoryId === categoryId){
          const updatedAttributes: Record<string, string | boolean | number | Date | undefined> = {}
          if(attributeValue !== null){
            item.attributes[attributeKey] = attributeValue
          }else if(oldAttributeKey){
            for (const key in item.attributes) {
              if (key === oldAttributeKey) {
                updatedAttributes[`${attributeKey}_${oldAttributeKey.split('_')[1]}`] = item.attributes[key];
              } else {
                updatedAttributes[key] = item.attributes[key];
              }
            }
            item.attributes =  updatedAttributes
          }
        }
        return item
      })
    },
    addNewAttribute(state, action: PayloadAction<UpdateMachineAttributeParams>){
      const {categoryId, attributeKey, attributeValue} = action.payload
      if(attributeValue !== null){
        state.machines = state.machines.map(item => {
          if(item.categoryId === categoryId){
            item.attributes[attributeKey] = attributeValue
          }
          return item
        })
      }
    },
    deleteAttribute(state, action: PayloadAction<UpdateMachineAttributeParams>){
      const {categoryId, attributeKey} = action.payload
      state.machines = state.machines.map(item => {
        if(item.categoryId === categoryId){
          delete item.attributes[attributeKey]
        }
        return item
      })
    },
    deleteCategoryMachines(state, action: PayloadAction<string>){
      state.machines = state.machines.filter(item => item.categoryId !== action.payload)
    }
  },
});

export const {
  addMachine,
  removeMachine,
  updateMachineAttributeValue,
  updateMachinesField,
  deleteAttribute,
  addNewAttribute,
  deleteCategoryMachines
} = machinesSlice.actions;
export default machinesSlice.reducer;
