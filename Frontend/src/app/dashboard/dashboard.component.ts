import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  userRole: string | null = null;
  dashboardUrl: string = '';
  dashboardTitle: string = 'Dashboard';
  baseUrl: string = "https://app.powerbi.com/reportEmbed?reportId=83fe79c8-c3b7-4924-b0ce-e94a71a8df62&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&filterPaneEnabled=false&navContentPaneEnabled=false"

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole');

    if (this.userRole === 'admin') {
      this.dashboardUrl = "https://app.powerbi.com/reportEmbed?reportId=83fe79c8-c3b7-4924-b0ce-e94a71a8df62&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&filterPaneEnabled=false"
    } else if (this.userRole === 'responsable maintenance') {
      this.dashboardUrl = this.baseUrl + '&pageName=ReportSection61ae3dcf6d0a3feb5ad1';
      this.dashboardTitle = "Equipments Maintenance Dashboard"
    } else if (this.userRole === 'responsable conformite') {
      this.dashboardUrl = this.baseUrl + '&pageName=ReportSection';
      this.dashboardTitle = "Environmental Compliance Dashboard"
    } else if (this.userRole === 'ingenieur efficacite') {
      this.dashboardUrl = this.baseUrl + '&pageName=ReportSectionb65549e9da75d3f0d846';
      this.dashboardTitle = "Energy Tracking Dashboard"
    } else {
      console.log("Rôle inconnu ou non connecté");
    }
  }
}