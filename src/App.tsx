import React, { useState, useEffect } from 'react';
import { 
  Thermometer, 
  Droplets, 
  Sprout, 
  Zap, 
  Wifi, 
  Shield, 
  Bell, 
  Download, 
  Power, 
  Settings, 
  User, 
  LogOut,
  Menu,
  X,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  Smartphone,
  Mail,
  TrendingUp,
  Activity,
  Gauge,
  WifiOff,
  Battery,
  Signal
} from 'lucide-react';

// Types
interface SensorData {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  waterLevel1: number;
  waterLevel2: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  voltage: number;
  current: number;
  power: number;
}

interface DeviceStatus {
  waterPump: boolean;
  motor3Phase: boolean;
  irrigation: boolean;
  ventilation: boolean;
}

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  // Sensor data state
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: 26.5,
    humidity: 68,
    soilMoisture: 45,
    waterLevel1: 75,
    waterLevel2: 82,
    nitrogen: 120,
    phosphorus: 85,
    potassium: 160,
    ph: 6.8,
    voltage: 415,
    current: 12.5,
    power: 8.9
  });

  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>({
    waterPump: false,
    motor3Phase: true,
    irrigation: false,
    ventilation: true
  });

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      message: 'Soil moisture level below optimal range (45%)',
      timestamp: '2 minutes ago',
      acknowledged: false
    },
    {
      id: '2',
      type: 'critical',
      message: 'Water level 1 critically low (15%)',
      timestamp: '5 minutes ago',
      acknowledged: false
    },
    {
      id: '3',
      type: 'info',
      message: 'NPK analysis report generated successfully',
      timestamp: '1 hour ago',
      acknowledged: true
    }
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        temperature: Math.max(20, Math.min(35, prev.temperature + (Math.random() - 0.5) * 2)),
        humidity: Math.max(40, Math.min(90, prev.humidity + (Math.random() - 0.5) * 5)),
        soilMoisture: Math.max(20, Math.min(80, prev.soilMoisture + (Math.random() - 0.5) * 3)),
        waterLevel1: Math.max(10, Math.min(100, prev.waterLevel1 + (Math.random() - 0.5) * 2)),
        waterLevel2: Math.max(10, Math.min(100, prev.waterLevel2 + (Math.random() - 0.5) * 2)),
        current: Math.max(8, Math.min(20, prev.current + (Math.random() - 0.5) * 1)),
        power: Math.max(5, Math.min(15, prev.power + (Math.random() - 0.5) * 0.5))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Login component
  const LoginPage = () => {
    const [email, setEmail] = useState('admin@smartfarm.com');
    const [password, setPassword] = useState('admin123');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        if (email === 'admin@smartfarm.com' && password === 'admin123') {
          setCurrentUser({
            id: '1',
            name: 'Farm Administrator',
            email: 'admin@smartfarm.com',
            role: 'admin'
          });
          setIsLoggedIn(true);
        } else {
          alert('Invalid credentials. Use admin@smartfarm.com / admin123');
        }
        setIsLoading(false);
      }, 1500);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Sprout className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">SmartFarm IoT</h1>
            <p className="text-green-100">Agricultural Monitoring System</p>
          </div>
          
          <form onSubmit={handleLogin} className="p-8">
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Sign In'
              )}
            </button>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Demo Credentials:</p>
              <p className="text-xs text-gray-500">Email: admin@smartfarm.com</p>
              <p className="text-xs text-gray-500">Password: admin123</p>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Sensor Card Component
  const SensorCard = ({ title, value, unit, icon: Icon, status, trend }: {
    title: string;
    value: number;
    unit: string;
    icon: any;
    status: 'normal' | 'warning' | 'critical';
    trend?: 'up' | 'down' | 'stable';
  }) => {
    const getStatusColor = () => {
      switch (status) {
        case 'normal': return 'border-green-200 bg-green-50';
        case 'warning': return 'border-yellow-200 bg-yellow-50';
        case 'critical': return 'border-red-200 bg-red-50';
        default: return 'border-gray-200 bg-gray-50';
      }
    };

    const getValueColor = () => {
      switch (status) {
        case 'normal': return 'text-green-600';
        case 'warning': return 'text-yellow-600';
        case 'critical': return 'text-red-600';
        default: return 'text-gray-600';
      }
    };

    return (
      <div className={`p-6 rounded-xl border-2 ${getStatusColor()} transition-all duration-300 hover:shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <Icon className={`w-8 h-8 ${getValueColor()}`} />
          {trend && (
            <TrendingUp className={`w-5 h-5 ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500'}`} />
          )}
        </div>
        <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
        <div className="flex items-baseline">
          <span className={`text-3xl font-bold ${getValueColor()}`}>
            {typeof value === 'number' ? value.toFixed(1) : value}
          </span>
          <span className="text-lg text-gray-500 ml-1">{unit}</span>
        </div>
        <div className={`mt-2 px-2 py-1 rounded-full text-xs font-medium inline-block ${
          status === 'normal' ? 'bg-green-100 text-green-800' :
          status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {status.toUpperCase()}
        </div>
      </div>
    );
  };

  // Control Card Component
  const ControlCard = ({ title, description, isActive, onToggle, icon: Icon, disabled = false }: {
    title: string;
    description: string;
    isActive: boolean;
    onToggle: () => void;
    icon: any;
    disabled?: boolean;
  }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg ${isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          disabled={disabled}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
            isActive ? 'bg-green-600' : 'bg-gray-300'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${
              isActive ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
      <div className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
        isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {isActive ? 'ACTIVE' : 'INACTIVE'}
      </div>
    </div>
  );

  // Dashboard Component
  const Dashboard = () => (
    <div className="space-y-8">
      {/* System Status */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">System Status</h2>
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
              isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              <span className="text-sm font-medium">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Last update: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-800 font-medium">ESP32 Status</p>
                <p className="text-2xl font-bold text-green-600">Online</p>
              </div>
              <Signal className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-800 font-medium">GSM Signal</p>
                <p className="text-2xl font-bold text-blue-600">Strong</p>
              </div>
              <Smartphone className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-800 font-medium">Battery</p>
                <p className="text-2xl font-bold text-purple-600">85%</p>
              </div>
              <Battery className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-800 font-medium">Uptime</p>
                <p className="text-2xl font-bold text-orange-600">99.2%</p>
              </div>
              <Activity className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Sensor Monitoring */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Environmental Sensors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SensorCard
            title="Temperature"
            value={sensorData.temperature}
            unit="°C"
            icon={Thermometer}
            status={sensorData.temperature > 30 ? 'critical' : sensorData.temperature > 28 ? 'warning' : 'normal'}
            trend="stable"
          />
          <SensorCard
            title="Humidity"
            value={sensorData.humidity}
            unit="%"
            icon={Droplets}
            status={sensorData.humidity > 80 ? 'warning' : 'normal'}
            trend="up"
          />
          <SensorCard
            title="Soil Moisture"
            value={sensorData.soilMoisture}
            unit="%"
            icon={Sprout}
            status={sensorData.soilMoisture < 40 ? 'critical' : sensorData.soilMoisture < 50 ? 'warning' : 'normal'}
            trend="down"
          />
          <SensorCard
            title="pH Level"
            value={sensorData.ph}
            unit=""
            icon={Activity}
            status={sensorData.ph < 6.0 || sensorData.ph > 7.5 ? 'warning' : 'normal'}
            trend="stable"
          />
        </div>
      </div>

      {/* Water Level Monitoring */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Water Level Monitoring</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Tank 1 (Primary)</h3>
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-8">
                <div 
                  className={`h-8 rounded-full transition-all duration-500 ${
                    sensorData.waterLevel1 > 50 ? 'bg-green-500' : 
                    sensorData.waterLevel1 > 25 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${sensorData.waterLevel1}%` }}
                ></div>
              </div>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white">
                {sensorData.waterLevel1.toFixed(1)}%
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Tank 2 (Secondary)</h3>
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-8">
                <div 
                  className={`h-8 rounded-full transition-all duration-500 ${
                    sensorData.waterLevel2 > 50 ? 'bg-green-500' : 
                    sensorData.waterLevel2 > 25 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${sensorData.waterLevel2}%` }}
                ></div>
              </div>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white">
                {sensorData.waterLevel2.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Motor Control */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Motor Control & Monitoring</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700">3-Phase Motor Status</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
                <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-blue-800 font-medium">Voltage</p>
                <p className="text-2xl font-bold text-blue-600">{sensorData.voltage}V</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
                <Activity className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-yellow-800 font-medium">Current</p>
                <p className="text-2xl font-bold text-yellow-600">{sensorData.current}A</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <Gauge className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-green-800 font-medium">Power</p>
                <p className="text-2xl font-bold text-green-600">{sensorData.power}kW</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <ControlCard
              title="Water Pump"
              description="Primary irrigation pump"
              isActive={deviceStatus.waterPump}
              onToggle={() => setDeviceStatus(prev => ({ ...prev, waterPump: !prev.waterPump }))}
              icon={Droplets}
            />
            <ControlCard
              title="3-Phase Motor"
              description="Main agricultural motor"
              isActive={deviceStatus.motor3Phase}
              onToggle={() => setDeviceStatus(prev => ({ ...prev, motor3Phase: !prev.motor3Phase }))}
              icon={Zap}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // NPK Analysis Component
  const NPKAnalysis = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">NPK Soil Analysis</h2>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-800">Nitrogen (N)</h3>
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600 mb-2">{sensorData.nitrogen} ppm</p>
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (sensorData.nitrogen / 200) * 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-blue-700 mt-2">
              {sensorData.nitrogen > 150 ? 'Optimal' : sensorData.nitrogen > 100 ? 'Good' : 'Low'}
            </p>
          </div>
          
          <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-orange-800">Phosphorus (P)</h3>
              <Database className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-600 mb-2">{sensorData.phosphorus} ppm</p>
            <div className="w-full bg-orange-200 rounded-full h-3">
              <div 
                className="bg-orange-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (sensorData.phosphorus / 150) * 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-orange-700 mt-2">
              {sensorData.phosphorus > 100 ? 'Optimal' : sensorData.phosphorus > 60 ? 'Good' : 'Low'}
            </p>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-purple-800">Potassium (K)</h3>
              <Database className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600 mb-2">{sensorData.potassium} ppm</p>
            <div className="w-full bg-purple-200 rounded-full h-3">
              <div 
                className="bg-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (sensorData.potassium / 250) * 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-purple-700 mt-2">
              {sensorData.potassium > 180 ? 'Optimal' : sensorData.potassium > 120 ? 'Good' : 'Low'}
            </p>
          </div>
        </div>
        
        {/* Recommendations */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Fertilizer Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">Current Status</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Nitrogen levels are adequate for current crop stage</li>
                <li>• Phosphorus slightly below optimal range</li>
                <li>• Potassium levels are good</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">Recommended Actions</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Apply phosphorus-rich fertilizer (20-30 kg/ha)</li>
                <li>• Monitor nitrogen levels weekly</li>
                <li>• Maintain current potassium application</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Alerts Component
  const AlertsPanel = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">System Alerts</h2>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              {alerts.filter(a => !a.acknowledged).length} Active
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'critical' ? 'bg-red-50 border-red-500' :
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                'bg-blue-50 border-blue-500'
              } ${alert.acknowledged ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {alert.type === 'critical' ? (
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                  ) : alert.type === 'warning' ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  )}
                  <div>
                    <p className={`font-medium ${
                      alert.type === 'critical' ? 'text-red-800' :
                      alert.type === 'warning' ? 'text-yellow-800' :
                      'text-blue-800'
                    }`}>
                      {alert.message}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{alert.timestamp}</p>
                  </div>
                </div>
                {!alert.acknowledged && (
                  <button
                    onClick={() => setAlerts(prev => 
                      prev.map(a => a.id === alert.id ? { ...a, acknowledged: true } : a)
                    )}
                    className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors duration-200"
                  >
                    Acknowledge
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Notification Settings */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-800">Email Notifications</span>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-800">SMS Notifications</span>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Settings Component
  const SettingsPanel = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">System Settings</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sensor Thresholds</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Temperature Alert (°C)</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue="30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Humidity Alert (%)</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue="80" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soil Moisture Min (%)</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue="40" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Water Level Alert (%)</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue="20" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Automation Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-800">Auto Irrigation</span>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-800">Auto Ventilation</span>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Main Navigation
  const Navigation = () => (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">SmartFarm IoT</h1>
                <p className="text-xs text-gray-600">Agricultural Monitoring</p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Activity },
              { id: 'npk', label: 'NPK Analysis', icon: Database },
              { id: 'alerts', label: 'Alerts', icon: Bell },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  activeTab === id
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{currentUser?.name}</p>
                <p className="text-xs text-gray-600">{currentUser?.role}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setCurrentUser(null);
              }}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Activity },
                { id: 'npk', label: 'NPK Analysis', icon: Database },
                { id: 'alerts', label: 'Alerts', icon: Bell },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    setActiveTab(id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    activeTab === id
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  // Render main content
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'npk':
        return <NPKAnalysis />;
      case 'alerts':
        return <AlertsPanel />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;