export interface Attribute {
    id: string;
    type: 'Text'|'Number'|'Date'|'Checkbox';
    label: string
    value?: string | boolean | number | Date
}

export interface MachineCategory {
    id: string;
    category: string;
    titleFieldId: string;
    fields: Attribute[];
}

export interface Machine {
    id: string;
    categoryId: string;
    attributes: Record<string, string | boolean | number | Date | undefined>;
}

export interface CategoriesState {
    machinesCategories: MachineCategory[];
}

export interface MachineState {
    machines: Machine[];
}

export interface AddCategoryAttributeRequets{
    categoryId: string;
    attribute: Attribute;
}

export interface UpdateMachineCategoryRequest{
    index: number;
    value: string;
}

export interface UpdateOrDeleteMachineFieldRequest{
    fieldId: string;
    categoryId: string;
    label?: string;
    type?: 'Text'|'Number'|'Date'|'Checkbox';
}

export interface UpdateMachineAttributeTitleRequest {
    index: number;
    fieldId: string;
}

export interface DeleteMachineRequest {
    machineIndex: number;
}

export interface UpdateMachineAttributeRequest {
    machineIndex: number;
    attributeKey: string;
    text: string|number|Date|boolean|undefined; 
}

export interface UpdateMachineAttributeParams {
    categoryId: string;
    attributeKey: string;
    oldAttributeKey?: string;
    attributeValue?: string | boolean | null;
}

export interface AddMachineParams {
    machineCategoryFields: Attribute[],
    categoryId: string
}