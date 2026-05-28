import { Component } from '@angular/core';

interface Post {
  title: string;
  date: string;
  summary: string;
  image: string;
  tag: string;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class NewsPage {
  readonly posts: Post[] = [
    {
      title: 'Athletes travel to the World Games in Turin',
      date: 'May 24, 2026',
      summary: '18 Belgian athletes flew to Turin, Italy for the Special Olympics World Games. Supporters like you made this trip possible — covering travel, accommodation, and uniforms for every athlete on the team.',
      image: '/trip.png',
      tag: 'Trip',
    },
    {
      title: 'National Games 2026 — Registration Open',
      date: 'May 15, 2026',
      summary: 'Over 3,000 athletes compete across 20+ sports at Hautes Fagnes this summer. Volunteer spots still available!',
      image: 'https://special-olympics.be/wp-content/uploads/2021/03/%C2%A9GerbrandVanUytvanck_WSGAbuDhabi2019_SpecialOlympicsBelgium_140319_002.jpg',
      tag: 'Event',
    },
    {
      title: 'Cycling Series kicks off in Antwerp',
      date: 'May 10, 2026',
      summary: 'The 2026 Cycling Series opened with 120 participants. Sarah Janssen finished the 20 km route in record time.',
      image: 'https://special-olympics.be/wp-content/uploads/2026/03/CYCLING-SERIES-RGB.jpg',
      tag: 'Event',
    },
    {
      title: 'Meet our new head coach: Jan Willems',
      date: 'May 5, 2026',
      summary: 'Jan brings 15 years of inclusive-sports experience. He joins SOB to lead the national athletics programme.',
      image: 'https://special-olympics.be/wp-content/uploads/2022/02/%C2%A9GerbrandVanUytvanck_WSGAbuDhabi2019_SpecialOlympicsBelgium_170319_114.jpg',
      tag: 'Team',
    },
  ];
}
