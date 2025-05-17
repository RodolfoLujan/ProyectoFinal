import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashbaord',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './admin-dashbaord.component.html',
  styleUrl: './admin-dashbaord.component.css'
})
export class AdminDashbaordComponent {}
