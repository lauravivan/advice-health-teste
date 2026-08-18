interface ConsultationInfo {
  price: string;
  available_times: string[];
}

export interface Professional {
  id: string;
  name: string;
  crm: string;
  specialty: string;
  consultation_info?: ConsultationInfo;
  payment_options?: string[];
}
