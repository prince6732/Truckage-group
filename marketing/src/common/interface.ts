export interface HeroSectionData {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  rating?: number;
  customers_count?: string;
  button1_text?: string;
  button1_url?: string;
  button2_text?: string;
  button2_url?: string;
  image?: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface OurServiceData {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  button1_text?: string;
  button1_url?: string;
  button2_text?: string;
  button2_url?: string;
  image?: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface TemplateData {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  button1_text?: string;
  button1_url?: string;
  button2_text?: string;
  button2_url?: string;
  image?: string;
  additional_images?: string[];

}