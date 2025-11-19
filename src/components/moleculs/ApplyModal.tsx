import React, { useState, useRef } from 'react';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  position: string;
  city: string;
  karierId?: number;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose, position, city, karierId = 0 }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    experience: '',
    noticePeriod: '',
    position: position,
    vacancySource: '',
    motivation: '',
    termsAccepted: false,
    cvFile: null as File | null
  });
  
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    
    if (name === 'phone') {
      // Only allow numbers and + at the beginning
      const value = target.value.replace(/[^0-9+]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } else if (target.type === 'file' && target.files && target.files[0]) {
      const file = target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB');
        return;
      }
      setFileName(file.name);
      setFormData(prev => ({
        ...prev,
        cvFile: file
      }));
    } else {
      const value = target.type === 'checkbox' ? target.checked : target.value;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleCustomButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      alert('Anda harus menyetujui syarat dan ketentuan');
      return;
    }

    const formDataToSend = new FormData();
    
    // Add form data
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && key !== 'cvFile') {
        // Handle different value types
        if (typeof value === 'string' || value instanceof Blob) {
          formDataToSend.append(key, value);
        } else if (typeof value === 'number' || typeof value === 'boolean') {
          formDataToSend.append(key, value.toString());
        } else if (value !== undefined) {
          formDataToSend.append(key, String(value));
        }
      }
    });
    
    // Add karier_id if provided
    if (karierId) {
      formDataToSend.append('karier_id', karierId.toString());
    } else {
      console.error('karierId is required');
      alert('Terjadi kesalahan: ID karier tidak valid');
      return;
    }

    // Add CV file if exists
    if (formData.cvFile) {
      formDataToSend.append('cv', formData.cvFile);
    }

    try {
      const response = await fetch('https://rfbdev.newsmaker.id/api/career-application', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal mengirim lamaran');
      }

      alert('Lamaran berhasil dikirim!');
      onClose();
    } catch (error: unknown) {
      console.error('Error:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Terjadi kesalahan saat mengirim lamaran');
      }
    }
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Lamar untuk {position} - {city}</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Tutup"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Nomor Telepon <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">+62</span>
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={15}
                    className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder=""
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Aktif <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <div>
                  <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-1">
                    Unggah CV (PDF, maks 5MB) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="cv"
                    name="cv"
                    ref={fileInputRef}
                    required
                    accept=".pdf"
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={handleCustomButtonClick}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-l-md border border-gray-300 border-r-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    >
                      Pilih File
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="relative
                        px-3 py-2 h-10
                        border border-gray-300 rounded-r-md
                        border-l-0
                        overflow-hidden overflow-ellipsis whitespace-nowrap
                        text-sm text-gray-500
                        bg-white
                      ">
                        {fileName || 'Tidak ada file dipilih'}
                      </div>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Format: PDF (maks. 5MB)</p>
                </div>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                  Berapa lama pengalaman Anda di posisi ini? <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="noticePeriod" className="block text-sm font-medium text-gray-700 mb-1">
                  Berapa lama pemberitahuan kerja Anda? <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="noticePeriod"
                  name="noticePeriod"
                  required
                  value={formData.noticePeriod}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="vacancySource" className="block text-sm font-medium text-gray-700 mb-1">
                  Dari mana Anda mengetahui lowongan ini? <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="vacancySource"
                  name="vacancySource"
                  required
                  value={formData.vacancySource}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">
                Jelaskan motivasi Anda bergabung dengan PT Valbury Asia Futures <span className="text-red-500">*</span>
              </label>
              <textarea
                id="motivation"
                name="motivation"
                rows={4}
                required
                value={formData.motivation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="termsAccepted"
                  name="termsAccepted"
                  type="checkbox"
                  required
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                  Saya telah membaca dan menyetujui{' '}
                    Syarat & Ketentuan
                  {' '}dan{' '}
                    Kebijakan Privasi
                  <span className="text-red-500">*</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Kirim Lamaran
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
