import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { PhonebookService } from "src/app/services/phonebook.service";

@Component({
  selector: "app-all-phonebook-entries",
  templateUrl: "./all-phonebook-entries.component.html",
  styleUrls: ["./all-phonebook-entries.component.scss"],
})
export class AllPhonebookEntriesComponent implements OnInit {
  fonebook: any = {};
  options: any[] = [];
  book: any = [];
  phonebookData: any;

  //dEFCLERATION

  phonrbookToEdit:any;

  constructor(private __phonebook: PhonebookService, private router: Router) {}

  selected_contact?: any;

  searchForm: any = new FormGroup({
    search: new FormControl(""),
  });

  filterForm: any = new FormGroup({
    options: new FormControl(""),
  });

  ngOnInit(): void {
    this.__phonebook.getAllPhonebook().subscribe((data: any) => {
      this.book = data;
    });
  }

  phonebookForm = new FormGroup({
    name: new FormControl(""),
    phone: new FormControl(""),
    email: new FormControl(""),
  });

  submitPhoneBootEntry() {
    this.__phonebook.addNewPhonebook(this.phonebookForm.value);
  }

  load() {}

  //Search the phonebook by number or name

  searchPhonebookByNameOrNumber(value: any) {
    this.__phonebook.search(value).subscribe((results: any) => {
      this.fonebook = results;
    });
  }
  setOptions(option: string) {
    if (option.toLocaleLowerCase() === "all") return this.load();

    this.__phonebook.filter(option).subscribe((results: any) => {
      this.fonebook = results;
    });
  }
  onSelect(contact: any): void {
    this.selected_contact = contact;

    this.__phonebook.setContact(this.selected_contact);
    console.log(this.selected_contact);

    this.phonrbookToEdit = this.selected_contact;
    
  }
}
