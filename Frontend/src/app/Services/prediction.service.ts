import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  private apiUrl = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) { }

  predict_image(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl + "predict_image", formData);
  }

  predict_carbon_footprint(features: number[]) {
    return this.http.post<any>(this.apiUrl + "predict_carbon_footprint", { features });
  }

  predictEnergy(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/predict_energy`, data);
  }
}
