import { inject, Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:3000',
      withCredentials: true
    })
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  async checkLoginStatus(): Promise<boolean> {
    try {
      await this.axiosInstance.get('/auth/check-status');
      return true;
    } catch (error: any) {
      return error.response?.status === 403 ? true : false;
    }

  }
  async refreshTokens(): Promise<void> {
    try {

      await this.axiosInstance.post('/auth/refresh-tokens')
    } catch (error: any) {
      console.error('Erro ao renovar tokens:', error);
    }
  }

  isValidCsrfToken(): boolean {
    const csrfToken = this.getCookie('csrf_token');
    return !!csrfToken
  }

  logout(): void {
    document.cookie = 'csrf_token=; Max-age=0; path=/;';
  }
}
