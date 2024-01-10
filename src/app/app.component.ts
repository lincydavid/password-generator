import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  generatedPassword: string = '';
  lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  numbers = '0123456789';
  specialCharacters = '!@#$%^&*()-_+=<>?';



  generatePassword() {
    let password = '';
    const length = 12; // Set your desired password length
    const combinedCharacterSet = this.lowercaseLetters + this.uppercaseLetters + this.numbers + this.specialCharacters;
    const characterSetLength = combinedCharacterSet.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterSetLength);
      password += combinedCharacterSet[randomIndex];
    }
    this.generatedPassword = password;
  }
  copyToClipboard() {
    const inputElement = document.getElementById('textInput') as HTMLInputElement;
    inputElement.select();
    document.execCommand('copy');
  }
}
