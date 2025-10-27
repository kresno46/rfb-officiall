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
    const response = await api.get<{
      success: boolean;
      message: string;
      data: Career;
    }>(`/karier/${slug}`);
    
    if (response.data.success) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching career with slug ${slug}:`, error);
    return null;
  }
};
