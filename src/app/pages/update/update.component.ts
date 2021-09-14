import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PhonebookService } from "src/app/services/phonebook.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Subscription } from "rxjs";
import { ViewChild } from "@angular/core";
import { AllPhonebookEntriesComponent } from "../all-phonebook-entries/all-phonebook-entries.component";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.css"],
})
export class UpdateComponent implements OnInit {
  phonebookData: any;
  name;
  phone;
  email;
  phonebookForm: FormGroup;
  submitted = false;

  constructor(
    private __phonebook: PhonebookService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  //Declerations

  selected_contact?: any;
  phonrbookToEdit: any;
  set_phonebook: any;
  bookToUpdate: any = {};

  ngOnInit() {
    this.onSubmit();

    this.phonebookForm = this.formBuilder.group({
      name: new FormControl(""),
      phone: new FormControl(""),
      email: new FormControl(""),
    });

    const obj = JSON.parse(localStorage.getItem("User"));
    console.log(obj);
    this.name = obj.name;
    this.phone = obj.phone;
    this.email = obj.email;
  }

  // updatePhonebook(id: string, body: any) {
  //   console.log(this.phonebookForm.value);
  //   this.__phonebook.set_phonebook(this.phonebookData);
  //   localStorage.removeItem("User");
  //   this.router.navigate([`/update/${this.phonebookData.id}`]);
  // }

  updatePhonebook() {}

  onSelect(contact: any): void {
    this.selected_contact = contact;

    this.__phonebook.setContact(this.selected_contact);
    console.log(this.selected_contact);

    this.phonrbookToEdit = this.selected_contact;
    const User = JSON.stringify(contact);
    localStorage.setItem("User", User);

    console.log(contact);
  }

  goBack() {
    return this.router.navigate(["/"]);
  }

  get f() {
    return this.phonebookForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    this.__phonebook.updateProduct("6135fe816fb315563cef24a1", {
      _id: "6135fe816fb315563cef24a1",
      phone: 10111789,
      name: "Asisipho",
    });

    // stop here if form is invalid
    // if (this.phonebookForm.invalid) {
    //   return;
    // }

    // // display form values on success
    // alert(
    //   "SUCCESS!! :-)\n\n" + JSON.stringify(this.phonebookForm.value, null, 4)
    // );
  }

  deletePhonebook() {
    console.log(this.selected_contact.id);
    this.__phonebook.deletePhonebook(this.selected_contact.id);
    window.location.reload();
  }
}
