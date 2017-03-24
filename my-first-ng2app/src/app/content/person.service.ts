import { Injectable } from '@angular/core';
import { Person } from './person';
import { PERSONS } from './person-mock';

@Injectable()
export class PersonService {
    public create(firstname: string, lastname: string): Promise<number> {
        return Promise.resolve(PERSONS.push(new Person(firstname, lastname)));
    }
}