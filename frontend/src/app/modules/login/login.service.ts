import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/'

  async login(email:string, password: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.apiUrl}auth/login`,
        { email, password },
        { withCredentials: true }
      );
      alert('Login efetuado com sucesso!');
    } catch (err: any) {
      throw err;
    }
  }
}
