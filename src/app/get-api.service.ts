import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  constructor(
    private http:HttpClient
  ) { }

  getNextGame() 
  {
    return this.http.get('https://dev-games-backend.advbet.com/v1/ab-roulette/1/nextGame');
  }

  getHistory(){
    return this.http.get('https://dev-games-backend.advbet.com/v1/ab-roulette/1/stats?limit=200');
  }

  getConfig() {
    return this.http.get('https://dev-games-backend.advbet.com/v1/ab-roulette/1/configuration');
  }

  previousResult(id: number) {
    return this.http.get(`https://dev-games-backend.advbet.com/v1/ab-roulette/1/game/${id}`)
  }
}
