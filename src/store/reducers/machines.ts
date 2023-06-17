import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Attribute {
    id: number;
    type: 'Text'|'Number'|'Date'|'Checkbox';
    value: string|number|Date|boolean;
    label: string
}

export interface MachineState {
    id: number;
    category: string;
    fields: Attribute[]
}

const initialState: MachineState[] = []

const machinesSlice = createSlice({
  name: 'machines',
  initialState,
  reducers: {
    addNewMachine(state, action: PayloadAction<MachineState>) {
      state.push(action.payload)
    },
  },
});

export const { addNewMachine } = machinesSlice.actions;
export default machinesSlice.reducer;
