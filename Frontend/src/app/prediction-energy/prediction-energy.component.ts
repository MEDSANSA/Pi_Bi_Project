import { Component } from '@angular/core';
import { PredictionService } from '../Services/prediction.service';

@Component({
  selector: 'app-prediction-energy',
  templateUrl: './prediction-energy.component.html',
  styleUrls: ['./prediction-energy.component.css']
})
export class PredictionEnergyComponent {

  transportTypes = ['Unknown', 'Ferroviaire', 'Multimodal', 'Aérien', 'Maritime', 'Camionnage'];
  certificationTypes = ['Agriculture Biologique', 'ISO 14001'];
  region = ['North', 'Cost', 'South'];
  state = ['Tunis', 'Sfax', 'Gabès', 'Nabeul', 'Sousse'];

  formData = {
    Transport_Type: '',
    Environmental_Certifications: '',
    State: '',
    Region: '',
    Country: 'Tunisia',
    Carbon_Footprint_per_Unit_kgCO2e: 0,
    Water_Consumption_per_Unit_liters: 0,
    Sustainability_Program: 0
  };

  predictionResult: number | null = null;

  constructor(private predictionService: PredictionService) { }

  predictEnergy() {
    this.predictionService.predictEnergy(this.formData).subscribe({
      next: (res) => {
        this.predictionResult = res.renewable_energy_percentage;
      },
      error: (err) => {
        console.error('Erreur de prédiction:', err);
      }
    });
  }

  resetForm() {
    this.formData.Transport_Type = "";
    this.formData.Environmental_Certifications = "";
    this.formData.State = "";
    this.formData.Region = "";
    this.formData.Carbon_Footprint_per_Unit_kgCO2e = 0;
    this.formData.Sustainability_Program = 0;
    this.formData.Water_Consumption_per_Unit_liters = 0;
    this.predictionResult = null;
  }

  updateRegion() {
    const state = this.formData.State;
  
    if (state === 'Tunis') {
      this.formData.Region = 'North';
    } else if (state === 'Gabès') {
      this.formData.Region = 'South';
    } else {
      this.formData.Region = 'Cost';
    }
  }

  getEnergyInterpretation(): { message: string, color: string, emoji: string } | null{
    if (this.predictionResult === null) return null;
  
    if (this.predictionResult > 70) {
      return {
        color: '#28a745',
        emoji: '✅',
        message:
          'A high percentage of renewable energy is used here, demonstrating a strong commitment to clean energy and sustainable operations. This contributes meaningfully to reducing your carbon footprint and enhancing your environmental credibility.'
      };
    } else if (this.predictionResult >= 30) {
      return {
        color: '#ffc107',
        emoji: '⚠️',
        message:
          'This process relies partially on renewable energy, which is a good step forward. However, increasing the share of renewables could significantly strengthen your sustainability strategy.'
      };
    } else {
      return {
        color: '#dc3545',
        emoji: '⚠️',
        message:
          'The current use of renewable energy is limited, which may hinder your environmental performance. Transitioning toward cleaner energy sources is essential for lowering emissions and meeting evolving sustainability standards in the agri-food sector.'
      };
    }
  }  
}
