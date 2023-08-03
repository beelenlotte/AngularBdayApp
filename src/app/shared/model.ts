
export interface Employees {
    // isSelected: boolean;
    id?: number;
    employeeId?: string;
    firstName: string;
    lastName: string;
    address: string;
    postalCode: string;
    city: string;
    birthDay?: Date ;
    startDate?: Date ;
    isEdit?: boolean;
    age?: number;
    yearsOfService?: number;
}

export interface ExcelEmployee {
    Sheet1: [{
        firstName: string,
        lastName: string,
        address: string,
        postalCode: string,
        city: string,
        birthDay: string ,
        startDate: string ,        
    }]
}


export const EmployeeColumns = [

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
        required: false,
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
        key: 'yearsOfService',
        type: 'number',
        label: 'Jubilee',
        required: false,
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


