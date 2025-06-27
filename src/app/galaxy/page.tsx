'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Zap, Play, Pause } from 'lucide-react';
import ClientOnly from '../../components/ClientOnly';

// Stock data with 3D positioning
const stocksData = [
  // Banking Sector (Red constellation)
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1645, change: 2.3, volume: 8500000, marketCap: 890000, sector: 'Banking', color: '#EF4444', position: [200, 100, -100] },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1158, change: 1.8, volume: 6200000, marketCap: 810000, sector: 'Banking', color: '#EF4444', position: [150, 50, -80] },
  { symbol: 'SBIN', name: 'State Bank of India', price: 825, change: 0.9, volume: 12000000, marketCap: 740000, sector: 'Banking', color: '#EF4444', position: [220, 120, -150] },
  { symbol: 'AXISBANK', name: 'Axis Bank', price: 1089, change: -0.5, volume: 4500000, marketCap: 330000, sector: 'Banking', color: '#EF4444', position: [180, 80, -120] },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', price: 1756, change: 1.2, volume: 2800000, marketCap: 350000, sector: 'Banking', color: '#EF4444', position: [250, 150, -90] },

  // IT Sector (Blue constellation)
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 4156, change: 3.2, volume: 3200000, marketCap: 1510000, sector: 'IT', color: '#3B82F6', position: [-200, 100, 100] },
  { symbol: 'INFY', name: 'Infosys', price: 1798, change: 2.8, volume: 4100000, marketCap: 740000, sector: 'IT', color: '#3B82F6', position: [-150, 80, 120] },
  { symbol: 'WIPRO', name: 'Wipro', price: 298, change: 1.5, volume: 6800000, marketCap: 160000, sector: 'IT', color: '#3B82F6', position: [-220, 130, 80] },
  { symbol: 'HCLTECH', name: 'HCL Technologies', price: 1845, change: 0.8, volume: 2900000, marketCap: 500000, sector: 'IT', color: '#3B82F6', position: [-180, 60, 150] },
  { symbol: 'TECHM', name: 'Tech Mahindra', price: 1678, change: -0.3, volume: 3500000, marketCap: 160000, sector: 'IT', color: '#3B82F6', position: [-250, 110, 110] },

  // Pharma Sector (Green constellation)
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', price: 1789, change: 2.7, volume: 2100000, marketCap: 430000, sector: 'Pharma', color: '#10B981', position: [0, 200, 0] },
  { symbol: 'DRREDDY', name: 'Dr. Reddys Laboratories', price: 1234, change: 1.4, volume: 1800000, marketCap: 210000, sector: 'Pharma', color: '#10B981', position: [50, 220, 30] },
  { symbol: 'CIPLA', name: 'Cipla', price: 1567, change: 0.9, volume: 2500000, marketCap: 130000, sector: 'Pharma', color: '#10B981', position: [-30, 180, -20] },
  { symbol: 'LUPIN', name: 'Lupin', price: 2089, change: -0.4, volume: 1200000, marketCap: 96000, sector: 'Pharma', color: '#10B981', position: [20, 250, 50] },
  { symbol: 'AUROPHARMA', name: 'Aurobindo Pharma', price: 1345, change: 1.8, volume: 1900000, marketCap: 79000, sector: 'Pharma', color: '#10B981', position: [-50, 190, 10] },

  // Energy Sector (Orange constellation)
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2934, change: 1.9, volume: 15000000, marketCap: 1980000, sector: 'Energy', color: '#F59E0B', position: [0, -200, 0] },
  { symbol: 'ONGC', name: 'Oil & Natural Gas Corp', price: 298, change: 2.5, volume: 8900000, marketCap: 380000, sector: 'Energy', color: '#F59E0B', position: [80, -180, 40] },
  { symbol: 'IOC', name: 'Indian Oil Corporation', price: 139, change: 1.3, volume: 12000000, marketCap: 190000, sector: 'Energy', color: '#F59E0B', position: [-60, -220, -30] },
  { symbol: 'BPCL', name: 'Bharat Petroleum', price: 289, change: 0.6, volume: 5600000, marketCap: 130000, sector: 'Energy', color: '#F59E0B', position: [40, -150, 20] },
  { symbol: 'HPCL', name: 'Hindustan Petroleum', price: 368, change: -0.8, volume: 4200000, marketCap: 78000, sector: 'Energy', color: '#F59E0B', position: [-20, -250, 10] },

  // Consumer Goods (Purple constellation)
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', price: 2456, change: 1.1, volume: 1800000, marketCap: 580000, sector: 'Consumer', color: '#8B5CF6', position: [-100, -100, -200] },
  { symbol: 'ITC', name: 'ITC Limited', price: 465, change: 0.7, volume: 9200000, marketCap: 580000, sector: 'Consumer', color: '#8B5CF6', position: [-80, -50, -180] },
  { symbol: 'NESTLEIND', name: 'Nestle India', price: 2198, change: 2.1, volume: 850000, marketCap: 210000, sector: 'Consumer', color: '#8B5CF6', position: [-120, -130, -220] },
  { symbol: 'BRITANNIA', name: 'Britannia Industries', price: 4789, change: 0.9, volume: 650000, marketCap: 120000, sector: 'Consumer', color: '#8B5CF6', position: [-60, -80, -150] },
  { symbol: 'DABUR', name: 'Dabur India', price: 507, change: -0.2, volume: 2100000, marketCap: 90000, sector: 'Consumer', color: '#8B5CF6', position: [-150, -110, -190] },
];

