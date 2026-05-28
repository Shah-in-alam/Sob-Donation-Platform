import { Component, signal } from '@angular/core';

export interface FutureEvent {
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class EventsPage {
  readonly selectedEvent = signal<FutureEvent | null>(null);

  readonly events: FutureEvent[] = [
    {
      title: 'Jeux Nationaux 2026',
      date: 'Summer 2026',
      location: 'Hautes Fagnes, Belgium',
      description: 'The National Games bring together thousands of athletes competing across 20+ sports. Supporters are invited to cheer on the teams live.',
      image: 'https://special-olympics.be/wp-content/uploads/2022/02/%C2%A9GerbrandVanUytvanck_WSGAbuDhabi2019_SpecialOlympicsBelgium_170319_114.jpg',
    },
    {
      title: 'Special Olympics Cycling Series 2026',
      date: 'Ongoing — 2026',
      location: 'Across Belgium',
      description: 'A national cycling initiative showcasing the talent and determination of SOB athletes on courses across the country.',
      image: 'https://special-olympics.be/wp-content/uploads/2026/03/CYCLING-SERIES-RGB.jpg',
    },
    {
      title: 'Corporate Cycling Challenge',
      date: '2026',
      location: 'Belgium',
      description: 'Companies pedal together and €10 per participant is donated to Special Olympics Belgium. A great way to support athletes and bond with your team.',
      image: 'https://special-olympics.be/wp-content/uploads/2026/03/corporatecyclingchallenge.jpg',
    },
    {
      title: 'World Games — Turin 2026',
      date: 'June 2026',
      location: 'Turin, Italy',
      description: 'Belgium sends its best athletes to compete at the Special Olympics World Games. Your support helps cover travel, accommodation, and uniforms.',
      image: '/trip.png',
    },
  ];

  open(event: FutureEvent): void { this.selectedEvent.set(event); }
  close(): void { this.selectedEvent.set(null); }
}
