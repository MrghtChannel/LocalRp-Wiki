'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { FaDollarSign, FaSearch, FaDumbbell, FaCar, FaUsers, FaTimes } from 'react-icons/fa';
import Footer from "../component/footer";
import Header from "../component/header";
import { MDXProvider } from '@mdx-js/react';
import { motion } from 'framer-motion';

interface Property {
  image: string;
  title: string;
  price: string | number;
  capacity?: string | number;
  garage?: string;
  tenants?: string;
  type: string;
}

interface CardProps extends Property {}

const Card: FC<CardProps> = ({ image, title, price, capacity, garage, tenants }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleImageClick = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <motion.div
      className="w-[320px] p-6 rounded-lg text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={image}
        alt={title}
        className="rounded-md w-full h-[220px] object-cover cursor-pointer"
        onClick={handleImageClick}
      />
      <h2 className="text-2xl font-bold mt-4">{title}</h2>
      <div className="flex items-center text-gray-400 mt-2">
        <FaDollarSign className="mr-2" />
        <span className="text-blue-500">{price}</span>
      </div>
      {capacity && (
        <div className="flex items-center text-gray-400 mt-2">
          <FaDumbbell className="mr-2" />
          <span className="text-blue-500">{capacity}</span>
        </div>
      )}
      {garage && (
        <div className="flex items-center text-gray-400 mt-2">
          <FaCar className="mr-2" />
          <span className="text-blue-500">{garage}</span>
        </div>
      )}
      {tenants && (
        <div className="flex items-center text-gray-400 mt-2">
          <FaUsers className="mr-2" />
          <span className="text-blue-500">{tenants}</span>
        </div>
      )}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-3xl"
            >
              ✕
            </button>
            <img
              src={image}
              alt={title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

const SkeletonCard: FC = () => (
  <motion.div
    className="w-[320px] p-6 rounded-lg text-white bg-[#1a1c22]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="rounded-md w-full h-[220px] bg-gray-700 animate-pulse"></div>
    <div className="h-6 bg-gray-700 mt-4 animate-pulse"></div>
    <div className="h-4 bg-gray-700 mt-2 animate-pulse"></div>
    <div className="h-4 bg-gray-700 mt-2 animate-pulse"></div>
  </motion.div>
);

const MDXContent = dynamic(() => import('../content/realty.mdx'));

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [propertyType, setPropertyType] = useState<string>('all');
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const content = (await import('../content/realty.mdx')).properties;
        setProperties(content);
      } catch (error) {
        console.error('Error loading MDX data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    let filtered = properties;

    if (searchQuery) {
      filtered = filtered.filter((property) =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (propertyType !== 'all') {
      filtered = filtered.filter((property) => property.type === propertyType);
    }

    setFilteredProperties(filtered);
  }, [searchQuery, propertyType, properties]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPropertyType(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#0c0e14] relative text-white">
      <Header />
      <main className="flex flex-col items-center py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Таблиця нерухомості</h1>

        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-6 w-full justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full sm:w-1/4 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Пошук за назвою"
              className="w-full p-3 rounded-md bg-[#0c0e14] text-lg text-gray-300 border border-blue-500 focus:outline-none focus:ring-0 pl-10"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
            {searchQuery && (
              <FaTimes
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 cursor-pointer"
              />
            )}
          </div>
          <div className="w-full sm:w-1/6">
            <select
              value={propertyType}
              onChange={handleTypeChange}
              className="w-full p-3 rounded-md bg-[#0c0e14] text-lg text-gray-300 focus:outline-none focus:ring-0"
            >
              <option value="all">Всі</option>
              <option value="house">Будинки</option>
              <option value="office">Офіси</option>
              <option value="apartment">Квартири</option>
              <option value="warehouse">Склади</option>
            </select>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
          ) : filteredProperties.length === 0 ? (
            <div className="col-span-full text-center text-xl text-gray-400">Нічого не знайдено</div>
          ) : (
            <MDXProvider components={{ Card }}>
              {filteredProperties.map((property) => (
                <Card
                  key={property.title}
                  image={property.image}
                  title={property.title}
                  price={property.price}
                  capacity={property.capacity}
                  garage={property.garage}
                  tenants={property.tenants}
                  type={property.type}
                />
              ))}
            </MDXProvider>
          )}
        </motion.div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
