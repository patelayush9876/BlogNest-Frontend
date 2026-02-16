import { Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from '../../contexts/ThemeContext';

const OnboardingLayout = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={clsx(
        'min-h-screen w-full flex items-center justify-center transition-colors duration-300',
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900',
      )}
    >
      <Outlet />
    </div>
  );
};

export default OnboardingLayout;