// Supernova alerts
const supernovaAlerts = [
  {
    symbol: 'TCS',
    reason: 'TCS surging 3.2% on strong Q3 earnings beat with 15% YoY growth in revenue',
    type: 'breakout',
    intensity: 0.9
  },
  {
    symbol: 'ONGC',
    reason: 'ONGC up 2.5% on crude oil price rally and government divestment news',
    type: 'surge',
    intensity: 0.7
  },
  {
    symbol: 'AXISBANK',
    reason: 'Axis Bank down 0.5% on concerns over NPA provisions in banking sector',
    type: 'decline',
    intensity: 0.4
  }
];

// Generate background stars
const generateBackgroundStars = () => {
  const stars = [];
  for (let i = 0; i < 200; i++) {
    const seed1 = (i * 9301 + 49297) % 233280;
    const seed2 = (i * 4096 + 150889) % 714025;
    const seed3 = (i * 1327 + 104729) % 624769;
    
    stars.push({
      id: i,
      x: ((seed1 / 233280) - 0.5) * 800,
      y: ((seed2 / 714025) - 0.5) * 800,
      z: ((seed3 / 624769) - 0.5) * 800,
      size: Math.random() * 2 + 1,
    });
  }
  return stars;
};

const backgroundStars = generateBackgroundStars();

