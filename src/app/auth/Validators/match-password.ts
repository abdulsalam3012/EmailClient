import { Injectable } from "@angular/core";
import { FormGroup, Validator } from "@angular/forms";

// Allows Angular to inject it into a component as a dependency
@Injectable({providedIn:'root'})
export class MatchPassword implements Validator {
    // Create the validator interface and pass the form group as paramater
    validate(fg: FormGroup) {
        // assing the form group value to const value 
        const { password, passwordConfirmation } = fg.value;
        // check both password are correct
        if (password === passwordConfirmation) {
            return null;
        }
        else {
            return { passwordDontMatch: true };
        }

    }
}
