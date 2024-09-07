export class Token {
    #token: string = "";

    constructor(token: string) {
        this.#token = token;
    }
    set token(token: string) { this.#token = token; }
    get token() { return this.#token; }
}
