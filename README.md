# FOUND Performance Scorecard

React app converted from the original HTML scorecard.

## Project Structure

```
found-scorecard/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── logo.svg          ← Add your FOUND logo here
└── src/
    ├── main.jsx           ← Entry point
    ├── App.jsx
    ├── components/
    │   └── Scorecard.jsx  ← Main component (all screens)
    ├── models/
    │   ├── questions.js   ← Question data + dims config
    │   └── scoring.js     ← Scoring logic + tier calculations
    └── styles/
        └── scorecard.css  ← All styles (converted from original)
```

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Notes

- Add your `logo.svg` to the `/public` folder
- CTA button `href` values are set to `#` — update in `Scorecard.jsx` in the `ResultsScreen` component
- Google Fonts (DM Sans + DM Serif Display) are loaded via CDN in `index.html`
