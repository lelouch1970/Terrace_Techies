import React, { useState, useEffect } from 'react';
import './App.css';

// --- Icons (New weather icons added) ---
const WaterDropIcon = () => <svg viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.32 0L12 2.69z"/></svg>;
const SunIcon = () => <svg viewBox="0 0 24 24"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0-5a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 18a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1zm-7.78-3.22a1 1 0 0 1 0-1.42l1.42-1.42a1 1 0 1 1 1.42 1.42l-1.42 1.42a1 1 0 0 1-1.42 0zm12.74 0a1 1 0 0 1-1.42 0l-1.42-1.42a1 1 0 1 1 1.42-1.42l1.42 1.42a1 1 0 0 1 0 1.42zM4.22 6.36a1 1 0 0 1 0 1.42L2.8 9.2a1 1 0 1 1-1.42-1.42L2.8 6.36a1 1 0 0 1 1.42 0zm12.74 0a1 1 0 0 1 1.42 0l1.42 1.42a1 1 0 1 1-1.42 1.42L18.36 7.78a1 1 0 0 1 0-1.42zM22 12a1 1 0 0 1-1-1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zm-20 0a1 1 0 0 1-1-1H1a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1z"/></svg>;
const CloudIcon = () => <svg viewBox="0 0 24 24"><path d="M19.35 10.04A8.5 8.5 0 0 0 12 4a8.5 8.5 0 0 0-8.24 6.03A6 6 0 0 0 6 20h12a5 5 0 0 0 .35-9.96z"/></svg>;
const ValveIcon = () => <svg viewBox="0 0 24 24"><path d="M22 12h-4.28c-.42-1.8-1.55-3.3-3.07-4.37l2.55-2.55a1 1 0 0 0-1.42-1.42l-2.55 2.55C11.3 5.33 9.8 4.2 8 3.72V2a1 1 0 0 0-2 0v1.72C4.2 4.2 2.7 5.33 1.63 6.93l-2.55-2.55a1 1 0 0 0-1.42 1.42l2.55 2.55C-0.37 10.7 0.76 12.2 2.58 12.62H2a1 1 0 0 0 0 2h.58c.42 1.8 1.55 3.3 3.07 4.37l-2.55 2.55a1 1 0 1 0 1.42 1.42l2.55-2.55c1.95 1.18 4.3 1.18 6.26 0l2.55 2.55a1 1 0 0 0 1.42-1.42l-2.55-2.55c1.52-1.07 2.65-2.57 3.07-4.37H22a1 1 0 0 0 0-2zm-10 4a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/></svg>;
const SettingsIcon = () => <svg viewBox="0 0 24 24"><path d="M19.4 12.6a1 1 0 0 0-1.4 0l-.8.8-1.5-1.5.8-.8a1 1 0 0 0 0-1.4l-2-2a1 1 0 0 0-1.4 0l-.8.8-1.5-1.5.8-.8a1 1 0 0 0 0-1.4l-2-2a1 1 0 0 0-1.4 0l-.8.8-1.5-1.5.8-.8a1 1 0 0 0 0-1.4A1 1 0 0 0 4.6 2.4l-2 2a1 1 0 0 0 0 1.4l.8.8 1.5 1.5-.8.8a1 1 0 0 0 0 1.4l2 2a1 1 0 0 0 1.4 0l.8-.8 1.5 1.5-.8.8a1 1 0 0 0 0 1.4l2 2a1 1 0 0 0 1.4 0l.8-.8 1.5 1.5-.8.8a1 1 0 0 0 0 1.4l2 2a1 1 0 0 0 1.4 0l.8-.8 1.5 1.5-.8.8a1 1 0 0 0 0 1.4l2 2a1 1 0 0 0 1.4 0l2-2a1 1 0 0 0 0-1.4l-.8-.8-1.5-1.5.8-.8a1 1 0 0 0 0-1.4l-2-2a1 1 0 0 0-1.4 0l-.8.8 1.5-1.5.8-.8z"/></svg>;


// --- Translations (Updated for Weather) ---
const translations = {
  en: { title: "Sopan 1.0", auto: "Automatic", manual: "Manual", soilMoisture: "Soil Moisture", weather: "Weather", waterValve: "Water Valve", settings: "Settings", save: "Save", lowThreshold: "Turn ON below", highThreshold: "Turn OFF above", on: "ON", off: "OFF", dry: "Dry", optimal: "Optimal", wet: "Wet", sunny: "Sunny", cloudy: "Cloudy" },
  hi: { title: "सोपान 1.0", auto: "स्वचालित", manual: "मैनुअल", soilMoisture: "मिट्टी में नमी", weather: "मौसम", waterValve: "पानी का वाल्व", settings: "सेटिंग्स", save: "सहेजें", lowThreshold: "इससे नीचे चालू करें", highThreshold: "इससे ऊपर बंद करें", on: "चालू", off: "बंद", dry: "सूखा", optimal: "इष्टतम", wet: "गीला", sunny: "धूप", cloudy: "बादल छाए" },
  ne: { title: "सोपान 1.0", auto: "स्वचालित", manual: "म्यानुअल", soilMoisture: "माटोको चिस्यान", weather: "मौसम", waterValve: "पानी भल्भ", settings: "सेटिङहरू", save: "सेभ गर्नुहोस्", lowThreshold: "तल खोल्नुहोस्", highThreshold: "माथि बन्द गर्नुहोस्", on: "अन", off: "अफ", dry: "सुख्खा", optimal: "उत्तम", wet: "भिजेको", sunny: "घाम", cloudy: "बादल" }
};

