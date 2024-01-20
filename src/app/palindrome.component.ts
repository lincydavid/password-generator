import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-palindrome',
  template: ''
})

export class PalindromeComponent implements OnInit {
  checkString: string[] = [];
  isPalindrome: boolean | undefined;

  constructor() { }
  ngOnInit() {
    this.checkString = ['Mom', 'Amma', 'Hi', 'bye'];
    for (let s of this.checkString) {
      const result = this.checkForPalindrom(s);
      if (result) {
        console.log('The string is palindrom');
      } else {
        console.log('The string is not palindrom');
      }
    }
  }
  checkForPalindrom(value: string): boolean {
    const org = value.split('');
    const rev = value.split('').reverse();
    console.log('String to check : ', value)
    for (let i = 0; i < org.length; i++) {
      if (org[i].toLowerCase() === rev[i].toLowerCase()) {
        this.isPalindrome = true;
      } else {
        this.isPalindrome = false;
      }
    }
    return this.isPalindrome ? this.isPalindrome : false;
  }
}