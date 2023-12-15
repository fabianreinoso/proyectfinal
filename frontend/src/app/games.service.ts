import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:3000/api/games'; // Cambiado de 'http://localhost:3000/api/songs' a 'http://localhost:3000/api/games'

  constructor(private http: HttpClient) { }

  getAllGames(): Observable<any[]> { // Cambiado de 'getAllSongs' a 'getAllGames'
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  uploadGame(game: any): Observable<any> { // Cambiado de 'uploadSong' a 'uploadGame'
    return this.http.post(`${this.apiUrl}/upload`, game)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAudioUrl(relativePath: string): string {
    return `http://localhost:3000/${relativePath}`;
  }

  getLogoUrl(relativeUrl: string): string {
    return `http://localhost:3000/${relativeUrl}`;
  }

  getGameById(gameId: string): Observable<any> { // Cambiado de 'getSongById' a 'getGameById'
    return this.http.get(`${this.apiUrl}/${gameId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateGame(gameId: string, data: any): Observable<any> { // Cambiado de 'updateSong' a 'updateGame'
    return this.http.put(`${this.apiUrl}/${gameId}`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteGame(gameId: string): Observable<any> { // Cambiado de 'deleteSong' a 'deleteGame'
    return this.http.delete(`${this.apiUrl}/${gameId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<any> {
    console.error('Error:', error);
    return throwError(error);
  }
}
