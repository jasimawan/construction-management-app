export interface Attribute {
    id: string;
    machineIndex?: number;
    type: 'Text'|'Number'|'Date'|'Checkbox';
    value: string|number|Date|boolean|undefined;
    label: string
}

export interface MachineState {
    machines: Machine[];
}

export interface Machine {
    id: string;
    category: string;
    fields: Attribute[];
    titleFieldIndex?: number;
}

export interface UpdateMachineCategoryRequest{
    index: number;
    value: string;
}

export interface UpdateOrDeleteMachineFieldRequest{
    index: number;
    fieldIndex: number;
    label?: string;
    type?: 'Text'|'Number'|'Date'|'Checkbox';
}

export interface UpdateMachineAttributeTitleRequest {
    index: number;
    fieldIndex: number;
}