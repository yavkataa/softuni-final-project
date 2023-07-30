import { ValidatorFn } from "@angular/forms";

export function matchPasswordsValidator(passwordCtrlOne: string, passwordCtrlTwo: string): ValidatorFn {
    return (control) => {
        return (passwordCtrlOne === passwordCtrlTwo) ? null : { matchPasswordsValidator: true}
        
    }
}