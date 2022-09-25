import { Component } from '@angular/core';
import { GetApiService } from './get-api.service';
import { config, forkJoin } from 'rxjs';
import { GameConfig, HistoryItem, NextGame } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Aardvark Roulette game API demo';
  result: any = [];
  gameboard: any = [];
  notes: any = [];
  nextgame: any = [];
  public intervalId: any;

  previousResults() {
    this.api.previousResult(this.nextgame.id).subscribe((result: any) => {
      if (result.result) {
        this.notes.push(result);
      }
      this.api.getNextGame().subscribe((result) => {
        this.nextgame = result;
        this.intervalId = setInterval(() => {
          this.nextgame.fakeStartDelta =
            this.nextgame.fakeStartDelta > 1
              ? this.nextgame.fakeStartDelta - 1
              : 0;
          if (this.nextgame.fakeStartDelta === 0) {
            clearInterval(this.intervalId);
            this.previousResults();
          }
        }, 1000);
      });
    });
  }

  constructor(private api: GetApiService) {}
  ngOnInit() {
    forkJoin({
      nextGame: this.api.getNextGame(),
      history: this.api.getHistory(),
      config: this.api.getConfig(),
    }).subscribe({
      next: (response: any) => {
        response.history.forEach((historyItem: HistoryItem) => {
          historyItem.color = response.config.colors[historyItem.result];
        });
        response.config.positionToId.forEach((positionItem: number) => {
          this.gameboard.push({
            positionItem,
            colors: response.config.colors[positionItem],
          });
        });
        this.nextgame = response.nextGame;

        this.intervalId = setInterval(() => {
          this.nextgame.fakeStartDelta =
            this.nextgame.fakeStartDelta > 1
              ? this.nextgame.fakeStartDelta - 1
              : 0;
          if (this.nextgame.fakeStartDelta === 0) {
            clearInterval(this.intervalId);
            this.previousResults();
          }
        }, 1000);

        this.result = response.history;
      },
    });
  }
}
