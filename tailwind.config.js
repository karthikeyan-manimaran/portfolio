/** Tailwind config — "Night Flight" theme: slate stage · ice-blue signal · wide display type */
module.exports = {
  content: ['./index.html', './projects.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        void: '#080b10',     // page — blue-black
        surface: '#0c1119',  // sections / panels
        raise: '#121925',    // cards
        fg: '#e8eef6',       // text
        dim: '#8794a8',      // secondary text (blue-grey)
        ice: '#a8c7ff',      // signal accent (cool ice blue)
        steel: '#7f9cc7',    // secondary accent (simulation, diagrams)
      },
      fontFamily: {
        display: ['Unbounded', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { page: '1280px' },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        hover: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        shadow: { '0%,100%': { transform: 'scaleX(1)', opacity: '.75' }, '50%': { transform: 'scaleX(.86)', opacity: '.45' } },
        rise: { from: { opacity: 0, transform: 'translateY(26px)' }, to: { opacity: 1, transform: 'none' } },
        blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: .2 } },
        spin: { to: { transform: 'rotate(360deg)' } },
        sweep: { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        hover: 'hover 6s ease-in-out infinite',
        shadow: 'shadow 6s ease-in-out infinite',
        rise: 'rise .9s cubic-bezier(.2,.7,.2,1) both',
        blink: 'blink 1.4s infinite',
        'spin-slow': 'spin 40s linear infinite',
        sweep: 'sweep 6s linear infinite',
      },
    },
  },
  plugins: [],
};