function App() {
  const [lang, setLang] = useState('en');
  const [mode, setMode] = useState('auto');
  const [valveOn, setValveOn] = useState(false);
  
  // Static values for demonstration. Set to "Optimal" so valve starts OFF.
  const [soilMoisture] = useState(45);
  const [weather] = useState('sunny'); // 'sunny' or 'cloudy'

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [settings, setSettings] = useState({ low: 30, high: 60 });

  const t = translations[lang];

  // Automatic system logic
  useEffect(() => {
    if (mode === 'auto') {
      if (soilMoisture < settings.low) setValveOn(true);
      else if (soilMoisture > settings.high) setValveOn(false);
      else setValveOn(false); // If optimal, ensure valve is off
    }
  }, [soilMoisture, mode, settings]);

  const getSoilStatus = (moisture) => {
    if (moisture < settings.low) return { key: 'dry', text: t.dry };
    if (moisture > settings.high) return { key: 'wet', text: t.wet };
    return { key: 'optimal', text: t.optimal };
  };

  const getWeatherStatus = () => {
    if (weather === 'sunny') return { key: 'sunny', text: t.sunny, icon: <SunIcon /> };
    return { key: 'cloudy', text: t.cloudy, icon: <CloudIcon /> };
  };

  const soilStatus = getSoilStatus(soilMoisture);
  const weatherStatus = getWeatherStatus();

  const handleSettingsSave = (newSettings) => {
    setSettings(newSettings);
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      <header>
        <h1>🌱 {t.title}</h1>
        <div className="lang-selector">
          <button onClick={() => setLang('en')} className={lang === 'en' ? 'active' : ''}>English</button>
          <button onClick={() => setLang('hi')} className={lang === 'hi' ? 'active' : ''}>हिन्दी</button>
          <button onClick={() => setLang('ne')} className={lang === 'ne' ? 'active' : ''}>नेपाली</button>
        </div>
      </header>

      <main className="dashboard">
        <div className="main-controls">
          <span className={`mode-label ${mode === 'manual' ? 'active' : ''}`}>{t.manual}</span>
          <label className="toggle-switch">
            <input type="checkbox" checked={mode === 'auto'} onChange={() => setMode(m => m === 'auto' ? 'manual' : 'auto')} />
            <span className="slider"></span>
          </label>
          <span className={`mode-label ${mode === 'auto' ? 'active' : ''}`}>{t.auto}</span>
        </div>
        
        <div className="card-grid">
            <VisualCard icon={<WaterDropIcon />} title={t.soilMoisture} status={soilStatus.key} statusText={soilStatus.text} />
            <VisualCard icon={weatherStatus.icon} title={t.weather} status={weatherStatus.key} statusText={weatherStatus.text} />
            <VisualCard icon={<ValveIcon />} title={t.waterValve} status={valveOn ? 'on' : 'off'} statusText={valveOn ? t.on : t.off}>
              {mode === 'manual' && (
                <div className="manual-controls">
                  <button className="btn-on" onClick={() => setValveOn(true)} disabled={valveOn}>{t.on}</button>
                  <button className="btn-off" onClick={() => setValveOn(false)} disabled={!valveOn}>{t.off}</button>
                </div>
              )}
            </VisualCard>
        </div>
      </main>
      
      <button className="settings-btn" onClick={() => setIsModalOpen(true)}>
        <SettingsIcon />
      </button>

      {isModalOpen && <SettingsModal t={t} currentSettings={settings} onSave={handleSettingsSave} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

// --- NEW Reusable Visual Card Component ---
const VisualCard = ({ icon, title, status, statusText, children }) => {
  return (
    <div className={`card visual-card status-${status}`}>
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        <div className="icon-display">{icon}</div>
        <p className="status-text">{statusText}</p>
      </div>
      {children && <div className="card-footer">{children}</div>}
    </div>
  );
};

// --- Settings Modal (Unchanged) ---
const SettingsModal = ({ t, currentSettings, onSave, onClose }) => {
  const [low, setLow] = useState(currentSettings.low);
  const [high, setHigh] = useState(currentSettings.high);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{t.settings}</h2>
        <div className="setting-item">
          <label>{t.lowThreshold}: <span>{low}%</span></label>
          <input type="range" min="10" max="50" value={low} onChange={e => setLow(Number(e.target.value))} />
        </div>
        <div className="setting-item">
          <label>{t.highThreshold}: <span>{high}%</span></label>
          <input type="range" min="51" max="90" value={high} onChange={e => setHigh(Number(e.target.value))} />
        </div>
        <button className="save-btn" onClick={() => onSave({ low, high })}>{t.save}</button>
      </div>
    </div>
  );
};

export default App;