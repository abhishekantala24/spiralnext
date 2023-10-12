'use client'
import React, { useEffect, useState } from 'react';

const Test = () => {
  const [browserInfo, setBrowserInfo] = useState<any>({});

  useEffect(() => {
    // Get browser information when the component mounts
    const browserName = detectBrowser();
    const browserVersion = detectBrowserVersion();

    setBrowserInfo({ name: browserName, version: browserVersion });
  }, []);

  // Function to detect the browser name
  const detectBrowser = () => {
    const userAgent = window.navigator.userAgent;

    if (userAgent.includes('Chrome')) {
      return 'Chrome';
    } else if (userAgent.includes('Firefox')) {
      return 'Firefox';
    } else if (userAgent.includes('Safari')) {
      return 'Safari';
    } else if (userAgent.includes('Edge') || userAgent.includes('Edg')) {
      return 'Microsoft Edge';
    } else if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) {
      return 'Internet Explorer';
    } else {
      return 'Unknown';
    }
  };

  // Function to detect the browser version
  const detectBrowserVersion = () => {
    const userAgent = window.navigator.userAgent;

    const versionIndex = userAgent.indexOf('Chrome/');
    if (versionIndex !== -1) {
      return userAgent.substring(versionIndex + 7, userAgent.indexOf(' ', versionIndex));
    }

    return 'Unknown';
  };

  return (
    <div className="App">
      <h1>Browser Information</h1>
      <p>Browser Name: {browserInfo?.name}</p>
      <p>Browser Version: {browserInfo?.version}</p>
    </div>
  );
}

export default Test;
