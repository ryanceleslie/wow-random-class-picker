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

  tankFilter:boolean = true;
  meleedpsFilter:boolean = true;
  rangedpsFilter:boolean = true;
  healerFilter:boolean = true;
  allianceFilter:boolean = true;
  hordeFilter:boolean = true;

  deathknightFilter:boolean = true;
  demonhunterFilter:boolean = true;
  druidFilter:boolean = true;
  evokerFilter:boolean = true;
  hunterFilter:boolean = true;
  mageFilter:boolean = true;
  monkFilter:boolean = true;
  paladinFilter:boolean = true;
  priestFilter:boolean = true;
  rogueFilter:boolean = true;
  shamanFilter:boolean = true;
  warlockFilter:boolean = true;
  warriorFilter:boolean = true;

  isResponseShown: boolean = false;

  isRaceLoading: boolean = false;
  isRaceLoaded: boolean  = false;

  isClassLoading: boolean = false;
  isClassLoaded: boolean  = false;

  isSpecLoading: boolean = false;
  isSpecLoaded: boolean  = false;

  isHeroLoading: boolean = false;
  isHeroLoaded: boolean  = false;

  isPreviousEntriesLoaded: boolean = false;

  classes: any;
  url: string = '../assets/classes.json';

  randomClass: any;
  randomSpec: any;
  randomHero: any;
  randomRace: any;

  previousEntries: any;

  removeRole(keep:boolean, role:string, classes:any){
    if (!keep) {
      classes.forEach((c:any) => {
        c.specs = c.specs.filter((s:any) =>  {
          return s.role !== role;
        });
      });

      // remove pure classes
      if (role == "meleedps") {
        classes = this.removeClass(false, "Rogue", classes);
      }
      if (role == "rangedps") {
        classes = this.removeClass(false, "Mage", classes);
        classes = this.removeClass(false, "Warlock", classes);
      }
    }

    return classes;
  }

  removeFaction(keep:boolean, faction:string, classes:any){
    if (!keep){
      classes.forEach((c:any) => {
        c.races = c.races.filter((s:any) =>  {
          return s.faction !== faction;
        });
      });
    }

    return classes;
  }

  removeClass(keep:boolean, name:string, classes:any){
    if (!keep) {
      classes = classes.filter((c:any) =>  {
        return c.name !== name;
      });
    }

    return classes;
  }

  getRandomSelection() {
    // Reset boxes
    this.isRaceLoaded = false;
    this.isClassLoaded = false;
    this.isSpecLoaded = false;
    this.isHeroLoaded = false;

    // validation
    if(!this.tankFilter && !this.meleedpsFilter && !this.rangedpsFilter && !this.healerFilter){
      alert('Select at least one role');
      return;
    }

    if (!this.deathknightFilter && !this.demonhunterFilter && !this.druidFilter && !this.evokerFilter 
      && !this.hunterFilter && !this.mageFilter && !this.monkFilter && !this.paladinFilter 
      && !this.priestFilter && !this.rogueFilter && !this.shamanFilter && !this.warlockFilter 
      && !this.warriorFilter) {
      alert('Select at least one class');
      return;
    }

    // add to prevous entries
    if (this.previousEntries === undefined){
      this.previousEntries = [{
        "icon": "",
        "class": "",
        "race": "",
        "spec": "",
        "hero": ""
      }];
    }
    else {
      // show previous entries
      this.isPreviousEntriesLoaded = true;
      this.previousEntries.push({
        "icon": this.randomClass.icon,
        "class": this.randomClass.name,
        "race": this.randomRace.name,
        "spec": this.randomSpec.name,
        "hero": this.randomHero
      });
    }

    // it's late and I can't figure out a better way to do the above code for previous entries
    this.previousEntries = this.previousEntries.filter((e:any) =>  {
      return e.icon !== "";
    })

    fetch(this.url).then(response => response.json())
      .then(results => {


        // based on filters do another search, there's a better way to do this I am sure, but I can't find it right now
        results = this.removeRole(this.tankFilter, 'tank', results);
        results = this.removeRole(this.meleedpsFilter, 'meleedps', results);
        results = this.removeRole(this.rangedpsFilter, 'rangedps', results);
        results = this.removeRole(this.healerFilter, 'healer', results);

        results = this.removeFaction(this.allianceFilter, "alliance", results);
        results = this.removeFaction(this.hordeFilter, "horde", results);
        
        // remove by class
        results = this.removeClass(this.deathknightFilter, "Death Knight", results);
        results = this.removeClass(this.demonhunterFilter, "Demon Hunter", results);
        results = this.removeClass(this.druidFilter, "Druid", results);
        results = this.removeClass(this.evokerFilter, "Evoker", results);
        results = this.removeClass(this.hunterFilter, "Hunter", results);
        results = this.removeClass(this.mageFilter, "Mage", results);
        results = this.removeClass(this.monkFilter, "Monk", results);
        results = this.removeClass(this.paladinFilter, "Paladin", results);
        results = this.removeClass(this.priestFilter, "Priest", results);
        results = this.removeClass(this.rogueFilter, "Rogue", results);
        results = this.removeClass(this.shamanFilter, "Shaman", results);
        results = this.removeClass(this.warlockFilter, "Warlock", results);
        results = this.removeClass(this.warriorFilter, "Warrior", results);
        

        // Choose random optuons
        this.classes = results;

        this.randomClass = this.classes[Math.floor(Math.random() * this.classes.length)];
        this.randomSpec = this.randomClass.specs[Math.floor(Math.random() * this.randomClass.specs.length)];
        this.randomHero = this.randomSpec.hero[Math.floor(Math.random() * this.randomSpec.hero.length)];
        this.randomRace = this.randomClass.races[Math.floor(Math.random() * this.randomClass.races.length)];

        // Start the display feature
        this.isResponseShown = true;
        this.isRaceLoading = true;

        setTimeout(() => {
          this.isRaceLoading = false;
          this.isRaceLoaded = true;
          
          // 'load' next step
          this.isClassLoading = true;
        }, 2000);

        setTimeout(() => {
          this.isClassLoading = false;
          this.isClassLoaded = true;

          // 'load' next step
          this.isSpecLoading = true;
        }, 4000);

        setTimeout(() => {
          this.isSpecLoading = false;
          this.isSpecLoaded = true;

          // 'load' next step
          this.isHeroLoading = true;
        }, 6000);

        setTimeout(() => {
          this.isHeroLoading = false;
          this.isHeroLoaded = true;
        }, 8000);
      });
  }
}
