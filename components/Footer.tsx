import React from 'react';
import { Montserrat } from '@next/font/google';
import Image from 'next/image';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const Footer = () => {
  return (
    <footer>
      <article className="h-[300px] flex justify-end items-end flex-col p-7 border-t border-t-gray-300">
        <Image
          src="/img/OTBlogo.svg"
          alt="OTB"
          className="mb-4"
          width={88}
          height={54}
        />
        <div>提供：株式会社ビズリンク</div>
        <div>
          お問い合わせ：
          <a href="https://corp.bizlink.io/home/contact/">
            https://corp.bizlink.io/home/contact/
          </a>
        </div>
      </article>
      <p
        className={`${montserrat.className} bg-purple-600 py-2 text-white text-center`}
      >
        Copyright (C) 2024 Bizlink All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
