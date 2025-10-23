"use client";

import { useTranslation } from 'next-i18next';
import ModalPopup from "./ModalPopup";

type WelcomeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const WelcomeModal = ({ isOpen, onClose }: WelcomeModalProps) => {
  const { t } = useTranslation('common');

  return (
    <ModalPopup
      isOpen={isOpen}
      onClose={onClose}
      title={t('welcomeModal.title')}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="bg-zinc-200 p-5 rounded-lg">
          <img 
            src="/assets/logo-rfb.png" 
            alt={t('welcomeModal.logoAlt')} 
            className="h-30" 
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-center text-green-800">
          {t('welcomeModal.heading')}
        </h1>
        <p className="text-lg text-center">
          {t('welcomeModal.subheading')}
        </p>
        <a
          href="https://regol.rifan-financindo-berjangka.co.id/"
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-all duration-300"
        >
          {t('welcomeModal.registerButton')}
        </a>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 mt-2 underline"
        >
          {t('welcomeModal.laterButton')}
        </button>
      </div>
    </ModalPopup>
  );
};

export default WelcomeModal;
