export interface Attribute {
    id: string;
    machineIndex?: number;
    type: 'Text'|'Number'|'Date'|'Checkbox';
    label: string
}

export interface MachineAttributeData {
    id: string;
    fieldId: string;
    type: 'Text'|'Number'|'Date'|'Checkbox';
    value: string|number|Date|boolean|undefined;
    label: string;
}

export interface Machine {
    id: string;
    categoryIndex: number;
    attributes: MachineAttributeData[];
}

export interface MachineCategory {
    id: string;
    category: string;
    fields: Attribute[];
    titleFieldIndex?: number;
    titleFieldId?: string;
    machines: Machine[]
}

export interface MachineState {
    machinesCategories: MachineCategory[];
}

export interface UpdateMachineCategoryRequest{
    index: number;
    value: string;
}

export interface UpdateOrDeleteMachineFieldRequest{
    fieldId: string;
    index: number;
    fieldIndex: number;
    label?: string;
    type?: 'Text'|'Number'|'Date'|'Checkbox';
}

export interface UpdateMachineAttributeTitleRequest {
    index: number;
    fieldIndex: number;
    fieldId: string;
}

export interface DeleteMachineRequest {
    categoryIndex: number;
    machineIndex: number;
}

export interface UpdateMachineAttributeRequest {
    categoryIndex: number;
    machineIndex: number;
    attributeIndex: number;
    text: string|number|Date|boolean|undefined; 
}