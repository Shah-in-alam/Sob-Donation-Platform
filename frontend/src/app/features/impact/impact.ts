import { Component } from '@angular/core';

interface ImpactMonth {
  month: string;
  amount: number;
  items: string[];
}

@Component({
  selector: 'app-impact',
  templateUrl: './impact.html',
  styleUrl: './impact.scss',
})
export class ImpactPage {
  readonly impactMonths: ImpactMonth[] = [
    {
      month: 'May 2026', amount: 10,
      items: [
        'Training equipment for 10 athletes',
        'Transport to 2 regional competitions',
        'Medal ceremonies for 48 participants',
      ],
    },
    {
      month: 'April 2026', amount: 10,
      items: [
        'Sports shoes for 6 athletes in need',
        'Venue rental for Ghent regional games',
        'Coaching workshop for 12 volunteers',
      ],
    },
    {
      month: 'March 2026', amount: 10,
      items: [
        'Team jerseys for Antwerp Athletics',
        'Healthy Athletes screening — 30 athletes',
        'Swimming gear for 8 swimmers',
      ],
    },
  ];

  readonly totalDonated = this.impactMonths.reduce((s, m) => s + m.amount, 0);
  readonly totalAthletes = 124;
}
