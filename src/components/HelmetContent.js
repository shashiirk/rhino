import { useContext } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { ThemeContext } from '../store/ThemeContext';

const HelmetContent = () => {
  const themeCtx = useContext(ThemeContext);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta
          name="theme-color"
          content={themeCtx.dark ? '#202831' : '#f6f4f7'}
        />
      </Helmet>
    </HelmetProvider>
  );
};

export default HelmetContent;
