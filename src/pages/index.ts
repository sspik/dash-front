import { lazy } from 'react';

export const Dashboard = lazy(() => import('./dashboard'));
export const Feed = lazy(() => import('./feed'));
export const Group = lazy(() => import('./group'));
export const Positions = lazy(() => import('./positions'));
export const Search = lazy(() => import('./search'));
export const Task = lazy(() => import('./task'));
export const Metrics = lazy(() => import('./metrics'));
export const Admin = lazy(() => import('./admin'));
