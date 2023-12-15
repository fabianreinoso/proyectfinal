import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../games.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  uploadForm: FormGroup;
  isEditMode: boolean = false;
  gameId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.uploadForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]],
      quantity: [null, [Validators.required, Validators.min(0)]],
      date: [null, [Validators.required]],
      audio: [null, [Validators.required]],
      logo: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.gameId = params['gameId'];
      if (this.gameId) {
        this.isEditMode = true;
        this.gameService.getGameById(this.gameId).subscribe(
          (data) => {
            this.uploadForm.patchValue(data);
            // Deshabilitar validación para campos de archivo en modo de edición
           const audioControl = this.uploadForm.get('audio');
           if (audioControl) {
             audioControl.clearValidators();
             audioControl.updateValueAndValidity();
           }

            const logoControl = this.uploadForm.get('logo');
            if (logoControl) {
              logoControl.clearValidators();
              logoControl.updateValueAndValidity();
            }
          },
          (error) => {
            console.error('Error loading game for edit:', error);
          }
        );
      }
    });
  }
 
  onAudioChange(event: any): void {
    const file = event.target.files[0];
    this.uploadForm.patchValue({ audio: file });
  }
  

  onLogoChange(event: any): void {
    const file = event.target.files[0];
    this.uploadForm.patchValue({ logo: file });
  }

  uploadGame(): void {
    if (this.uploadForm.valid) {
      const formData = new FormData();
      formData.append('name', this.uploadForm.value.name);
      formData.append('description', this.uploadForm.value.description);
      formData.append('price', this.uploadForm.value.price);
      formData.append('quantity', this.uploadForm.value.quantity);
      formData.append('date', this.uploadForm.value.date);
      formData.append('audio', this.uploadForm.value.audio);
      formData.append('logo', this.uploadForm.value.logo);

      const serviceCall = this.isEditMode
        ? this.gameService.updateGame(this.gameId as string, this.uploadForm.value)
        : this.gameService.uploadGame(formData);

      serviceCall.subscribe(
        (response) => {
          if (this.isEditMode) {
            this.toastr.success('Juego actualizado exitosamente');
            console.log('Game updated successfully', response);
            this.router.navigate(['/games']);
          } else {
            this.toastr.success('Juego subido exitosamente');
            console.log('Game uploaded successfully', response);
            this.router.navigate(['/games']);
          }
        },
        (error) => {
          console.error(this.isEditMode ? 'Error updating game' : 'Error uploading game', error);
        }
      );
    } else {
      this.validateAllFormFields(this.uploadForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }

  goToGames() {
    this.router.navigate(['/games']);
  }
}
