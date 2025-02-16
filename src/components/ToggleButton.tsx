import React from 'react';

interface ToggleButtonProps {
  isActive: boolean;
  onToggle: () => void;
  leftLabel: string;
  rightLabel: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isActive, onToggle, leftLabel, rightLabel }) => {
  return (
    <button
      onClick={onToggle}
      className="relative w-24 h-10 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 hover:border-white/30 shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-around">
        <span className={`flex-1 text-center ${isActive ? 'opacity-100' : 'opacity-30'}`}>{leftLabel}</span>
        <span className={`flex-1 text-center ${!isActive ? 'opacity-100' : 'opacity-30'}`}>{rightLabel}</span>
      </div>
      <div className={`absolute inset-1 w-11 h-8 bg-white/20 rounded-full transform transition-transform duration-300 ${isActive ? 'translate-x-0' : 'translate-x-full'}`}></div>
    </button>
  );
};

export default ToggleButton;