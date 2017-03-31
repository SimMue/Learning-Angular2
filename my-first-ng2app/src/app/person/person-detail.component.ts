import { Component, Input, Output } from '@angular/core';
import { Person } from './person';
import { PersonService } from './person.service';

@Component({
    selector: 'person-detail',
    templateUrl: './person-detail.component.html',
})

export class PersonDetailComponent {
    @Input() person: Person;

    constructor(private personService: PersonService) {
        
    }

    newPerson() {
        this.person = new Person("", "");
    }

    createPerson() {
        this.personService.addPerson(this.person);
    }
}