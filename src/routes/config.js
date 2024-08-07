import { lazy } from 'react';
import { ROLES } from "../constants/global";
import withKeycloakAccess from "../hocs/withKeycloakAccess";
import withAuthentication from '../hooks/RenderOnAuthenticated';

// Lazily import components
const Page1 = lazy(() => import('../components/Page1/page1'));
const Page2 = lazy(() => import('../components/Page2/page2'));

// Wrap components with HOC
const Page1withKeycloakAccess = withKeycloakAccess(Page1);
const Page2withKeycloakAccess = withAuthentication(Page2);

// Config array for routes
const config = [
    {
        pagePath: '/page1',
        element: <Page1withKeycloakAccess />, // Use wrapped component
    },
    {
        pagePath: '/page2',
        element: <Page2withKeycloakAccess />, // Use wrapped component
    }
];

export default config;

// import { lazy } from 'react';
// import { ROLES } from "../constants/global";
// import withKeycloakAccess from "../hocs/withKeycloakAccess";

// const Page1withKeycloakAccess = lazy(() => import('../components/Page1/page1'));
// const Page2withKeycloakAccess = lazy(() => import('../components/Page2/page2'));

// const kc1 = withKeycloakAccess(Page1withKeycloakAccess, [ROLES.DP] )
// const kc2 = withKeycloakAccess(Page2withKeycloakAccess, [ROLES.DPB] )

// const config = [
//     {
//         pagePath: '/page1',
//         element: <kc1 />,
//     },
//     {
//         pagePath: '/page2',
//         element: <kc1 />,
//     }
// ];

// export default config;
