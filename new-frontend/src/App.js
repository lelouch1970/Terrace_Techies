import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './App.css';

// Register Chart.js components we're using
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// --- Icons (as simple components for clarity) ---
const WaterDropIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.32 0L12 2.69z"/></svg>;
const ThermometerIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/><path d="M12 4a4 4 0 0 0-4 4v7.5a4 4 0 1 0 8 0V8a4 4 0 0 0-4-4z"/></svg>;
const ValveIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M22 12h-4.28c-.42-1.8-1.55-3.3-3.07-4.37l2.55-2.55a1 1 0 0 0-1.42-1.42l-2.55 2.55C11.3 5.33 9.8 4.2 8 3.72V2a1 1 0 0 0-2 0v1.72C4.2 4.2 2.7 5.33 1.63 6.93l-2.55-2.55a1 1 0 0 0-1.42 1.42l2.55 2.55C-0.37 10.7 0.76 12.2 2.58 12.62H2a1 1 0 0 0 0 2h.58c.42 1.8 1.55 3.3 3.07 4.37l-2.55 2.55a1 1 0 1 0 1.42 1.42l2.55-2.55c1.95 1.18 4.3 1.18 6.26 0l2.55 2.55a1 1 0 0 0 1.42-1.42l-2.55-2.55c1.52-1.07 2.65-2.57 3.07-4.37H22a1 1 0 0 0 0-2zm-10 4a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/></svg>;
const SettingsIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19.4 12.6a1 1 0 0 0-1.4 0l-.8.8-1.5-1.5.8-.8a1 1 0 0 0 0-1.4l-2-2a1 1 0 0 0-1.4 0l-.8.8-1.5-1.5.8-.8a1 1 0 0 0 0-1.4l-2-2a1 1 0 0 0-1.4 0l-.8.8-1.5-1.5.8-.8a1 1 0 0 0 0-1.4A1 1 0 0 0 4.6 2.4l-2 2a1 1 0 0 0 0 1.4l.8.8 1.5 1.5-.8.8a1 1 0 0 0 0 1.4l2 2a1 1 0 0 0 1.4 0l.8-.8 1.5 1.5-.8.8a1 1 0 0 0 0 1.4l2 2a1 1 0 0 0 1.4 0l.8-.8 1.5 1.5-.8.8a1 1 0 0 0 0 1.4l2 2a1 1 0 0 0 1.4 0l.8-.8 1.5 1.5-.8.8a1 1 0 0 0 0 1.4l2 2a1 1 0 0 0 1.4 0l2-2a1 1 0 0 0 0-1.4l-.8-.8-1.5-1.5.8-.8a1 1 0 0 0 0-1.4l-2-2a1 1 0 0 0-1.4 0l-.8.8 1.5-1.5.8-.8z"/></svg>;


// --- Translations ---
const translations = {
  en: { title: "Sopan 1.0", auto: "Automatic", manual: "Manual", soilMoisture: "Soil Moisture", temperature: "Temperature", waterValve: "Water Valve", settings: "Settings", save: "Save", lowThreshold: "Turn ON below", highThreshold: "Turn OFF above", on: "ON", off: "OFF", dry: "Dry", optimal: "Optimal", wet: "Wet" },
  hi: { title: "सोपान 1.0", auto: "स्वचालित", manual: "मैनुअल", soilMoisture: "मिट्टी में नमी", temperature: "तापमान", waterValve: "पानी का वाल्व", settings: "सेटिंग्स", save: "सहेजें", lowThreshold: "इससे नीचे चालू करें", highThreshold: "इससे ऊपर बंद करें", on: "चालू", off: "बंद", dry: "सूखा", optimal: "इष्टतम", wet: "गीला" },
  ne: { title: "सोपान 1.0", auto: "स्वचालित", manual: "म्यानुअल", soilMoisture: "माटोको चिस्यान", temperature: "तापमान", waterValve: "पानी भल्भ", settings: "सेटिङहरू", save: "सेभ गर्नुहोस्", lowThreshold: "तल खोल्नुहोस्", highThreshold: "माथि बन्द गर्नुहोस्", on: "अन", off: "अफ", dry: "सुख्खा", optimal: "उत्तम", wet: "भिजेको" }
};

