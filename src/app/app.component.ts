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

  isRaceLoading: boolean = false;
  isRaceLoaded: boolean  = false;

  isClassLoading: boolean = false;
  isClassLoaded: boolean  = false;

  isSpecLoading: boolean = false;
  isSpecLoaded: boolean  = false;

  isHeroLoading: boolean = false;
  isHeroLoaded: boolean  = false;

  classes: any;
  url: string = '../assets/classes.json';

  randomClass: any;
  randomSpec: any;
  randomHero: any;
  randomRace: any;

  getRandomSelection() {
    this.isRaceLoaded = false;
    this.isClassLoaded = false;
    this.isSpecLoaded = false;
    this.isHeroLoaded = false;

    fetch(this.url).then(response => response.json())
      .then(results => {


        this.classes = results;

        this.randomClass = this.classes[Math.floor(Math.random() * this.classes.length)];

        this.randomSpec = this.randomClass.specs[Math.floor(Math.random() * this.randomClass.specs.length)];

        this.randomHero = this.randomSpec.hero[Math.floor(Math.random() * this.randomSpec.hero.length)];

        this.randomRace = this.randomClass.races[Math.floor(Math.random() * this.randomClass.races.length)];
        
        this.isResponseShown = true;

        this.isRaceLoading = true;

        setTimeout(() => {
          this.isRaceLoading = false;
          this.isRaceLoaded = true;
          
          this.isClassLoading = true;
        }, 2000);

        setTimeout(() => {
          this.isClassLoading = false;
          this.isClassLoaded = true;

          this.isSpecLoading = true;
        }, 4000);

        setTimeout(() => {
          this.isSpecLoading = false;
          this.isSpecLoaded = true;

          this.isHeroLoading = true;
        }, 6000);

        setTimeout(() => {
          this.isHeroLoading = false;
          this.isHeroLoaded = true;
        }, 8000);
      });

  }
}
