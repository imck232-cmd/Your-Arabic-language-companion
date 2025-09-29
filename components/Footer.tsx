
import React from 'react';
import { CONSULTANT_NAME, CONTACT_PHONE_WHATSAPP, YEAR } from '../constants';
import { WhatsAppIcon } from './common/icons';

const Footer: React.FC = () => {
  const whatsappLink = `https://wa.me/${CONTACT_PHONE_WHATSAPP}?text=${encodeURIComponent('السلام عليكم، لدي استفسار بخصوص تطبيق "رفيقك في اللغة العربية".')}`;

  return (
    <footer className="bg-gray-800 text-white mt-12 py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4">{`جميع الحقوق محفوظة لدى المستشار ${CONSULTANT_NAME} © ${YEAR}م`}</p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
        >
          <WhatsAppIcon />
          <span>تواصل معنا عبر واتساب</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
