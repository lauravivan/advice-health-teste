interface ConsultationInfo {
  price: string;
}

export interface Professional {
  id: string;
  fullName: string;
  crm: string;
  specialty: string;
  consultation_info?: ConsultationInfo;
  payment_options?: string[];
  acceptsInsurance: boolean;
}
