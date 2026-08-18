enum RestrictionsEnum {
  RequiresAuth = "RequiresAuth",
}

interface RouteConfig {
  pathname: string;
  search?: string;
  hash?: string;
  meta?: { restrictions: RestrictionsEnum[] };
}

export default {
  navigateToProfessionals: {
    home: (): RouteConfig => ({ pathname: "/profissionais" }),
    register: (): RouteConfig => ({ pathname: "/profissionais/cadastrar" }),
  },
} as const;
