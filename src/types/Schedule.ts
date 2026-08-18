export interface Schedule {
  professional: string;
  pacient: {
    fullName: string;
    cpf: string;
    birthDate: Date;
    address: {
      street: string;
      number: number;
      cep: string;
      additionalInfo: string;
      neighborhood: string;
      city: string;
    };
    additionalInfo: string;
  };
  paymentInfo: {
    method: 'PIX' | 'CREDIT-CARD' | 'MONEY'
  };
}
