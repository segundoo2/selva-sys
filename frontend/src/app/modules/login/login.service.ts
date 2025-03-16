import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:3000/'

  async login(email:string, password: string): Promise<any> {
    try {
      const response = await axios.post(this.apiUrl, { email, password }, { withCredentials: true });
    } catch (err: any) {
      console.error('Erro no login:', err.response?.data || err.message)
    }
  }
}
