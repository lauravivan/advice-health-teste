export const Restrictions = {
  RequiresAuth: 'RequiresAuth',
} as const;

type RestrictionsEnum = (typeof Restrictions)[keyof typeof Restrictions];

interface RouteConfig {
  pathname: string;
  search?: string;
  hash?: string;
  meta?: { restrictions: RestrictionsEnum[] };
}

export default {
  navigateToProfessionals: {
    home: (): RouteConfig => ({ pathname: '/profissionais' }),
    register: (): RouteConfig => ({ pathname: '/profissionais/cadastrar' }),
  },
  navigateToSchedules: {
    home: (): RouteConfig => ({ pathname: '/agendamentos' }),
  },
} as const;
