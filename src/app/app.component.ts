import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Items } from './items';

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
  passwordLength = 12;

  items: Items | undefined;
  characterSetLength: number | undefined;
  combinedCharacterSet: string | undefined;
  isChecked: boolean | undefined;

  ngOnInit(): void {
this.isChecked = false
    this.setDefaultItemValue();
    this.generatePassword();

    this.lowercaseFormControl.valueChanges.subscribe(
      (newValue) => {
        if (newValue) {
          if (this.items) {
            this.items.lowerCharcters = 'abcdefghijklmnopqrstuvwxyz';
          }
        } else {
          if (this.items) {
            this.items.lowerCharcters = '';
            this.calculateLength();
            if (this.characterSetLength === 0) {
              this.lowercaseFormControl.setValue(true);
              return;
            }
          }
        }
      }
    );
    this.specialCharactersFormControl.valueChanges.subscribe(
      (newValue) => {
        if (newValue) {
          if (this.items) {
            this.items.specialCharcters = '!@#$%^&*()-_+=<>?';
          }
        } else {
          if (this.items) {
            this.items.specialCharcters = '';
            this.calculateLength();
            if (this.characterSetLength === 0) {
              this.specialCharactersFormControl.setValue(true);
              return;
            }
          }
        }
      }
    );
    this.numbersFormControl.valueChanges.subscribe(
      (newValue) => {
        if (newValue) {
          if (this.items) {
            this.items.numberCharcters = '0123456789';
          }
        } else {
          if (this.items) {
            this.items.numberCharcters = '';
            this.calculateLength();
            if (this.characterSetLength === 0) {
              this.numbersFormControl.setValue(true);
              return;
            }
          }
        }
      }
    );
    this.uppercaseFormControl.valueChanges.subscribe(
      (newValue) => {
        if (newValue) {
          if (this.items) {
            this.items.upperCharcters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          }
        } else {
          if (this.items) {
            this.items.upperCharcters = '';
            this.calculateLength();
            if (this.characterSetLength === 0) {
              this.uppercaseFormControl.setValue(true);
              return;
            }
          }
        }
      }
    );
  }

  setDefaultItemValue() {
    this.items = {
      specialCharcters: '!@#$%^&*()-_+=<>?',
      numberCharcters: '0123456789',
      upperCharcters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowerCharcters: 'abcdefghijklmnopqrstuvwxyz'
    };
    if (this.items?.upperCharcters) {
      this.uppercaseFormControl.setValue(true);
    } if (this.items?.lowerCharcters) {
      this.lowercaseFormControl.setValue(true);
    }
    if (this.items?.specialCharcters) {
      this.specialCharactersFormControl.setValue(true);
    }
    if (this.items?.numberCharcters) {
      this.numbersFormControl.setValue(true);
    }


  }
  calculateLength() {
    if (this.items) {
      this.combinedCharacterSet =
        this.items?.lowerCharcters + this.items?.upperCharcters + this.items?.numberCharcters + this.items?.specialCharcters;
      this.characterSetLength = this.combinedCharacterSet?.length
    }
  }

  generatePassword() {
    this.combinedCharacterSet = '';
    let password = '';
    if (this.items) {
      this.combinedCharacterSet =
        this.items?.lowerCharcters + this.items?.upperCharcters + this.items?.numberCharcters + this.items?.specialCharcters;
    }
    this.characterSetLength = this.combinedCharacterSet.length;

    for (let i = 0; i < this.passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * this.characterSetLength);
      password += this.combinedCharacterSet[randomIndex];
    }
    this.generatedPassword = password;
    this.updatePasswordStrength(this.generatedPassword);
  }

  copyToClipboard(inputElement: HTMLInputElement) {
    inputElement.select();
    try {
      navigator.clipboard.writeText(inputElement.value)
        .then(() => {
        })
        .catch((err) => {
          console.error('Unable to copy text to clipboard', err);
        });
    } catch (err) {
      console.error('Clipboard API not supported', err);
    }
  }

  inputValueChange(event: any) {
    if (event.target.value) {
      const newlength = event.target.value.length;
      this.passwordLength = newlength;
    }
  }

  updatePasswordStrength(password: string) {
    const lengthScore = Math.min(password.length / 8, 1);
    const uppercaseScore = password.match(/[A-Z]/) ? 1 : 0;
    const lowercaseScore = password.match(/[a-z]/) ? 1 : 0;
    const numberScore = password.match(/[0-9]/) ? 1 : 0;
    const specialCharScore = password.match(/[^A-Za-z0-9]/) ? 1 : 0;

    const totalScore = lengthScore + uppercaseScore + lowercaseScore + numberScore + specialCharScore;

    let indicator = document.getElementById('password-strength-indicator');
    if (indicator) {
      indicator.style.width = (totalScore * 20) + '%'; // Each criterion contributes 20% to the total width
      indicator.style.backgroundColor = 'green'
    }

    const strengthText = document.getElementById('strength-text');
    if (totalScore < 2) {
      if (strengthText && indicator) {
        strengthText.textContent = 'Weak';
        strengthText.style.color = 'red';
        indicator.style.backgroundColor = 'red'
      }

    } else if (totalScore < 4 && indicator) {
      if (strengthText) {
        strengthText.textContent = 'Medium';
        strengthText.style.color = 'orange';
        indicator.style.backgroundColor = 'orange'
      }
    } else {
      if (strengthText && indicator) {
        strengthText.textContent = 'Strong';
        strengthText.style.color = 'green';
        indicator.style.backgroundColor = 'green'
      }
    }
  }
}
