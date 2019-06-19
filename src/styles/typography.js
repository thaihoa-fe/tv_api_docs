import Typography from 'typography';

const typography = new Typography({
  title: 'Trusting Social',
  baseFontSize: '16px',
  baseLineHeight: 1.5,
  scaleRatio: 2,
  googleFonts: [
    {
      name: 'Raleway',
      styles: ['400', '500', '600'],
    },
  ],
  headerFontFamily: ['Raleway', 'sans-serif'],
  bodyFontFamily: ['Raleway', 'sans-serif'],
  headerGray: 0,
  headerWeight: 600,
  bodyWeight: 400,
  boldWeight: 600,
});

export default typography;
