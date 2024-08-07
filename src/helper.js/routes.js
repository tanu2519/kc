function getConfig(config = []) {
    return config.map((route) => ({
      path: route.pagePath || '',
      element: route.element || null,
      children: route.views?.map((view) => ({
        path: view.viewPath || '',
        element: view.element || null,
      })) || [],
    }));
  }

  export default getConfig;