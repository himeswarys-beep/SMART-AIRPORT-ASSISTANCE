import React, { useState, useEffect } from 'react';
import {
  Edit3,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  X,
  Check,
  Move,
  Tag,
  Palette,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

const CATEGORY_OPTIONS = [
  { id: 'gates', label: 'Boarding Gates', defaultIcon: 'Plane', defaultColor: '#ef4444' },
  { id: 'checkin', label: 'Check-in Counters', defaultIcon: 'Ticket', defaultColor: '#6366f1' },
  { id: 'security', label: 'Security Check', defaultIcon: 'ShieldCheck', defaultColor: '#f59e0b' },
  { id: 'immigration', label: 'Immigration Desk', defaultIcon: 'UserCheck', defaultColor: '#8b5cf6' },
  { id: 'baggage', label: 'Baggage Claim', defaultIcon: 'Luggage', defaultColor: '#06b6d4' },
  { id: 'entrance', label: 'Departure Entrance', defaultIcon: 'DoorClosed', defaultColor: '#3b82f6' },
  { id: 'exit', label: 'Arrival Exit', defaultIcon: 'DoorOpen', defaultColor: '#10b981' },
  { id: 'restroom', label: 'Restrooms', defaultIcon: 'Users', defaultColor: '#0284c7' },
  { id: 'food', label: 'Restaurants', defaultIcon: 'Utensils', defaultColor: '#f97316' },
  { id: 'cafe', label: 'Cafes & Snacks', defaultIcon: 'Coffee', defaultColor: '#d97706' },
  { id: 'water', label: 'Drinking Water', defaultIcon: 'Droplets', defaultColor: '#38bdf8' },
  { id: 'baby', label: 'Baby Care Room', defaultIcon: 'Baby', defaultColor: '#ec4899' },
  { id: 'medical', label: 'Medical Room', defaultIcon: 'HeartPulse', defaultColor: '#ef4444' },
  { id: 'atm', label: 'ATM', defaultIcon: 'Banknote', defaultColor: '#10b981' },
  { id: 'lounge', label: 'Executive Lounge', defaultIcon: 'Armchair', defaultColor: '#8b5cf6' },
  { id: 'waiting', label: 'Waiting Area', defaultIcon: 'Armchair', defaultColor: '#64748b' },
  { id: 'info', label: 'Information Desk', defaultIcon: 'Info', defaultColor: '#3b82f6' },
  { id: 'dutyfree', label: 'Duty Free Shop', defaultIcon: 'ShoppingBag', defaultColor: '#ec4899' },
  { id: 'elevator', label: 'Elevator', defaultIcon: 'ArrowUpDown', defaultColor: '#64748b' },
  { id: 'escalator', label: 'Escalator', defaultIcon: 'TrendingUp', defaultColor: '#64748b' }
];

const ICON_OPTIONS = [
  'Plane',
  'Ticket',
  'ShieldCheck',
  'UserCheck',
  'Luggage',
  'DoorOpen',
  'DoorClosed',
  'Users',
  'Utensils',
  'Coffee',
  'Droplets',
  'Baby',
  'HeartPulse',
  'Banknote',
  'Armchair',
  'Info',
  'ShoppingBag',
  'ArrowUpDown',
  'TrendingUp',
  'MapPin'
];

const PRESET_COLORS = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#10b981',
  '#06b6d4',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
  '#64748b'
];

