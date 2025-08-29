import React from 'react';
import { testGoogleAnalytics } from './GoogleAnalytics';

const GoogleAnalyticsTest: React.FC = () => {
  const handleTest = () => {
    const success = testGoogleAnalytics();
    if (success) {
      alert('Google Analytics test event sent! Check console for details.');
    } else {
      alert('Google Analytics not working. Check console for errors.');
    }
  };
 

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleTest}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm"
        title="Test Google Analytics"
      >
        Test GA4
      </button>
    </div>
  );
};

export default GoogleAnalyticsTest;
