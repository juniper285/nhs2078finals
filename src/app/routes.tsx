import { createBrowserRouter } from 'react-router';
import { LandingPage } from './pages/LandingPage';
import { ReadingPage } from './pages/ReadingPage';
import { BrowsePage } from './pages/BrowsePage';
import { CardDetailPage } from './pages/CardDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/reading',
    Component: ReadingPage,
  },
  {
    path: '/browse',
    Component: BrowsePage,
  },
  {
    path: '/card/:id',
    Component: CardDetailPage,
  },
]);