export const EditMapPanel = ({
  airportName,
  locations = [],
  selectedLocation,
  onSelectLocation,
  onUpdateLocation,
  onAddLocation,
  onDeleteLocation,
  onSaveChanges,
  onResetDefaults,
  onClose
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'gates',
    icon: 'Plane',
    color: '#ef4444',
    x: 500,
    y: 300,
    details: ''
  });

  const [saveToast, setSaveToast] = useState(false);

  // Sync form data whenever selected location changes
  useEffect(() => {
    if (selectedLocation) {
      setFormData({
        name: selectedLocation.name || '',
        category: selectedLocation.category || 'gates',
        icon: selectedLocation.icon || 'Plane',
        color: selectedLocation.color || '#ef4444',
        x: selectedLocation.position?.x ?? 500,
        y: selectedLocation.position?.y ?? 300,
        details: selectedLocation.details || ''
      });
    }
  }, [selectedLocation]);

  // Handle form input edits
  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    if (selectedLocation) {
      onUpdateLocation(selectedLocation.id, {
        name: updated.name,
        category: updated.category,
        icon: updated.icon,
        color: updated.color,
        position: { x: Number(updated.x), y: Number(updated.y) },
        details: updated.details
      });
    }
  };

  // Category select auto-fill default icon and color
  const handleCategoryChange = (catId) => {
    const catObj = CATEGORY_OPTIONS.find((c) => c.id === catId);
    const newIcon = catObj ? catObj.defaultIcon : formData.icon;
    const newColor = catObj ? catObj.defaultColor : formData.color;

    setFormData((prev) => ({
      ...prev,
      category: catId,
      icon: newIcon,
      color: newColor
    }));

    if (selectedLocation) {
      onUpdateLocation(selectedLocation.id, {
        category: catId,
        icon: newIcon,
        color: newColor
      });
    }
  };

  // Save handler with feedback toast
  const handleSave = () => {
    onSaveChanges();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="edit-map-drawer glass-card animate-slide-in-right">
      {/* Header */}
      <div className="drawer-header">
        <div>
          <span className="hero-tag">Map Editor</span>
          <h3 className="drawer-title">Edit Map Locations</h3>
        </div>
        <button type="button" className="close-drawer-btn" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      {/* Action Buttons Top Bar */}
      <div className="edit-top-actions">
        <button
          type="button"
          className="btn-add-location"
          onClick={onAddLocation}
        >
          <Plus size={15} />
          <span>Add New Location</span>
        </button>

        <button
          type="button"
          className="btn-save-layout"
          onClick={handleSave}
        >
          <Save size={15} />
          <span>Save Changes</span>
        </button>
      </div>

      {saveToast && (
        <div className="save-toast-banner animate-fade-in">
          <Check size={16} />
          <span>Map changes saved successfully for {airportName}!</span>
        </div>
      )}

      {/* Location Selector Dropdown */}
      <div className="field-group">
        <label className="field-label">Select Marker to Edit</label>
        <select
          className="edit-select-input"
          value={selectedLocation?.id || ''}
          onChange={(e) => {
            const loc = locations.find((l) => l.id === e.target.value);
            if (loc) onSelectLocation(loc);
          }}
        >
          <option value="" disabled>-- Select a Location on Map --</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name} ({loc.category})
            </option>
          ))}
        </select>
      </div>

      {/* Form Fields for Selected Location */}
      {selectedLocation ? (
        <div className="edit-form-fields">
          {/* Location Name */}
          <div className="field-group">
            <label className="field-label">Place Name</label>
            <input
              type="text"
              className="edit-text-input"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g., Gate A12, Saravana Bhavan..."
            />
          </div>

          {/* Category */}
          <div className="field-group">
            <label className="field-label">Category</label>
            <select
              className="edit-select-input"
              value={formData.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Icon Selector Grid */}
          <div className="field-group">
            <label className="field-label">Icon</label>
            <div className="icon-selector-grid">
              {ICON_OPTIONS.map((iconName) => (
                <button
                  key={iconName}
                  type="button"
                  className={`icon-choice-btn ${formData.icon === iconName ? 'active' : ''}`}
                  onClick={() => handleChange('icon', iconName)}
                >
                  <span className="icon-text">{iconName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Picker Palette */}
          <div className="field-group">
            <label className="field-label">Marker Color</label>
            <div className="color-palette-picker">
              {PRESET_COLORS.map((hex) => (
                <button
                  key={hex}
                  type="button"
                  className={`color-swatch ${formData.color === hex ? 'active' : ''}`}
                  style={{ backgroundColor: hex }}
                  onClick={() => handleChange('color', hex)}
                />
              ))}
            </div>
          </div>

          {/* Coordinates X & Y */}
          <div className="field-row-2">
            <div className="field-group">
              <label className="field-label">X Position (px)</label>
              <input
                type="number"
                className="edit-text-input"
                value={formData.x}
                onChange={(e) => handleChange('x', e.target.value)}
              />
            </div>
            <div className="field-group">
              <label className="field-label">Y Position (px)</label>
              <input
                type="number"
                className="edit-text-input"
                value={formData.y}
                onChange={(e) => handleChange('y', e.target.value)}
              />
            </div>
          </div>

          {/* Details / Description */}
          <div className="field-group">
            <label className="field-label">Description / Details</label>
            <textarea
              className="edit-textarea-input"
              rows={2}
              value={formData.details}
              onChange={(e) => handleChange('details', e.target.value)}
              placeholder="Provide walking instructions or place description..."
            />
          </div>

          {/* Delete Marker Action */}
          <div className="edit-bottom-actions">
            <button
              type="button"
              className="btn-delete-location"
              onClick={() => onDeleteLocation(selectedLocation.id)}
            >
              <Trash2 size={15} />
              <span>Delete Location</span>
            </button>

            <button
              type="button"
              className="btn-reset-factory"
              onClick={onResetDefaults}
              title="Reset airport map to original default layout"
            >
              <RotateCcw size={14} />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="no-selection-prompt">
          <Move size={24} color="var(--sky-blue)" />
          <p>Click any location marker on the map to start editing its properties or drag its position in real-time.</p>
        </div>
      )}
    </div>
  );
};

export default EditMapPanel;