// True 3D Galaxy Component using CSS 3D transforms
function True3DGalaxy({ filteredStocks, selectedStock, setSelectedStock, showSupernova, supernovaStocks, isRotating }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const [hoveredStock, setHoveredStock] = useState<any>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // Auto rotation
  useEffect(() => {
    if (!isRotating) return;
    
    const animate = () => {
      setRotation(prev => ({
        x: prev.x,
        y: prev.y + 0.5
      }));
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRotating]);

  // Mouse controls
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMouse.x;
    const deltaY = e.clientY - lastMouse.y;
    
    setRotation(prev => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));
    
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.5, Math.min(3, prev * delta)));
  };

  const handleStockClick = (stock: any) => {
    setSelectedStock(stock);
  };

  return (
    <div 
      ref={containerRef}
      className="h-[600px] rounded-lg overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative cursor-grab active:cursor-grabbing"
      style={{ perspective: '1000px' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* 3D Scene Container */}
      <div
        ref={sceneRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out'
        }}
      >
        {/* Background Stars */}
        {backgroundStars.map((star) => (
          <div
            key={`bg-${star.id}`}
            className="absolute bg-white rounded-full opacity-40"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              transform: `translate3d(${star.x}px, ${star.y}px, ${star.z}px)`,
              animation: `twinkle ${2 + Math.random() * 3}s infinite`
            }}
          />
        ))}

        {/* Stock Stars */}
        {filteredStocks.map((stock: any) => {
          const size = Math.max(8, (stock.marketCap / 200000) * 20);
          const brightness = Math.min(1, stock.volume / 10000000);
          const isSupernova = showSupernova && supernovaStocks.includes(stock.symbol);
          const isSelected = selectedStock?.symbol === stock.symbol;
          const isHovered = hoveredStock?.symbol === stock.symbol;

          return (
            <div
              key={stock.symbol}
              className={`absolute cursor-pointer transition-all duration-300 ${
                isSupernova ? 'animate-pulse' : ''
              }`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: `translate3d(${stock.position[0]}px, ${stock.position[1]}px, ${stock.position[2]}px) translate(-50%, -50%)`,
                transformStyle: 'preserve-3d'
              }}
              onClick={() => handleStockClick(stock)}
              onMouseEnter={() => setHoveredStock(stock)}
              onMouseLeave={() => setHoveredStock(null)}
            >
              {/* Main Star */}
              <div
                className="w-full h-full rounded-full relative"
                style={{
                  backgroundColor: stock.color,
                  opacity: 0.8 + brightness * 0.2,
                  boxShadow: isSupernova 
                    ? `0 0 30px ${stock.color}, 0 0 60px ${stock.color}` 
                    : isSelected
                    ? `0 0 25px ${stock.color}`
                    : isHovered
                    ? `0 0 20px ${stock.color}`
                    : `0 0 15px ${stock.color}`,
                  transform: isSelected ? 'scale(1.5)' : isHovered ? 'scale(1.2)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Inner glow */}
                <div 
                  className="absolute inset-1 rounded-full"
                  style={{
                    backgroundColor: 'white',
                    opacity: 0.3,
                  }}
                />
              </div>

              {/* Stock Symbol (always facing camera) */}
              <div
                className="absolute text-white text-xs font-bold whitespace-nowrap pointer-events-none"
                style={{
                  bottom: `${size + 5}px`,
                  left: '50%',
                  transform: `translateX(-50%) rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg)`,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                }}
              >
                {stock.symbol}
              </div>

              {/* Price Change (always facing camera) */}
              <div
                className="absolute text-xs font-bold whitespace-nowrap pointer-events-none"
                style={{
                  top: `${size + 5}px`,
                  left: '50%',
                  transform: `translateX(-50%) rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg)`,
                  color: stock.change > 0 ? '#10B981' : stock.change < 0 ? '#EF4444' : '#6B7280',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                }}
              >
                {stock.change > 0 ? '+' : ''}{stock.change}%
              </div>
            </div>
          );
        })}

        {/* Constellation Lines */}
        {filteredStocks.map((stock: any, index: number) => {
          return filteredStocks
            .filter((otherStock: any, otherIndex: number) => 
              otherIndex > index && 
              otherStock.sector === stock.sector
            )
            .map((otherStock: any, lineIndex: number) => {
              const distance = Math.sqrt(
                Math.pow(stock.position[0] - otherStock.position[0], 2) +
                Math.pow(stock.position[1] - otherStock.position[1], 2) +
                Math.pow(stock.position[2] - otherStock.position[2], 2)
              );
              
              if (distance > 200) return null;

              const midX = (stock.position[0] + otherStock.position[0]) / 2;
              const midY = (stock.position[1] + otherStock.position[1]) / 2;
              const midZ = (stock.position[2] + otherStock.position[2]) / 2;
              
              const length = distance;
              const angleY = Math.atan2(otherStock.position[0] - stock.position[0], otherStock.position[2] - stock.position[2]) * 180 / Math.PI;
              const angleX = Math.atan2(otherStock.position[1] - stock.position[1], Math.sqrt(Math.pow(otherStock.position[0] - stock.position[0], 2) + Math.pow(otherStock.position[2] - stock.position[2], 2))) * 180 / Math.PI;

              return (
                <div
                  key={`line-${stock.symbol}-${otherStock.symbol}-${lineIndex}`}
                  className="absolute pointer-events-none"
                  style={{
                    width: '1px',
                    height: `${length}px`,
                    backgroundColor: stock.color,
                    opacity: 0.3,
                    transform: `translate3d(${midX}px, ${midY}px, ${midZ}px) rotateY(${angleY}deg) rotateX(${-angleX}deg) translateY(-50%)`,
                    transformOrigin: 'center',
                    transformStyle: 'preserve-3d'
                  }}
                />
              );
            });
        })}
      </div>

      {/* Hover Tooltip */}
      {hoveredStock && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg text-sm z-30 pointer-events-none">
          <div className="font-bold">{hoveredStock.name}</div>
          <div>{hoveredStock.symbol} • ₹{hoveredStock.price} • {hoveredStock.change > 0 ? '+' : ''}{hoveredStock.change}%</div>
          <div className="text-xs text-gray-300">Volume: {(hoveredStock.volume / 1000000).toFixed(1)}M • Cap: ₹{(hoveredStock.marketCap / 100000).toFixed(1)}L Cr</div>
        </div>
      )}

      {/* Controls Info */}
      <div className="absolute bottom-4 left-4 text-white text-xs bg-black bg-opacity-50 px-3 py-2 rounded pointer-events-none">
        <div>🖱️ Drag to rotate • 🖱️ Scroll to zoom</div>
        <div>True 3D Galaxy • {filteredStocks.length} Stars</div>
      </div>

      {/* Sector Legend */}
      <div className="absolute top-4 right-4 text-white text-xs bg-black bg-opacity-50 px-3 py-2 rounded">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span>Banking</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>IT</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Pharma</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <span>Energy</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <span>Consumer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2D Fallback Galaxy View
