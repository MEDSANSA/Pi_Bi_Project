import { Component } from '@angular/core';
import { PredictionService } from '../Services/prediction.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent {

  selectedFile!: File;
  imageUrl: string | ArrayBuffer | null = null;
  predictionResult: any;
  carbonFootprint: number | null = null;

  constructor(private predictionService: PredictionService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  predict() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
  
      this.predictionService.predict_image(formData).subscribe(response => {
        this.predictionResult = response.prediction;
        this.carbonFootprint = response.carbon_footprint;
      }, error => {
        console.error('Erreur de prédiction :', error);
      });
    }
  }

  reset() {
    this.selectedFile = null!;
    this.imageUrl = null;
    this.predictionResult = null;
  }
}