// --- Main App Component ---
function App() {
  const [lang, setLang] = useState('en');
  const [mode, setMode] = useState('auto');
  const [valveOn, setValveOn] = useState(false);
  const [soilMoisture, setSoilMoisture] = useState(35);
  const [temperature, setTemperature] = useState(26);
  
  // New state for chart history and settings
  const [history, setHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [settings, setSettings] = useState({ low: 30, high: 60 });

  const t = translations[lang];

  // Effect for SIMULATING live sensor data
  useEffect(() => {
    const interval = setInterval(() => {
      // If valve is on, moisture increases. If off, it dries out.
      setSoilMoisture(prev => {
        const change = valveOn ? 0.5 : -0.2;
        const newValue = Math.max(10, Math.min(90, prev + change));
        return parseFloat(newValue.toFixed(1));
      });

      // Update history for the chart
      setHistory(prevHistory => {
        const now = new Date();
        const newPoint = {
          time: now.toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
          value: soilMoisture
        };
        // Keep the history to a max of 20 points
        const updatedHistory = [...prevHistory, newPoint].slice(-20);
        return updatedHistory;
      });

    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [valveOn, soilMoisture]);


  // Effect for the automatic system logic
  useEffect(() => {
    if (mode === 'auto') {
      if (soilMoisture < settings.low) {
        setValveOn(true);
      } else if (soilMoisture > settings.high) {
        setValveOn(false);
      }
    }
  }, [soilMoisture, mode, settings]);

  const getSoilStatus = (moisture) => {
    if (moisture < settings.low) return { key: 'dry', text: t.dry };
    if (moisture > settings.high) return { key: 'wet', text: t.wet };
    return { key: 'optimal', text: t.optimal };
  };

  const soilStatus = getSoilStatus(soilMoisture);

  const chartData = {
    labels: history.map(p => p.time),
    datasets: [{
      label: t.soilMoisture,
      data: history.map(p => p.value),
      borderColor: '#2a9d8f',
      backgroundColor: 'rgba(42, 157, 143, 0.1)',
      fill: true,
      tension: 0.3
    }]
  };
  
  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { min: 10, max: 90 } }
  };

  const handleSettingsSave = (newSettings) => {
    setSettings(newSettings);
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      <header>
        <h1>🌱 {t.title}</h1>
        <div className="lang-selector">
          <button onClick={() => setLang('en')} className={lang === 'en' ? 'active' : ''}>EN</button>
          <button onClick={() => setLang('hi')} className={lang === 'hi' ? 'active' : ''}>HI</button>
          <button onClick={() => setLang('ne')} className={lang === 'ne' ? 'active' : ''}>NE</button>
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
            <StatusCard icon={<WaterDropIcon />} title={t.soilMoisture} value={soilMoisture} unit="%" status={soilStatus.key} statusText={soilStatus.text} />
            <StatusCard icon={<ThermometerIcon />} title={t.temperature} value={temperature} unit="°C" status="optimal" />
            <StatusCard icon={<ValveIcon />} title={t.waterValve} value={valveOn ? t.on : t.off} unit="" status={valveOn ? 'on' : 'off'}>
              {mode === 'manual' && (
                <div className="manual-controls">
                  <button className="btn-on" onClick={() => setValveOn(true)} disabled={valveOn}>{t.on}</button>
                  <button className="btn-off" onClick={() => setValveOn(false)} disabled={!valveOn}>{t.off}</button>
                </div>
              )}
            </StatusCard>
        </div>

        <div className="chart-container">
            <h3>{t.soilMoisture} (Last Minute)</h3>
            <Line options={chartOptions} data={chartData} />
        </div>
      </main>
      
      <button className="settings-btn" onClick={() => setIsModalOpen(true)}>
        <SettingsIcon />
      </button>

      {isModalOpen && <SettingsModal t={t} currentSettings={settings} onSave={handleSettingsSave} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

// --- Reusable Components ---
const StatusCard = ({ icon, title, value, unit, status, statusText, children }) => {
  return (
    <div className={`card status-${status}`}>
      <div className="card-header">
        {icon}
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        <p className="value">{value}<span>{unit}</span></p>
        {statusText && <p className="status-text">{statusText}</p>}
      </div>
      {children && <div className="card-footer">{children}</div>}
    </div>
  );
};

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