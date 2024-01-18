import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  generatedPassword: string = '';
  lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  numbers = '0123456789';
  specialCharacters = '!@#$%^&*()-_+=<>?';

  lowercaseFormControl = new FormControl(false);
  uppercaseFormControl = new FormControl(false)
  numbersFormControl = new FormControl(false)
  specialCharactersFormControl = new FormControl(false)
  flag: boolean | undefined;
  lowerFlag: boolean | undefined;
  specialFlag: boolean | undefined;
  numberFlag: boolean | undefined;
  upperFlag: boolean | undefined;

  ngOnInit(): void {
    this.flag = false;
    this.lowerFlag = false;
    this.specialFlag = false;
    this.numberFlag = false;
    this.upperFlag = false;

    this.lowercaseFormControl.valueChanges.subscribe(
      (newValue) => {
        if (!newValue) {
          this.flag = true;//call generated button again and update charcterset
          this.lowerFlag = true;//generated password will not have lowercase characters
        }
      }
    );
    this.specialCharactersFormControl.valueChanges.subscribe(
      (newValue) => {
        if (!newValue) {
          this.flag = true;//call generated button again and update charcterset
          this.specialFlag = true;//generated password will not have lowercase characters
        }
      }
    );
    this.numbersFormControl.valueChanges.subscribe(
      (newValue) => {
        if (!newValue) {
          this.flag = true;//call generated button again and update charcterset
          this.numberFlag = true;//generated password will not have lowercase characters
        } else{
          this.flag = false;
          this.upperFlag = false;
        }
      }
    );
    this.uppercaseFormControl.valueChanges.subscribe(
      (newValue) => {
        if (!newValue) {
          this.flag = true;//call generated button again and update charcterset
          this.upperFlag = true;//generated password will not have lowercase characters
        } else{
          this.flag = false;
          this.upperFlag = false;
        }
      }
    );
  }
  generatePassword() {
    let combinedCharacterSet = '';
    let password = '';
    const length = 20;
    if (this.flag) {
      if (this.lowerFlag) {
        console.log('1')
        combinedCharacterSet = this.uppercaseLetters + this.numbers + this.specialCharacters;
      }
      if (this.specialFlag) {
        console.log('2')
        combinedCharacterSet = this.lowercaseLetters + this.uppercaseLetters + this.numbers;
      }
      if (this.numberFlag) {
        console.log('3')
        combinedCharacterSet = this.lowercaseLetters + this.uppercaseLetters + this.specialCharacters;
      }
      if (this.upperFlag) {
        console.log('4')
        combinedCharacterSet = this.lowercaseLetters + this.specialCharacters + this.numbers;
      }
    } else {
      combinedCharacterSet = this.lowercaseLetters + this.uppercaseLetters + this.numbers + this.specialCharacters;
      this.numbersFormControl.setValue(true);
      this.specialCharactersFormControl.setValue(true);
      this.uppercaseFormControl.setValue(true);
      this.lowercaseFormControl.setValue(true);
    }
    const characterSetLength = combinedCharacterSet.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterSetLength);
      password += combinedCharacterSet[randomIndex];
    }
    this.generatedPassword = password;
    console.log('pass ',this.generatedPassword)

  }

  selectCheckbox() {
    for (let i = 0; i < this.generatedPassword.length; i++) {
      if (this.specialCharacters.includes(this.generatedPassword[i])) {
        this.specialCharactersFormControl.setValue(true);
      }
      if (this.numbers.includes(this.generatedPassword[i])) {
        this.numbersFormControl.setValue(true);
      }
      if (this.uppercaseLetters.includes(this.generatedPassword[i])) {
        this.uppercaseFormControl.setValue(true);
      }
      if (this.lowercaseLetters.includes(this.generatedPassword[i])) {
        this.lowercaseFormControl.setValue(true);
      }
    }
  }
  copyToClipboard() {
    // const inputElement = document.getElementById('textInput') as HTMLInputElement;
    // inputElement.select();
    // document.execCommand('copy');
  }
}
