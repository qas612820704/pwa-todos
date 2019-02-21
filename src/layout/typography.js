import Typography from 'typography';
import theme from 'typography-theme-wordpress-2015';
import 'typeface-noto-sans';

const typography = new Typography({
  ...theme,
  headerFontFamily: ['Noto Sans'],
  bodyFontFamily: ['Noto Sans'],
});

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
