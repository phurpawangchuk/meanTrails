import { FormGroup } from "@angular/forms";

export class User {
    #name: string = "";
    #username: string = "";
    #password: string = "";

    set name(name: string) { this.#name = name; }
    get name() { return this.#name; }
    set username(username: string) { this.#username = username; }
    get username() { return this.#username; }
    set password(password: string) { this.#password = password; }
    get password() { return this.#password; }

    fill(form: FormGroup) {
        this.#name = form.value.name;
        this.#username = form.value.username;
        this.#password = form.value.password;
    }

    jsonify() {
        return {
            name: this.#name,
            username: this.#username,
            password: this.#password
        }
    }
}
