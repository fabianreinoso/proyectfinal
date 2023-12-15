/* The GamesComponent class is responsible for managing the games page, including loading games,
searching games, playing games, editing games, deleting games, and handling user authentication. */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GameService } from '../games.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  games: any[] = [];
  displayedGames: any[] = [];
  searchForm: FormGroup;

  constructor(
    private gamesService: GameService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchQuery: [''],
    });
  }

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.gamesService.getAllGames().subscribe(
      (data: any[]) => {
        this.games = data.map((game: any) => ({
          ...game,
          logoUrl: this.gamesService.getLogoUrl(game.logoUrl),
        }));
        this.displayedGames = [...this.games];
        this.toastr.success('Juegos cargados exitosamente');
      },
      (error) => {
        console.error('Error loading games:', error);
        this.toastr.error('Error al cargar juegos');
      }
    );
  }

  playGame(gameId: string): void {
    // Lógica para reproducir un juego, si es necesario
  }

  editGame(game: any): void {
    this.router.navigate(['/upload', { gameId: game._id }]);
  }

  deleteGame(game: any): void {
    const confirmDelete = confirm(`¿Eliminar "${game.name}" de la lista de juegos?`);
    if (confirmDelete) {
      this.gamesService.deleteGame(game._id).subscribe(
        (deletedGame) => {
          this.games = this.games.filter((g) => g._id !== game._id);
          this.displayedGames = [...this.games];
          this.toastr.success('Juego eliminado exitosamente');
        },
        (error) => {
          console.error('Error deleting game:', error);
          this.toastr.error('Error al eliminar el juego');
        }
      );
    }
  }

  searchGames(): void {
    const query = this.searchForm.value.searchQuery.toLowerCase();
    this.displayedGames = this.games.filter(
      (game) =>
        game.name.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query)
    );
  }

  logout(): void {
    this.userService.logout();
    this.toastr.success('Sesión cerrada exitosamente');
    this.router.navigate(['/login']);
  }
  
  refreshPage(): void {
    location.reload();
  }

  showSuccess(): void {
    this.toastr.success('Operación exitosa');
  }

  showError(): void {
    this.toastr.error('Ocurrió un error');
  }
}
