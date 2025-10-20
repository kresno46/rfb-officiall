import axios from 'axios';

// Gunakan API route Next.js
const API_URL = '/api/banners';

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
    const response = await axios.get<Banner[]>(API_URL);
    // Hanya ambil banner yang aktif dan urutkan berdasarkan order
    return response.data
      .filter((banner: Banner) => banner.is_active)
      .sort((a: Banner, b: Banner) => a.order - b.order);
  } catch (error) {
    console.error('Error fetching banners:', error);
    // Jika error 401 (Unauthorized), redirect ke halaman login
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      window.location.href = '/login';
    }
    // Kembalikan array kosong jika terjadi error untuk menghindari crash
    return [];
  }
};
