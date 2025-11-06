const API_URL = 'https://rfbdev.newsmaker.id/api';

export interface WakilPialang {
    id: number;
    nama: string;
    nomor_izin: string;
    status: string;
    category_id: string;
    created_at: string;
    updated_at: string;
    kategori_wakil_pialang: {
        id: number;
        slug: string;
        nama_kategori: string;
    };
}

export interface KategoriWakilPialang {
    id: number;
    slug: string;
    nama_kategori: string;
}

export const getWakilPialangByKategori = async (kategoriId: number): Promise<WakilPialang[]> => {
    // First get all wakil pialang
    const response = await fetch(`${API_URL}/wakil-pialang`);
    if (!response.ok) {
        throw new Error('Gagal mengambil data wakil pialang');
    }
    
    const allWakilPialang = await response.json();
    
    // If no specific category ID is provided, return all
    if (!kategoriId) {
        return allWakilPialang;
    }
    
    // Get the category name from the ID
    const kategoriList = await getKategoriWakilPialang();
    const kategori = kategoriList.find(k => k.id === kategoriId);
    
    if (!kategori) {
        return [];
    }
    
    // Filter by category name
    return allWakilPialang.filter((item: WakilPialang) => 
        item.kategori_wakil_pialang?.nama_kategori?.toLowerCase() === kategori.nama_kategori.toLowerCase()
    );
};

export const getKategoriWakilPialang = async (): Promise<KategoriWakilPialang[]> => {
    const response = await fetch(`${API_URL}/kategori-wakil-pialang`);
    if (!response.ok) {
        throw new Error('Gagal mengambil data kategori wakil pialang');
    }
    return response.json();
};
