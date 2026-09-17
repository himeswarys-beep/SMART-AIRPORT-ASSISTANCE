import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const ModuleCard = ({
  to,
  title,
  description,
  icon: Icon,
  badgeText,
  badgeType = 'default',
  accentColor = 'sky'
}) => {
  return (
    <Link to={to} className="module-card">
      <div className="module-card-left">
        <div className="module-icon-wrap">
          {Icon && <Icon size={22} />}
        </div>
        <div className="module-card-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <h3 className="module-card-title">{title}</h3>
            {badgeText && (
              <span
                className={`module-badge ${
                  badgeType === 'peach' ? 'badge-peach' : ''
                }`}
                style={{ fontSize: '0.68rem', padding: '2px 8px' }}
              >
                {badgeText}
              </span>
            )}
          </div>
          <p className="module-card-desc">{description}</p>
        </div>
      </div>

      <ChevronRight className="module-card-arrow" size={20} />
    </Link>
  );
};

export default ModuleCard;
