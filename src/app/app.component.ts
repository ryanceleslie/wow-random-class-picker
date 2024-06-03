import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Random Class Picker!';

  classes: any;
  url: string = '../assets/classes.json';

  randomClass: any;
  randomSpec: any;
  randomRace: any;

  getRandomSelection() {
    fetch(this.url).then(response => response.json())
      .then(results => {

        this.classes = results;

        this.randomClass = this.classes[Math.floor(Math.random() * this.classes.length)];

        this.randomSpec = this.randomClass.specs[Math.floor(Math.random() * this.randomClass.specs.length)];
        this.randomRace = this.randomClass.races[Math.floor(Math.random() * this.randomClass.races.length)];

      });

  }
}
