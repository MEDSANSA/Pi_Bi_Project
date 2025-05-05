import { Component } from '@angular/core';
import { PredictionService } from '../Services/prediction.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent {

  materialTypes = ['Produit laitier', 'Ingrédient'];
  transportTypes = ['Unknown', 'Ferroviaire', 'Multimodal', 'Aérien', 'Maritime', 'Camionnage'];
  recycledPackagingOptions = ['Yes', 'No'];

  waterConsumption: string = '';
  renewableEnergy: string = '';
  selectedMaterialType: string = '';
  selectedTransportType: string = '';
  selectedRecycledPackaging: string = '';

  prediction: string | null = null;

  constructor(private PredictionService: PredictionService) { }

  Predict_carbon_footprint() {
    const features = [
      parseInt(this.waterConsumption, 10),
      parseInt(this.renewableEnergy, 10),
      this.materialTypes.indexOf(this.selectedMaterialType),
      this.transportTypes.indexOf(this.selectedTransportType),
      this.recycledPackagingOptions.indexOf(this.selectedRecycledPackaging)
    ];

    this.PredictionService.predict_carbon_footprint(features).subscribe(
      data => this.prediction = data.prediction,
      error => console.error(error)
    );
  }

  reset() {
    this.waterConsumption = "";
    this.renewableEnergy = "";
    this.selectedMaterialType = "";
    this.selectedTransportType = "";
    this.selectedRecycledPackaging = "";
    this.prediction = null;
  }

  getInterpretation(): { message: string, color: string, emoji: string } {
    switch (this.prediction) {
      case 'high':
        return {
          emoji: '⚠️',
          color: '#dc3545',
          message: "This ingredient has a high carbon footprint, which could significantly impact your sustainability profile. Switching to a more eco-friendly alternative can enhance your brand's environmental commitment."
        };
      case 'medium':
        return {
          emoji: '⚠️',
          color: '#ffc107',
          message: "This ingredient has a moderate carbon footprint. While not critical, there's an opportunity here to improve your environmental impact and align more closely with sustainable sourcing practices."
        };
      case 'low':
        return {
          emoji: '✅',
          color: '#28a745',
          message: "Great news! This ingredient has a low carbon footprint, making it an excellent choice for reducing your environmental impact and strengthening your sustainability credentials."
        };
      default:
        return { emoji: '', color: '#6c757d', message: '' };
    }
  }

}
