// src/components/AdvancedSettings.tsx
import React, { useState } from 'react';

export interface AdvancedOptions {
  namingStyle: 'classic' | 'quirky' | 'epic' | 'poetic' | 'mysterious' | 'minimalist';
  outlineStrictness: number; // 0–100
  characterContinuity: boolean;
}

interface AdvancedSettingsProps {
  settings: AdvancedOptions;
  onChange: (updated: AdvancedOptions) => void;
}

const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({ settings, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const type = target.type;

    const updated = {
      ...settings,
      [name]: type === 'checkbox'
        ? (target as HTMLInputElement).checked
        : type === 'number'
        ? Number(value)
        : value,
    };

    onChange(updated);
  };

  return (
    <div className="advanced-settings">
      <button
        type="button"
        className="advanced-settings__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={Boolean(isOpen)}
      >
        ⚙️ Advanced Settings {isOpen ? '▲' : '▼'}
      </button>

      {isOpen && (
        <div className="advanced-settings__panel fade-in">
          <div className="advanced-settings__field">
            <label htmlFor="namingStyle">
              Chapter Naming Style:
              <span className="advanced-settings__hint">
                (Affects how chapters are titled)
              </span>
            </label>
            <select
              id="namingStyle"
              name="namingStyle"
              value={settings.namingStyle}
              onChange={handleChange}
            >
              <option value="classic">Classic</option>
              <option value="quirky">Quirky</option>
              <option value="epic">Epic</option>
              <option value="poetic">Poetic</option>
              <option value="mysterious">Mysterious</option>
              <option value="minimalist">Minimalist</option>
            </select>
          </div>

          <div className="advanced-settings__field">
            <label htmlFor="outlineStrictness">
              Outline Strictness:
              <span className="advanced-settings__hint">
                (Higher values enforce tighter structure)
              </span>
            </label>
            <input
              id="outlineStrictness"
              name="outlineStrictness"
              type="range"
              min={0}
              max={100}
              value={settings.outlineStrictness}
              onChange={handleChange}
            />
            <span>{settings.outlineStrictness}%</span>
          </div>

          <div className="advanced-settings__field">
            <label htmlFor="characterContinuity">
              <input
                id="characterContinuity"
                name="characterContinuity"
                type="checkbox"
                checked={settings.characterContinuity}
                onChange={handleChange}
              />
              Maintain character continuity
            </label>
            <span className="advanced-settings__hint">
              (Ensures characters evolve consistently across chapters)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSettings;