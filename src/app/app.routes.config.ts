export const ROOT_PATH = '/admin';
export const AppRouteConfig = {
  DASHBOARD: { rootPath: ROOT_PATH, path: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  VEHICLES: { rootPath: ROOT_PATH, path: 'vehicles', label: 'Vehicles', icon: 'car' },
  SESSIONS: { rootPath: ROOT_PATH, path: 'sessions', label: 'Sessions', icon: 'schedule' },
  INSTRUCTORS: {
    rootPath: ROOT_PATH,
    path: 'instructors',
    label: 'Instructors',
    icon: 'experiment',
  },
  TRAINEES: { rootPath: ROOT_PATH, path: 'trainees', label: 'Trainees', icon: 'smile' },
  USERS: { rootPath: ROOT_PATH, path: 'users', label: 'Users', icon: 'control' },
};
