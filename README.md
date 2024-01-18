# PasswordGenerator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Working of Password Generator
Password Generator

On page load a deafult password with all charcters with a length of 12 is generated
We can edit the input textbox whose input length will increase when we input new items
All checkboxes will be enabled on first click
When we uncheck each checkbox corresponsing charcters get removed and new combination will be genrated with available charcteers in same length
and when we click genrate it will generate another combination with same length from textbox
atleast one checkbox  will be always enabled