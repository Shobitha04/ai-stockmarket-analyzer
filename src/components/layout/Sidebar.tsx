'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Activity,
  BarChart3, 
  BookOpen, 
  Briefcase, 
  Globe,
  LineChart, 
  Newspaper, 
  PieChart,
  Rocket,
  Settings
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Real-Time', href: '/realtime', icon: Activity },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Market News', href: '/news', icon: Newspaper },
  { name: 'IPO Analysis', href: '/ipo', icon: Rocket },
  { name: 'Strategy Lab', href: '/strategy', icon: LineChart },
  { name: 'Market Stats', href: '/market-stats', icon: PieChart },
  { name: 'Learn', href: '/learn', icon: BookOpen },
  { name: 'Galaxy', href: '/galaxy', icon: Globe },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-800">
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex flex-shrink-0 items-center px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">StockSage AI</h1>
        </div>
        <nav className="mt-6 flex-1 space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md
                  ${isActive
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                  }
                `}
              >
                <item.icon
                  className={`
                    mr-3 h-5 w-5 flex-shrink-0
                    ${isActive
                      ? 'text-gray-500 dark:text-gray-300'
                      : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300'
                    }
                  `}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
} 