import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  public selected: any;
  contactForm: FormGroup;
  checkboxGroup: FormGroup;
  categories = []
  errrorTexts = ['This field is required','Help Text','Error Message']

  constructor( 
    private formBuilder: FormBuilder,
    private httpClient: HttpClient) { 
      this.contactForm = formBuilder.group({
        name: new FormControl ('', [Validators.required, Validators.pattern("^[A-Za-z]{1,}$")]),
        email: new FormControl ('', [Validators.required, Validators.pattern("@spitogatos.gr$")]),
        phone:  new FormControl (null, [Validators.required, Validators.pattern("^[0-9]{1,10}$")]),
        message: new FormControl ('', [Validators.required]),
        category: [],
        subCategory: [],
        checkboxGroup : new FormGroup({
          option1 : new FormControl(false),
          option2 : new FormControl(false)
        },this.requireCheckboxesToBeCheckedValidator())

      })
  }

  ngOnInit(): void {
    this.httpClient.get('https://run.mocky.io/v3/0b8fbded-6ce4-4cb2-bf2f-d2c39207506b').subscribe((res: any) => {
      this.categories = res;
    }) 
    
    console.log(this.contactForm.get('message').value.length);
    
  }

  selectCategory (event) {
    let cat = parseInt(event.target.value);
    this.selected = this.categories.find((c) => c.categoryId === cat);
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

  requireCheckboxesToBeCheckedValidator(minRequired = 1): ValidatorFn {
    return function validate (formGroup: FormGroup) {
      let checked = 0;
  
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.controls[key];
  
        if (control.value === true) {
          checked ++;
        }
      });
  
      if (checked < minRequired) {
        return {
          requireOneCheckboxToBeChecked: true,
        };
      }
  
      return null;
    };
  }

}
