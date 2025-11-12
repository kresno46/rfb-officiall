import api from './api';

export interface Career {
  id: number;
  nama_kota: string;
  posisi: string;
  slug: string;
  jenis_pekerjaan?: string;
  responsibilities: string | null;
  qualifications: string | null;
  created_at: string;
  updated_at: string;
}

export const fetchCareers = async (): Promise<Career[]> => {
  try {
    const response = await api.get<{
      success: boolean;
      message: string;
      data: Career[];
    }>('/karier');
    
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error('Gagal mengambil data karier');
  } catch (error) {
    console.error('Error fetching careers:', error);
    throw error;
  }
};

export const fetchCareerBySlug = async (slug: string): Promise<Career | null> => {
  try {
    console.log(`Fetching career with slug: ${slug}`);
    const response = await api.get<{
      success: boolean;
      message: string;
      data: Career;
    }>(`/karier/slug/${slug}`);
    
    console.log('Career API response:', response.data);
    
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    console.warn(`No data found for slug: ${slug}`);
    return null;
  } catch (error: any) {
    console.error(`Error fetching career with slug ${slug}:`, {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
    return null;
  }
};
