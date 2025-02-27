import React from 'react';

interface FooterProps {
  className?: string; 
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <div className={`${className} mt-20 text-center text-gray-500 text-sm pb-8`}>
      <p>Усі права захищені © 2022 - 2024 LocalRp WIKI</p>
      <p className="mt-2">
        LocalRp Wiki не є афілійованою або підтриманою Take-Two, Rockstar North Interactive чи будь-яким іншим правовласником. Усі використовувані торгові марки належать їх відповідним власникам.
      </p>
    </div>
  );
};

export default Footer;
