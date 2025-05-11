import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashbaord',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './admin-dashbaord.component.html',
  styleUrl: './admin-dashbaord.component.css'
})
export class AdminDashbaordComponent {

}
