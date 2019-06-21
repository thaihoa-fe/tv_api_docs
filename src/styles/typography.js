import Typography from 'typography';

const typography = new Typography({
  title: 'Trusting Social',
  baseLineHeight: 1.5,
  scaleRatio: 2,
  headerFontFamily: ['Roboto', 'sans-serif'],
  bodyFontFamily: ['Roboto', 'sans-serif'],
  headerGray: 0,
  headerWeight: 600,
  bodyWeight: 400,
  boldWeight: 700,
  bodyColor: '#242A31',
  googleFonts: [
    {
      name: 'Roboto',
      styles: ['300', '400', '500', '700'],
    },
    {
      name: 'Source Code Pro',
      styles: ['300', '400', '500', '600'],
    },
  ],
});

export default typography;
