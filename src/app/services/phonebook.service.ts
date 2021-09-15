import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PhonebookService {
  constructor(private __http: HttpClient) {}

  headers = new HttpHeaders({
    "content-Type": "application/json; charset=utf-8",
  });

  set_phonebook: any;

  url = "https://asisipho-phonebook-api.herokuapp.com/api/phonebook";

  addNewPhonebook(phonebook: any) {
    this.__http.post(`${this.url}`, phonebook).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        console.warn(err);
      }
    );
  }
  //Get all phonebookContacts

  getAllPhonebook() {
    return this.__http.get(this.url);
  }

  //set phonebook
  setContact(contact: any) {
    this.set_phonebook = contact;
  }
  //Get single phonebook
  getContact() {
    return this.set_phonebook;
  }

  //Search and filtering phonebook
  search(value: any) {
    console.log(value);
    return this.__http.get(`${this.url}/search?s=${value}`);
  }

  filter(option: any) {
    return this.__http.get(`${this.url}/search?opt=${option}`);
  }

  //Update product
  updateProduct(id: string, body: any) {
    const updateUrl = `${this.url}/${id}`;
    return this.__http
      .put(updateUrl, body)
      .subscribe((res) => console.log(res));
  }

  //DeletePhonebook

  deletePhonebook(id: number) {
    const body = JSON.stringify({ _id: id });
    this.__http
      .delete(`${this.url}/${id}`, { headers: this.headers })
      .subscribe(
        (data) => {
          console.log(data);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side.");
            console.log(body);
          } else {
            console.log("Server-side.");
            console.log(body);
          }
        }
      );
  }
}
