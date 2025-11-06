import axios from 'axios';

const API_URL = 'https://rfbdev.newsmaker.id/api';

export interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const getBanners = async (): Promise<Banner[]> => {
  try {
    const response = await axios.get<Banner[]>(`${API_URL}/banners`);
    // Hanya ambil banner yang aktif dan urutkan berdasarkan order
    return response.data
      .filter((banner: Banner) => banner.is_active)
      .sort((a: Banner, b: Banner) => a.order - b.order);
  } catch (error) {
    console.error('Error fetching banners:', error);
    throw error;
  }
};
