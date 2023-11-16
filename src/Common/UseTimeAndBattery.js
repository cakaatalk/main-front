import { useState, useEffect } from 'react';
import { faBolt, faBatteryFull, faBatteryHalf, faBatteryQuarter, faBatteryEmpty } from '@fortawesome/free-solid-svg-icons';

function useTimeAndBattery() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    navigator.getBattery().then(battery => {
      const updateBatteryInfo = () => {
        setBatteryLevel((battery.level * 100).toFixed(0));
        setIsCharging(battery.charging);
      };

      updateBatteryInfo();

      battery.addEventListener('levelchange', updateBatteryInfo); {/* 굳이 eventListener안해도 되긴 함 */}
      battery.addEventListener('chargingchange', updateBatteryInfo);

      return () => {
        battery.removeEventListener('levelchange', updateBatteryInfo);
        battery.removeEventListener('chargingchange', updateBatteryInfo);
      };
    });

    return () => clearInterval(timeInterval);
  }, []);

  const getBatteryIcon = () => {
    if (isCharging) {
      return faBolt;
    } else if (batteryLevel > 75) {
      return faBatteryFull;
    } else if (batteryLevel > 50) {
      return faBatteryHalf;
    } else if (batteryLevel > 25) {
      return faBatteryQuarter;
    } else {
      return faBatteryEmpty;
    }
  };

  return { currentTime, batteryLevel, getBatteryIcon };
}

export default useTimeAndBattery;
