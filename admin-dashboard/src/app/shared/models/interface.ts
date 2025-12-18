export interface CommonData {
  id: number;
  name: string;
  status: boolean;
}

export interface User extends CommonData {
  email: string;
  password: number;
  role: string;
}

export interface State extends CommonData {
  tenants_count?: number;
}

export interface City extends CommonData {
  state_id: number;
  pincode?: string;
  stateName: string;
  tenantCount?: number;
}

export interface SubscriptionTypes extends CommonData {
  price: number;
  duration: string;
  created_at: Date;
  updated_at: Date;
}

export interface Settings {
  key: string;
  value: string;
  status?: boolean;
}

export interface Application extends CommonData {
  title: string;
  subtitle?: string;
  description?: string;
  button1_text?: string;
  button1_url?: string;
  button2_text?: string;
  button2_url?: string;
  image?: string;
}

export interface HeroSection extends Application {
  rating?: number;
  customers_count?: string;
}

export interface OurServices extends Application { }

export interface Templates extends Application {
  additional_images?: string[];
}

export interface ImageItem {
  url: string;
  selected: boolean;
}
