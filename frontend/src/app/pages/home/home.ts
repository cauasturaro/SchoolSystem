import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected readonly title = signal('frontend');
}
