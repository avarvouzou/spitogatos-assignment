import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  public selected: any;
  contactForm: any;
  categories = []

  constructor( 
    private formBuilder: FormBuilder,
    private httpClient: HttpClient) { 
      this.contactForm = formBuilder.group({
        name: [''],
        email: [''],
        phone: [null],
        message: [''],
        category: [],
        subCategory: []
      })
  }

  ngOnInit(): void {
    this.httpClient.get('https://run.mocky.io/v3/0b8fbded-6ce4-4cb2-bf2f-d2c39207506b').subscribe((res: any) => {
      this.categories = res;
    }) 
  }

  selectCategory (event) {
    let cat = parseInt(event.target.value);
    this.selected = this.categories.find((c) => c.categoryId === cat);
  }

}
