# SOB Supporter Platform - Technical README

## Project Overview

A membership platform for Special Olympics Belgium that allows supporters to:
- Track their daily fitness activity (steps)
- Compete on leaderboards with other supporters
- Join team challenges by their favorite club
- See the direct impact of their monthly €9.99 contribution
- Build community with other supporters

The platform has two tiers:
- **Free Tier:** Landing page with program information (no participation)
- **Paid Tier (€9.99/month):** Full access to games, leaderboards, and community

---

## Core Functionalities

### 1. User Authentication
- Sign up with email and password
- Select favorite club during registration
- Secure login/logout
- Password reset via email
- Profile management and settings

### 2. Membership Management
- Donate to €9.99/month membership via Stripe
- View current membership status
- See total amount contributed
- Cancel anytime

### 3. Step Tracking (Members Only)
- Sync with Apple Health (iPhone)
- Sync with Google Fit (Android)
- View daily, weekly, and monthly step history
- Track personal streaks (consecutive days logged)
- See total distance in kilometers (1km = 1,250 steps)

### 4. Monthly Challenges (Members Only)
- Join a team based on your favorite club
- Track team progress toward milestones
- See how many kilometers team needs to next milestone

### 5. SOB Updates, Mission and Impact Stories (Members Only)
- Regular updates on athletes, clubs, and events
- Stories showing how supporter contributions are making a difference
- Upcoming events and how to get involved etc...

### 6. Leaderboards (Members Only)

**Individual Rankings:**
- See where you rank among all 500+ supporters
- View top 100 supporters by total kilometers
- See your rank change week-to-week (up/down arrows)
- Your rank is highlighted

**Team Rankings:**
- See how your club's team ranks vs other clubs

**Streak Leaderboard:**
- Who has logged steps most consecutive days
- Resets monthly for fresh competition

### 7. Monthly Impact Reports (Members Only)
- Every month, members receive a report showing:
  - Total amount they contributed (e.g., €9.99)
  - What that money funded (equipment, coaching, events, transportation)
  - How many athletes were impacted
  - Which clubs received support
  - Progress toward annual goals
