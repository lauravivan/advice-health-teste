interface ConsultationInfo {
  procedure: string;
  price: string;
  address: string;
  available_times: string[];
}

export interface Professional {
  id: string;
  name: string;
  crm: string;
  bio: string;
  specialty: string;
  expertise: string;
  experience_years: number;
  education: string;
  phone: string;
  consultation_info: ConsultationInfo;
  payment_options: string[];
  picture: string;
}