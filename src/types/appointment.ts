export interface Appointment {
  id: number;
  client_id: string;
  service_id: number;
  appointment_date: string;
  status: string;
  created_at: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  notes: string | null;
  service?: {
    name: string;
    price: number;
    duration: number;
  };
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';