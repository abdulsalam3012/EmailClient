import { Injectable } from "@angular/core";
import { AsyncValidator, FormControl } from "@angular/forms";
import { catchError, map, of } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../Services/auth.service";

// Allows Angular to inject it into a component as a dependency
@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
    constructor(private _authService: AuthService) { }
    validate = (control: FormControl) => {
        const { value } = control;
        return this._authService.availableUsernameCheck(value).pipe(
            map(
                value => {
                    return null;
                }
            ),
            catchError((error) => {
                if (error.message.username) {
                    return of({ nonUniqueUserName: true })
                }
                else {
                    return of({ onConnection: true })
                }

            })
        )
    };
}
