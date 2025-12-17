import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard-component').then((m) => m.DashboardComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            '../../../shared/components/dashboard/dashboard-component'
          ).then((m) => m.DashboardComponent),
      },
      {
        path: 'subscription-types',
        loadComponent: () =>
          import(
            '../../../features/pages/subscription-types/subscription-type-list/subscription-type-list-component'
          ).then((m) => m.SubscriptionTypeListComponent),
      },
      {
        path: 'locations',
        loadComponent: () =>
          import(
            '../../../features/pages/location-management/states/state-list/state-list-component'
          ).then((m) => m.StateListComponent),
      },
      {
        path: 'locations/:state_id/cities',
        loadComponent: () =>
          import(
            '../../../features/pages/location-management/cities-by-state/cities-list/cities-list-component'
          ).then((m) => m.CitiesListComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('../../../features/pages/settings/setting-list/setting-list-component').then(
            (m) => m.SettingListComponent
          ),
      },
      {
        path: 'hero-section',
        loadComponent: () =>
          import('../../../features/pages/hero-section/hero-section-list/hero-section-list-component').then(
            (m) => m.HeroSectionListComponent
          ),
      },
      {
        path: 'our-services',
        loadComponent: () =>
          import('../../../features/pages/our-services/our-services-list/our-services-list-component').then(
            (m) => m.OurServicesListComponent
          ),
      },
      {
        path: 'templates-management',
        loadComponent: () =>
          import('../../../features/pages/templates-management/templates-list/templates-list-component').then(
            (m) => m.TemplatesListComponent
          ),
      },
    ],
  },
];
