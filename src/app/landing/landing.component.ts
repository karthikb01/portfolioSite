import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {

  selected = 'primary'
  flag = false

  constructor(private dialog : MatDialog) {}

  @ViewChild('contact') form! : NgForm

  message = {
    name : '',
    email : '',
    subject : '',
    message : ''
  }

  wait : boolean = false

  public sendEmail(e: Event) {
    this.wait = true
    e.preventDefault();
    emailjs.sendForm('service_e2j02t9', 'template_y7q1ct8', e.target as HTMLFormElement, '_dpS08DVNN0fslLh5')
      .then((result: EmailJSResponseStatus) => {
        // console.log(result.text);        
        if(result.text == "OK"){
          this.wait = false
          this.form.reset()
          this.dialog.open(SuccessDialog, {restoreFocus : false});
        }
      }, (error) => {
        // console.log(error.text);
        this.wait = false
        this.dialog.open(ErrorDialog, {restoreFocus : false})
      });
  }

}

@Component({
  selector: 'success-dialog',
  templateUrl: 'dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class SuccessDialog {}

@Component({
  selector: 'error-dialog',
  template: `<h1 mat-dialog-title>Error</h1>
  <div mat-dialog-content>Some error has occured!</div>
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>Close</button>
  </div>`,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ErrorDialog {}