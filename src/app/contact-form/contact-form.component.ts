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
  contactForm: FormGroup;
  categories = []
  errrorTexts = ['This field is required','Help Text','Error Message']

  constructor( 
    private formBuilder: FormBuilder,
    private httpClient: HttpClient) { 
      this.contactForm = formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        phone: [null, Validators.required],
        message: ['', Validators.required],
        category: [],
        subCategory: [],
      })
  }

  ngOnInit(): void {
    this.httpClient.get('https://run.mocky.io/v3/0b8fbded-6ce4-4cb2-bf2f-d2c39207506b').subscribe((res: any) => {
      this.categories = res;
    }) 
    console.log(this.contactForm.get('name'))
  }

  selectCategory (event) {
    let cat = parseInt(event.target.value);
    this.selected = this.categories.find((c) => c.categoryId === cat);
  }

  // Only Alphabetic
  keyPressABC(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[A-Za-z]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  // Only Numeric
  keyPress123(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  submit() {
    // check that the form is validated
    if (this.contactForm.invalid) {
      // mark all form controls as 'touched' to force validation of the form
      this.markFormGroupTouched(this.contactForm);
      return;
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get firstname(): string {
    return this.contactForm.get('firstname').value;
  }

}
