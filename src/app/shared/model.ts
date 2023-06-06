
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
    // { 
    //     key: 'isSelected',
    //     type: 'isSelected',
    //     label: '',
    // },
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


