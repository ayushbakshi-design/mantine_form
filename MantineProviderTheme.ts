// theme.ts
import {
    createTheme,
    DEFAULT_THEME,
    mergeMantineTheme,
  } from '@mantine/core';
  
  const themeOverride = createTheme({
    primaryColor: 'orange',
    defaultRadius: 0,
  });
  
  const MantineProviderTheme = mergeMantineTheme(DEFAULT_THEME, themeOverride);


  export default MantineProviderTheme;