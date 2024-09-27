export interface Booking {
  id: number;
  booking_date: string;
  created_at?: string | null;
  master_id: number;
  service_id: number;
}

export interface Master {
  id: number;
  name: string;
}

export interface Service {
  id: number;
  label: string;
  value: string;
  duration_in_minutes: number;
  masters: Master[];
}

// Если нужна функциональность выбора сначала мастера, а потом услуги,
// типы можно изменить так, чтобы тип Services не включал в себя
// массив Мастеров (и наоборот), и создать
// отдельные типы ServicesWithMasters и MastersWithServices
