export interface Schedule {
  id: string;
  professional: string;
  date: string;
  patient: {
    fullName: string;
    cpf: string;
    birthDate: string;
    address: {
      street: string;
      number: string;
      cep: string;
      additionalInfo: string | null;
      neighborhood: string;
      city: string;
    };
    additionalInfo: string;
  };
  paymentInfo: {
    method: string;
    installments?: string;
  };
  status: string;
  transferred: boolean;
  price: string;
}
