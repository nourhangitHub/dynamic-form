import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms'
import { FormObject } from '../form-object.model';

@Component({
  selector: 'app-formcomponent',
  templateUrl: './formcomponent.component.html',
  styleUrls: ['./formcomponent.component.scss']
})
export class FormcomponentComponent implements OnInit {
  jsonForm : FormGroup; //hold json configrations value that in json formate
  formObject; //hold transformed json object to javaScript object 
  dynamicForm : FormGroup;; //hold new form that render from json configrations
  isRendered: boolean = false; //control if your dynamic form can render or not 
  fieldTypes = ["Label", "Submit", "Cancel", "Checkbox"]; //types not needed to create form control
  jsonError : boolean = false; //indecate if json formate is valid or not
  checkboxArray; //handel all checkbox in form
  checkboxOptions;//handel all checkbox options

  @ViewChild("copy") copy: ElementRef;
  constructor(private fb: FormBuilder, @Inject(DOCUMENT) private document: Document,) {
    
   }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.jsonForm = this.fb.group({
      textArea: [null, Validators.required]
    })
  }

  //copy json by click

  oncopy(){
    this.copy.nativeElement.select();
    this.copy.nativeElement.setSelectionRange(0, 99999);
    this.document.execCommand("copy");
  }

  ngAfterViewInit() {
    
  }

  onSubmit(){
    if(this.jsonForm.valid){
      try {
        this.formObject = JSON.parse(this.jsonForm.value.textArea);
        this.dynamicForm = this.fb.group({}); //build dynamic form group
        this.createFormControls(); //create form control with every field dynamicly
        this.isRendered = true;
        this.jsonError = false;
      }
      catch(err) {
        //handel if json formate is invalid syntax
        if(err.message.includes("JSON", 0) && err.name === "SyntaxError"){
          this.isRendered = false;
          this.jsonError = true;
        }
      }
    }
  }
  
  //this method create form control based on dynamic form

  createFormControls() {
    this.formObject.fields.forEach(field => {
      if (!this.fieldTypes.includes(field.type)) {
        this.dynamicForm.addControl(field.id, new FormControl(field.value ? field.value : '' , field.Required ? Validators.required : null))
      }
      if (field.type === "Checkbox") {
        this.dynamicForm.addControl(field.id, new FormArray([]));
        this.checkboxArray = this.dynamicForm.get(field.id) as FormArray;
        this.checkboxOptions = field.options;
        field.options.forEach(option => {
          this.checkboxArray.push(new FormControl(option.checked ? option.value : false));
        })
      }
    })
  }

  //that run with every changes happend at component

  ngDoCheck(){
    //that render dynamic form with every changes in json object in text area
    this.jsonForm.valueChanges.subscribe(() => {
      this.onSubmit(); 
    });
  }

}
