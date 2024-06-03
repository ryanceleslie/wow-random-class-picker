import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Random Class Picker!';

  isResponseShown: boolean = false;

  isRaceLoadShown: boolean = false;
  isRaceShown: boolean  = false;

  isClassLoadShown: boolean = false;
  isClassShown: boolean  = false;

  isSpecLoadShown: boolean = false;
  isSpecShown: boolean  = false;

  isHeroLoadShown: boolean = false;
  isHeroShown: boolean  = false;

  classes: any;
  url: string = '../assets/classes.json';

  randomClass: any;
  randomSpec: any;
  randomHero: any;
  randomRace: any;

  getRandomSelection() {
    fetch(this.url).then(response => response.json())
      .then(results => {

        this.isResponseShown = true;
        this.isRaceLoadShown = true;
        



        this.classes = results;

        this.randomClass = this.classes[Math.floor(Math.random() * this.classes.length)];

        this.randomSpec = this.randomClass.specs[Math.floor(Math.random() * this.randomClass.specs.length)];

        this.randomHero = this.randomSpec.hero[Math.floor(Math.random() * this.randomSpec.hero.length)];

        this.randomRace = this.randomClass.races[Math.floor(Math.random() * this.randomClass.races.length)];

        setTimeout(() => {
          this.isRaceLoadShown = false;
          this.isRaceShown = true;
          this.isClassLoadShown = true;
        }, 2000);

        setTimeout(() => {
          this.isClassLoadShown = false;
          this.isClassShown = true;
          this.isSpecLoadShown = true;
        }, 4000);

        setTimeout(() => {
          this.isSpecLoadShown = false;
          this.isSpecShown = true;
          this.isHeroLoadShown = true;
        }, 6000);

        setTimeout(() => {
          this.isHeroLoadShown = false;
          this.isHeroShown = true;
        }, 8000);
      });

  }
}
