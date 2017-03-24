import { Component } from '@angular/core';
import { PersonService } from './content/person.service';

@Component({
    templateUrl: './admin.component.html'
})

export class AdminComponent{
    constructor(private personService: PersonService){}

    title="Admin";

    createPerson() {
        this.personService.create("bla", "bla");
    }
}