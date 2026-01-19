
export interface ServiceInfo {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  address: string;
  serviceType: 'residential' | 'commercial' | 'emergency';
  details?: string;
}
