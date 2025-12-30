import type { ReactNode } from 'react';
import EditorPage from './pages/EditorPage';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Busya Code Editor',
    path: '/',
    element: <EditorPage />
  }
];

export default routes;
