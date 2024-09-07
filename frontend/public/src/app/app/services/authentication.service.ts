import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Token } from '../../model/token';
import { TokenPayload } from '../../model/token-payload';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  set token(token: Token) {
    localStorage.setItem("token", token.token);
  }

  get hasToken(): boolean {
    if (this.token.token === "") {
      return false;
    } else {
      return true;
    }
  }

  get name() {
    let name = "";
    if (this.token) {
      const token_payload: TokenPayload = jwtDecode(this.token.token);
      name = token_payload.name;
    }
    return name;
  }

  get token() {
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      return new Token(tokenString);
    } else {
      return new Token("");
    }
  }

  constructor() { }

  logout() {
    this.token = new Token("");
    localStorage.removeItem("token");
    localStorage.clear();
  }
}
