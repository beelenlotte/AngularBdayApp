
export interface Employees {
    // isSelected: boolean;
    id: number;
    employeeId: string;
    firstName: string;
    lastName: string;
    address: string;
    postalcode: string;
    city: string;
    birthDay: string;
    startDate: string;
    isEdit: boolean;
}

export const EmployeeColumns = [

    { 
        key: 'employeeId',
        type: 'text',
        label: 'ID',
    },
    { 
        key: 'firstName',
        type: 'text',
        label: 'First Name',
    },
    { 
        key: 'lastName',
        type: 'text',
        label: 'Last Name',
    },
    { 
        key: 'address',
        type: 'text',
        label: 'Address',
        required: false,
        pattern: '',
    },
    { 
        key: 'postalCode',
        type: 'text',
        label: 'Postal Code',
    },
    { 
        key: 'city',
        type: 'text',
        label: 'City',
    },
    { 
        key: 'birthDay',
        type: 'date',
        label: 'Birth Day',
    },
    { 
        key: 'startDate',
        type: 'date',
        label: 'Start Date',
    },
    {
        key: 'isEdit',
        type: 'isEdit',
        label: '',
    },
]

export const EmployeeColumnsBday = [
    { 
        key: 'birthDay',
        type: 'date',
        label: 'Birth Day',
    },
    { 
        key: 'age',
        type: 'number',
        label: 'Age',
    },
    { 
        key: 'employeeId',
        type: 'text',
        label: 'ID',
    },
    { 
        key: 'firstName',
        type: 'text',
        label: 'First Name',
    },
    { 
        key: 'lastName',
        type: 'text',
        label: 'Last Name',
    },
    { 
        key: 'address',
        type: 'text',
        label: 'Address',
        required: false,
        pattern: '',
    },
    { 
        key: 'postalCode',
        type: 'text',
        label: 'Postal Code',
    },
    { 
        key: 'city',
        type: 'text',
        label: 'City',
    },
]

export const EmployeeColumnsJubel = [
    { 
        key: 'startDate',
        type: 'date',
        label: 'Start Date',
    },
    { 
        key: 'Jubilee',
        type: 'number',
        label: 'Jubilee',
    },
    { 
        key: 'employeeId',
        type: 'text',
        label: 'ID',
    },
    { 
        key: 'firstName',
        type: 'text',
        label: 'First Name',
    },
    { 
        key: 'lastName',
        type: 'text',
        label: 'Last Name',
    },
    { 
        key: 'address',
        type: 'text',
        label: 'Address',
        required: false,
        pattern: '',
    },
    { 
        key: 'postalCode',
        type: 'text',
        label: 'Postal Code',
    },
    { 
        key: 'city',
        type: 'text',
        label: 'City',
    },
]