function FallbackGalaxyView({ filteredStocks, selectedStock, setSelectedStock, showSupernova, supernovaStocks }: any) {
  const [hoveredStock, setHoveredStock] = useState<any>(null);

  const handleStockClick = (stock: any) => {
    setSelectedStock(stock);
  };

  const handleStockHover = (stock: any | null) => {
    setHoveredStock(stock);
  };

  return (
    <div className="h-[600px] rounded-lg overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative">
      {/* Background stars */}
      <div className="absolute inset-0">
        {backgroundStars.slice(0, 150).map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full opacity-60 animate-pulse"
            style={{
              left: `${((star.x + 400) / 800) * 100}%`,
              top: `${((star.y + 400) / 800) * 100}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
          />
        ))}
      </div>

      {/* Stock stars */}
      <div className="absolute inset-0 p-8">
        {filteredStocks.map((stock: any) => {
          const size = Math.max(12, (stock.marketCap / 200000) * 3);
          const brightness = Math.min(1, stock.volume / 10000000);
          const isSupernova = showSupernova && supernovaStocks.includes(stock.symbol);
          const isSelected = selectedStock?.symbol === stock.symbol;
          const isHovered = hoveredStock?.symbol === stock.symbol;
          
          // Convert 3D position to 2D
          const x = ((stock.position[0] + 300) / 600) * 100;
          const y = ((stock.position[1] + 300) / 600) * 100;

          return (
            <div
              key={stock.symbol}
              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-150 hover:z-20 ${
                isSupernova ? 'animate-pulse' : ''
              } ${isSelected ? 'scale-125 z-10' : ''} ${isHovered ? 'scale-110 z-15' : ''}`}
              style={{
                left: `${Math.max(5, Math.min(95, x))}%`,
                top: `${Math.max(5, Math.min(95, y))}%`,
                width: `${size}px`,
                height: `${size}px`,
              }}
              onClick={() => handleStockClick(stock)}
              onMouseEnter={() => handleStockHover(stock)}
              onMouseLeave={() => handleStockHover(null)}
            >
              <div
                className="w-full h-full rounded-full relative cursor-pointer"
                style={{
                  backgroundColor: stock.color,
                  opacity: 0.8 + brightness * 0.2,
                  boxShadow: isSupernova 
                    ? `0 0 30px ${stock.color}, 0 0 60px ${stock.color}` 
                    : isSelected
                    ? `0 0 25px ${stock.color}`
                    : isHovered
                    ? `0 0 20px ${stock.color}`
                    : `0 0 15px ${stock.color}`,
                }}
              >
                <div 
                  className="absolute inset-1 rounded-full"
                  style={{
                    backgroundColor: 'white',
                    opacity: 0.3,
                  }}
                />
              </div>
              <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white whitespace-nowrap font-medium ${
                isSelected ? 'text-yellow-300' : isHovered ? 'text-blue-300' : ''
              }`}>
                {stock.symbol}
              </div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-xs font-bold whitespace-nowrap">
                <span className={stock.change > 0 ? 'text-green-300' : stock.change < 0 ? 'text-red-300' : 'text-gray-300'}>
                  {stock.change > 0 ? '+' : ''}{stock.change}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hover tooltip */}
      {hoveredStock && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg text-sm z-30">
          <div className="font-bold">{hoveredStock.name}</div>
          <div>{hoveredStock.symbol} • ₹{hoveredStock.price} • {hoveredStock.change > 0 ? '+' : ''}{hoveredStock.change}%</div>
          <div className="text-xs text-gray-300">Volume: {(hoveredStock.volume / 1000000).toFixed(1)}M • Cap: ₹{(hoveredStock.marketCap / 100000).toFixed(1)}L Cr</div>
        </div>
      )}

      <div className="absolute bottom-4 right-4 text-white text-sm bg-black bg-opacity-50 px-3 py-2 rounded">
        2D Galaxy View • {filteredStocks.length} Stars
      </div>
    </div>
  );
}

// Galaxy Component
function GalaxyComponent({ filteredStocks, selectedStock, setSelectedStock, showSupernova, supernovaStocks, isRotating, use3D }: any) {
  if (use3D) {
    return (
      <True3DGalaxy
        filteredStocks={filteredStocks}
        selectedStock={selectedStock}
        setSelectedStock={setSelectedStock}
        showSupernova={showSupernova}
        supernovaStocks={supernovaStocks}
        isRotating={isRotating}
      />
    );
  }

  return (
    <FallbackGalaxyView
      filteredStocks={filteredStocks}
      selectedStock={selectedStock}
      setSelectedStock={setSelectedStock}
      showSupernova={showSupernova}
      supernovaStocks={supernovaStocks}
    />
  );
}

// Loading component
function GalaxyLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="rounded-lg bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-6">
        <div className="h-8 bg-white bg-opacity-20 rounded mb-2 w-1/3"></div>
        <div className="h-4 bg-white bg-opacity-20 rounded w-3/4"></div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="rounded-lg bg-gray-200 dark:bg-gray-700 p-4 h-16"></div>
        ))}
      </div>
      <div className="rounded-lg bg-gray-200 dark:bg-gray-700 p-6 h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-gray-500 dark:text-gray-400">Loading Galaxy...</div>
        </div>
      </div>
    </div>
  );
}

export default function GalaxyPage() {
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [selectedSector, setSelectedSector] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSupernova, setShowSupernova] = useState(true);
  const [isRotating, setIsRotating] = useState(true);
  const [use3D, setUse3D] = useState(true); // Default to 3D

  const sectors = ['All', 'Banking', 'IT', 'Pharma', 'Energy', 'Consumer'];
  
  const filteredStocks = stocksData.filter(stock => {
    const matchesSector = selectedSector === 'All' || stock.sector === selectedSector;
    const matchesSearch = stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stock.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSector && matchesSearch;
  });

  const supernovaStocks = supernovaAlerts.map(alert => alert.symbol);

  return (
    <ClientOnly fallback={<GalaxyLoading />}>
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-lg bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Galaxy of Stocks</h1>
          <p className="text-blue-100">
            Explore the Indian stock market as a true 3D constellation where each star represents a stock.
            Drag to rotate, scroll to zoom, click stars for details!
          </p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
            >
              {sectors.map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
          </div>

          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <button
              onClick={() => setShowSupernova(!showSupernova)}
              className={`flex items-center space-x-2 w-full justify-center rounded-md px-3 py-2 text-sm font-medium ${
                showSupernova ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
              }`}
            >
              <Zap className="h-4 w-4" />
              <span>Supernova</span>
            </button>
          </div>

          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className="flex items-center space-x-2 w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {isRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{isRotating ? 'Pause' : 'Play'}</span>
            </button>
          </div>

          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <button
              onClick={() => setUse3D(!use3D)}
              className={`flex items-center space-x-2 w-full justify-center rounded-md px-3 py-2 text-sm font-medium ${
                use3D ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
              }`}
            >
              <span>{use3D ? '3D' : '2D'}</span>
            </button>
          </div>
        </div>

        {/* Supernova Alerts */}
        {showSupernova && (
          <div className="space-y-2">
            {supernovaAlerts.map((alert, index) => (
              <div key={index} className="rounded-lg bg-yellow-50 border border-yellow-200 p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
                <div className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-yellow-800 dark:text-yellow-200">{alert.symbol} Supernova Alert</h3>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">{alert.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Galaxy Visualization */}
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <GalaxyComponent
            filteredStocks={filteredStocks}
            selectedStock={selectedStock}
            setSelectedStock={setSelectedStock}
            showSupernova={showSupernova}
            supernovaStocks={supernovaStocks}
            isRotating={isRotating}
            use3D={use3D}
          />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Sector Colors</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-gray-600 dark:text-gray-400">Banking</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-600 dark:text-gray-400">IT</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600 dark:text-gray-400">Pharma</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-gray-600 dark:text-gray-400">Energy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-gray-600 dark:text-gray-400">Consumer</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Visual Guide</h3>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p>• Star size = Market Cap</p>
              <p>• Brightness = Trading Volume</p>
              <p>• Glow = Supernova Alert</p>
              <p>• Lines = Sector Connections</p>
              <p>• Click stars for details</p>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">3D Controls</h3>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p>• Drag to rotate galaxy</p>
              <p>• Scroll to zoom in/out</p>
              <p>• Hover for quick info</p>
              <p>• Click stars for details</p>
              <p>• Auto-rotation toggle</p>
              <p>{use3D ? '• True 3D experience!' : '• 2D fallback mode'}</p>
            </div>
          </div>
        </div>

        {/* Selected Stock Details */}
        {selectedStock && (
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedStock.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedStock.symbol} • {selectedStock.sector} Sector
                </p>
              </div>
              <button
                onClick={() => setSelectedStock(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current Price</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{selectedStock.price}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Change</p>
                <p className={`text-2xl font-bold ${
                  selectedStock.change > 0 ? 'text-green-600' : 
                  selectedStock.change < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {selectedStock.change > 0 ? '+' : ''}{selectedStock.change}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Volume</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {(selectedStock.volume / 1000000).toFixed(1)}M
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Market Cap</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{(selectedStock.marketCap / 100000).toFixed(1)}L Cr
                </p>
              </div>
            </div>

            {/* AI Insight */}
            <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">AI Market Insight</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {selectedStock.symbol} is showing {selectedStock.change > 0 ? 'positive' : selectedStock.change < 0 ? 'negative' : 'neutral'} momentum 
                with {selectedStock.change > 0 ? 'strong' : 'weak'} trading volume of {(selectedStock.volume / 1000000).toFixed(1)}M shares. 
                The stock's position in the {selectedStock.sector} sector constellation indicates 
                {selectedStock.marketCap > 500000 ? ' large-cap stability' : ' mid-cap growth potential'}.
                {supernovaStocks.includes(selectedStock.symbol) && ' ⚡ Currently experiencing supernova activity with significant market attention.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </ClientOnly>
  );
} 