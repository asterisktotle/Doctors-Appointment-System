import { Doctor } from '../models/doctor.model';

const testDoctor = new Doctor({
    lastName: 'Tenzo',
    sex: 'Male',
    specialization: 'Surgery',
    availability: [
        {
            days: ['Friday', 'Sunday'],
            slots: ['9:00 PM']
        }
    ]
})


//Log the test object
console.log('Test User:', testDoctor);

// Access properties and methods
console.log('Last Name:', testDoctor.lastName);
console.log('Sex: ', testDoctor.sex);
console.log('Specialization: ', testDoctor.specialization);
console.log('Availability: ', testDoctor.availability);