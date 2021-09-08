import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PhonebookService } from "src/app/services/phonebook.service";
import { FormControl, FormGroup } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.css"],
})
export class UpdateComponent implements OnInit {
  phonebookData: any;

  constructor(private __phonebook: PhonebookService, private router: Router) {}

  set_phonebook: any;

  phonebookForm = new FormGroup({
    name: new FormControl(""),
    phone: new FormControl(""),
    email: new FormControl(""),
  });

  ngOnInit() {}

  // updatePhonebook() {
  //   this.__phonebook.addNewPhonebook(this.phonebookForm.value);
  // }

  //Update Phonebook

  updateProduct() {
    this.__phonebook.set_phonebook(this.phonebookData);
    this.router.navigate([`/update/${this.phonebookData.id}`]);
  }
}
