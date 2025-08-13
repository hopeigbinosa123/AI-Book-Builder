import React, { useState } from 'react';

// Collapsible list of prompt-writing tips
const PromptTips: React.FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="prompt-tips">
      <button onClick={() => setVisible((v) => !v)}>
        {visible ? '🔽 Hide Tips' : '🔼 Show Prompt Tips'}
      </button>

      {visible && (
        <ul>
          <li>Use specific visual elements: “a glowing forest at dusk.”</li>
          <li>Include mood or style: “dark fantasy,” “Studio Ghibli.”</li>
          <li>Mention composition: “centered portrait,” “wide landscape.”</li>
          <li>Specify medium: “digital painting,” “watercolor.”</li>
          <li>Add lighting: “soft ambient light,” “dramatic shadows.”</li>
        </ul>
      )}
    </div>
  );
};

export default PromptTips;
