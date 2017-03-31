import { Component } from '@angular/core';
import { PersonService } from '../person/person.service';
import { Person } from '../person/person';

@Component({
    selector: 'admin-component',
    templateUrl: './admin.component.html',
})

export class AdminComponent {
    title = "Admin";
    selectedPerson: Person;
    persons: Person[];

    constructor(private personService: PersonService) {
        this.personService.getPersons().then(persons => this.persons = persons);
    }

    selectPerson(person: Person) {
        this.selectedPerson = person;
    }
}