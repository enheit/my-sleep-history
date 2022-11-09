import './index.css';
import './i18n/i18n.config';

import { RouterProvider } from 'react-router-dom';

import { router } from './router/router.config';

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
