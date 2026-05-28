import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

interface SobEvent {
  title: string;
  date: string;
  description: string;
  image: string;
  link: string;
}

@Component({
  selector: 'app-landing',
  imports: [RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  readonly auth = inject(AuthService);
  // Official Special Olympics Belgium photo (special-olympics.be).
  readonly heroImage =
    'https://special-olympics.be/wp-content/uploads/2021/03/%C2%A9GerbrandVanUytvanck_WSGAbuDhabi2019_SpecialOlympicsBelgium_140319_002.jpg';

  // Events and images sourced from https://special-olympics.be/fr/
  readonly events: SobEvent[] = [
    {
      title: 'Jeux Nationaux 2026',
      date: '2026 — Hautes Fagnes',
      description:
        "Les Jeux Nationaux de Special Olympics Belgium arrivent dans la région des Hautes Fagnes — des milliers d'athlètes en compétition dans de nombreux sports.",
      image:
        'https://special-olympics.be/wp-content/uploads/2022/02/%C2%A9GerbrandVanUytvanck_WSGAbuDhabi2019_SpecialOlympicsBelgium_170319_114.jpg',
      link: 'https://nationalgames.special-olympics.be/?lang=fr',
    },
    {
      title: 'Special Olympics Cycling Series 2026',
      date: '2026 — Partout en Belgique',
      description:
        'Une initiative cycliste nationale qui met en lumière le talent et la détermination de nos athlètes.',
      image:
        'https://special-olympics.be/wp-content/uploads/2026/03/CYCLING-SERIES-RGB.jpg',
      link: 'https://cyclingseries.special-olympics.be/fr/',
    },
    {
      title: 'Corporate Cycling Challenge',
      date: '2026',
      description:
        'Les entreprises pédalent ensemble et 10 € par participant sont reversés à Special Olympics Belgium.',
      image:
        'https://special-olympics.be/wp-content/uploads/2026/03/corporatecyclingchallenge.jpg',
      link: 'https://www.corporatecyclingchallenge.be/',
    },
  ];
}
