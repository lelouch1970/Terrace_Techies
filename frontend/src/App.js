import React, { useState, useEffect } from 'react';
import './App.css';

// --- Language Data (Internationalization) ---
const translations = {
  en: {
    title: "Sopan 1.0",
    auto: "Automatic",
    manual: "Manual",
    soilMoisture: "Soil Moisture",
    temperature: "Temperature",
    waterValve: "Water Valve",
    status: "Status",
    on: "ON",
    off: "OFF",
    dry: "Dry",
    optimal: "Optimal",
    wet: "Wet"
  },
  hi: {
    title: "सोपान 1.0",
    auto: "स्वचालित",
    manual: "मैनुअल",
    soilMoisture: "मिट्टी में नमी",
    temperature: "तापमान",
    waterValve: "पानी का वाल्व",
    status: "स्थिति",
    on: "चालू",
    off: "बंद",
    dry: "सूखा",
    optimal: "इष्टतम",
    wet: "गीला"
  },
  ne: {
    title: "सोपान 1.0",
    auto: "स्वचालित",
    manual: "म्यानुअल",
    soilMoisture: "माटोको चिस्यान",
    temperature: "तापमान",
    waterValve: "पानी भल्भ",
    status: "स्थिति",
    on: "अन",
    off: "अफ",
    dry: "सुख्खा",
    optimal: "उत्तम",
    wet: "भिजेको"
  }
};

// --- Reusable Status Card Component ---
const StatusCard = ({ title, value, unit, status, children }) => {
  // ✅ FIXED: Used backticks for the template literal
  const statusClass = `card status-${status}`;
  return (
    <div className={statusClass}>
      <h3>{title}</h3>
      <div className="card-content">
        <p className="value">{value}<span>{unit}</span></p>
        {children}
      </div>
    </div>
  );
};

// --- Main App Component ---
function App() {
  const [lang, setLang] = useState('en');
  const [mode, setMode] = useState('auto'); // 'auto' or 'manual'
  const [valveOn, setValveOn] = useState(false);

  // --- Mock Sensor Data ---
  const [soilMoisture, setSoilMoisture] = useState(28); // in percentage
  const [temperature, setTemperature] = useState(24); // in Celsius

  const t = translations[lang];

  // This effect simulates the automatic system behavior
  useEffect(() => {
    if (mode === 'auto') {
      // Rule: If moisture is below 30%, turn valve on. If above 60%, turn it off.
      if (soilMoisture < 30) {
        setValveOn(true);
      } else if (soilMoisture > 60) {
        setValveOn(false);
      }
    }
    // In manual mode, this effect does nothing.
  }, [soilMoisture, mode]);


  const getSoilStatus = (moisture) => {
    if (moisture < 30) return { key: 'dry', text: t.dry };
    if (moisture > 60) return { key: 'wet', text: t.wet };
    return { key: 'optimal', text: t.optimal };
  };

  const soilStatus = getSoilStatus(soilMoisture);

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
        {/* --- NEW TOGGLE SWITCH --- */}
        <div className="toggle-switch-container">
          {/* ✅ FIXED: Used backticks for the template literal */}
          <span className={`mode-label ${mode === 'manual' ? 'active' : ''}`}>{t.manual}</span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={mode === 'auto'}
              onChange={() => setMode(mode === 'auto' ? 'manual' : 'auto')}
            />
            <span className="slider"></span>
          </label>
          {/* ✅ FIXED: Used backticks for the template literal */}
          <span className={`mode-label ${mode === 'auto' ? 'active' : ''}`}>{t.auto}</span>
        </div>

        <div className="card-grid">
          <StatusCard title={t.soilMoisture} value={soilMoisture} unit="%" status={soilStatus.key}>
            <p className="status-text">{soilStatus.text}</p>
          </StatusCard>

          <StatusCard title={t.temperature} value={temperature} unit="°C" status="optimal">
            <p className="status-text">☀</p>
          </StatusCard>

          <StatusCard title={t.waterValve} value={valveOn ? t.on : t.off} unit="" status={valveOn ? 'on' : 'off'}>
            {mode === 'manual' && (
              <div className="manual-controls">
                <button className="btn-on" onClick={() => setValveOn(true)}>{t.on}</button>
                <button className="btn-off" onClick={() => setValveOn(false)}>{t.off}</button>
              </div>
            )}
          </StatusCard>
        </div>
      </main>
    </div>
  );
}

export default App;