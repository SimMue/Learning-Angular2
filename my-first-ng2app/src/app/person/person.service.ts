import { Injectable } from '@angular/core';
import { Person } from './person';
import { PERSONS } from './person-mock';

@Injectable()
export class PersonService {
    getPersons(): Promise<Person[]> {
        return Promise.resolve(PERSONS);
    }
    
    addPerson(person : Person): void {
        PERSONS.push(person);
    }
}