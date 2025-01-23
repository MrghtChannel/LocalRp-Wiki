'use client';

import React, { useState, useEffect, useRef } from 'react';

const TILE_SIZE = 256;
const TILE_GRID = [
  ['minimap_sea_0_0.png', 'minimap_sea_0_1.png'],
  ['minimap_sea_1_0.png', 'minimap_sea_1_1.png'],
  ['minimap_sea_2_0.png', 'minimap_sea_2_1.png']
];

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (mapContainerRef.current) {
      const containerWidth = mapContainerRef.current.offsetWidth;
      const containerHeight = mapContainerRef.current.offsetHeight;
      const mapWidth = TILE_GRID[0].length * TILE_SIZE;
      const mapHeight = TILE_GRID.length * TILE_SIZE;
      setOffsetX((containerWidth - mapWidth) / 2);
      setOffsetY((containerHeight - mapHeight) / 2);
    }
  }, []);

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    const deltaScale = event.deltaY > 0 ? -0.1 : 0.1;
    setScale((prevScale) => Math.min(Math.max(prevScale + deltaScale, 0.5), 3));
  };

  const handleMouseDown = (event: MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = event.clientX - dragStart.x;
    const deltaY = event.clientY - dragStart.y;
    setOffsetX((prevOffsetX) => prevOffsetX + deltaX);
    setOffsetY((prevOffsetY) => prevOffsetY + deltaY);
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const mapContainer = mapContainerRef.current;

    if (mapContainer) {
      mapContainer.addEventListener('wheel', handleWheel, { passive: false });
      mapContainer.addEventListener('mousedown', handleMouseDown as EventListener);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (mapContainer) {
        mapContainer.removeEventListener('wheel', handleWheel);
        mapContainer.removeEventListener('mousedown', handleMouseDown as EventListener);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div className="min-h-screen bg-[#0c0e14] relative text-white">
      <div className="absolute top-4 right-4 z-50">
        <button
          className="text-white text-4xl" 
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#0c0e14] bg-opacity-90 flex items-center justify-center z-40">
          <div className="text-center space-y-4">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-white">
            </button>
            <div className="flex flex-col space-y-4">
              <a href="/" className="text-2xl font-semibold text-white hover:text-blue-500">
                Головна
              </a>
              <a href="http://localrp.com.ua/donate" className="text-2xl font-semibold text-white hover:text-blue-500">
                Донат
              </a>
              <a href="http://forum.localrp.com.ua/forum" className="text-2xl font-semibold text-white hover:text-blue-500">
                Форум
              </a>
              <a href="http://wiki.localrp.com.ua" className="text-2xl font-semibold text-white hover:text-blue-500">
                Вікі
              </a>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          userSelect: 'none',
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div
          ref={mapContainerRef}
          style={{
            width: '80vw',
            height: '80vh',
            position: 'relative',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(2, ${TILE_SIZE}px)`,
              gridTemplateRows: `repeat(3, ${TILE_SIZE}px)`,
              transform: `scale(${scale})`,
              transformOrigin: 'center',
              position: 'absolute',
              top: `${offsetY}px`,
              left: `${offsetX}px`,
            }}
          >
            {TILE_GRID.map((row, rowIndex) =>
              row.map((tile, colIndex) => (
                <img
                  key={`${rowIndex}-${colIndex}`}
                  src={`/maps/${tile}`}
                  alt={`tile-${rowIndex}-${colIndex}`}
                  draggable={false}
                  style={{
                    width: TILE_SIZE,
                    height: TILE_SIZE,
                    objectFit: 'cover',
                    userSelect: 'none',
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
