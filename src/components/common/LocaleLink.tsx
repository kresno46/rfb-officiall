"use client";

import { useRouter } from 'next/router';
import Link from 'next/link';

interface LocaleLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  target?: string;
}

const LocaleLink = ({ 
  href, 
  children, 
  className = '', 
  onClick,
  target
}: LocaleLinkProps) => {
  const router = useRouter();
  const { locale } = router;
  
  return (
    <Link 
      href={href} 
      locale={locale}
      className={className}
      onClick={onClick}
      target={target}
      passHref
    >
      {children}
    </Link>
  );
};

export default LocaleLink;
