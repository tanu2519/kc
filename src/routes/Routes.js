import { Spin } from 'antd';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import getConfig from '../helper.js/routes';
import config from './config';
//import styles from './loaderStyle.module.scss';

function Routes() {
  const Load = () => {
    return (
      <div>
        <Spin size="large" />
      </div>
    );
  };

  // Generate routes using config
  const routes = useRoutes(getConfig(config));

  return (
    <Suspense fallback={<Load />}>
      {routes}
    </Suspense>
  );
}

export default Routes;
