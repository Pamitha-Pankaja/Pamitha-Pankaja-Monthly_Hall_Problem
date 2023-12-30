import {Component, Injectable} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from "rxjs";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class AppComponent {


  private apiUrl = 'https://localhost:7246/WeatherForecast'; // Replace with your API endpoint
  private _http : HttpClient ;
  constructor( http: HttpClient) {
    this._http = http;
  }

  ngOnInit(): void {
    this.getData().subscribe((result) => {
        console.log(result);
        // Do something with the data
      });
    // this.getData();
  }
  //
  // @ts-ignore
  // http : HttpClient = new HttpClient();
  getData(): Observable<any> {
    return this._http.get<any>(this.apiUrl);
  }

  tempdoors: { prize: string, revealed: boolean, imagePath: string }[] = [
    { prize: 'Goat', revealed: false, imagePath: '../assets/montyhall.png' },
    { prize: 'Goat', revealed: false, imagePath: 'assets/montyhall.png' },
    { prize: 'Car', revealed: false, imagePath: 'assets/car.jpg' }
  ];
  doors:{ prize: string, revealed: boolean, imagePath: string }[] = [];

  shuffleArray() {
    for (let i = this.tempdoors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tempdoors[i], this.tempdoors[j]] = [this.tempdoors[j], this.tempdoors[i]];
    }
    return this.tempdoors;
  }

// Shuffle the array


  addRandomDoor() {
    const randomIndex = Math.floor(Math.random() * this.tempdoors.length);
    // let randomDoor = this.tempdoors[0];
    this.doors.push(this.tempdoors[0]);
    // let randomDoor = this.tempdoors[2];
    this.doors.push(this.tempdoors[2]);
    // let randomDoor = this.tempdoors[1];
    this.doors.push(this.tempdoors[1]);

  }




  selectedDoor: number | null = null;
  revealedGoatDoor: number | null = null;
  instructionMessage = 'Pick a Door!';
  showSwitchButton = false;

  pickDoor(index: number): void {

    // this.getData().subscribe((result) => {
    //   console.log(result);
    //   // Do something with the data
    // });
    this.doors = this.shuffleArray();
    if (this.selectedDoor === null) {
      this.selectedDoor = index;
      this.instructionMessage = 'You selected Door ' + (index + 1) + '. Revealing one of the doors with a goat...';

      const goatDoors: number[] = [];
      this.doors.forEach((door, i) => {
        if (door.prize === 'Goat' && i !== this.selectedDoor) {
          goatDoors.push(i);
        }
      });

      const randomGoatIndex = goatDoors[Math.floor(Math.random() * goatDoors.length)];
      this.revealedGoatDoor = randomGoatIndex;

      this.instructionMessage = `You selected Door ${index + 1}. Door ${randomGoatIndex + 1} has a goat. Do you want to switch or stay?`;

      this.showSwitchButton = true;
      this.doors[randomGoatIndex].revealed = true;
    }
  }

  switchDoor(switchDoor: boolean): void {
    if (this.selectedDoor !== null && this.revealedGoatDoor !== null) {
      let finalChoice = switchDoor ? 'Switched' : 'Stayed';
      const remainingDoor = [0, 1, 2].filter(door => door !== this.selectedDoor && door !== this.revealedGoatDoor)[0];

      if (this.doors[remainingDoor].prize === 'Car') {
        // this.doors[remainingDoor].revealed = true;
        this.instructionMessage = `Congratulations! You ${finalChoice} and won a car!`;
      } else {
        // this.doors[remainingDoor].revealed = true;
        this.instructionMessage = `Sorry! You ${finalChoice} and got a goat!`;
      }
      this.doors.forEach((door, i) => {
        door.revealed = true;
      });
      this.showSwitchButton = false;
    }
  }
}
