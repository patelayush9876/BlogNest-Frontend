// Switch.tsx

import React from 'react';

interface SwitchProps {
  isOn: boolean;
  handleToggle: () => void;
  // Optional: allows the toggle to be customized (e.g., color)
  onColor?: string;
}

const Switch: React.FC<SwitchProps> = ({ isOn, handleToggle, onColor = 'bg-black' }) => {
  return (
    <div
      className={`relative inline-flex items-center w-11 h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
        isOn ? onColor : 'bg-gray-200'
      }`}
      onClick={handleToggle}
      role="switch"
      aria-checked={isOn}
    >
      <span
        className={`inline-block w-5 h-5 transform bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out ${
          isOn ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      />
    </div>
  );
};

export default Switch;
