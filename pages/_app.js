import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createGlobalStyle } from 'styled-components';
import { CartContextProvider } from '@/components/utils/CartContext';
import Loader from '@/components/utils/Loader'; // Import your Loader component
import { Analytics } from '@vercel/analytics/react';
import axios from 'axios';
import WhatsAppIcon from '@/components/icons/HomeWhatsapp';


// Global Styles
const GlobalStyles = createGlobalStyle`
  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', "poppins";
  }
`;

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Initial loading state
  const Pixel_ID = "1102422468084127";


  const trackingQueue = []; // Queue to store tracking data
  const batchInterval = 5000; // Interval in milliseconds for sending batch data

  useEffect(() => {
    // Set a delay of 3 seconds
    const timer = setTimeout(() => setLoading(false), 0);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  // Track loading state during route changes
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.events]);


  // Track page views and send data to Facebook Pixel
  useEffect(() => {
    // Check if we are in a browser environment
    if (typeof window !== 'undefined') {
      // Initialize Facebook Pixel
      !function(f,b,e,v,n,t,s) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s);
      }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      fbq('init', Pixel_ID); // Replace with your Pixel ID
      console.log("process?: ", Pixel_ID)
      fbq('track', 'PageView');

      // Track route changes as page views
      const handleRouteChange = (url) => {
        fbq('track', 'PageView', { page: url });
        console.log('Facebook Pixel Event - PageView sent for URL:', url);
      };

      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router.events]);


  // Send tracking data in batches
  function sendBatchData() {
    if (trackingQueue.length > 0) {
      const batchData = [...trackingQueue];
      trackingQueue.length = 0; // Clear the queue after copying
  
      // Capture the start time before the request
      const startTime = Date.now();
  
      axios.post('/api/datatrack', batchData)
        .then((response) => {
          // Capture the end time after the request
          const endTime = Date.now();
  
          // Log the time taken for the MongoDB insert
          console.log(`Batch processed and inserted into MongoDB in ${endTime - startTime} ms`);
  
          // Optionally log the response if needed
          console.log('Batch data sent successfully:', response.data);
        })
        .catch((err) => {
          // Log error details if the insert fails
          console.error('Error sending batch data:', err);
        });
    }
  }
  

  // Collect and queue tracking data
  useEffect(() => {
    const trackingData = {
      page: router.asPath,
      referrer: document.referrer || 'Direct',
      country: navigator.language || 'Unknown',
      timestamp: new Date(),
      device: getDeviceInfo(),
      sessionId: getSessionId(),
      referralSource: getReferralSource(),
    };

    // Add tracking data to the queue
    trackingQueue.push(trackingData);

    // Start batch sending at regular intervals
    const intervalId = setInterval(sendBatchData, batchInterval);

    // Send data when the user is about to leave the page
    window.addEventListener('beforeunload', sendBatchData);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('beforeunload', sendBatchData);
    };
  }, [router.asPath]);

  return (
    <>
      <GlobalStyles />
      {loading ? (
        <Loader /> // Show Loader for 3 seconds
      ) : (
        <CartContextProvider>
          <Component {...pageProps} />
          <Analytics />
          <WhatsAppIcon />
        </CartContextProvider>
      )}
    </>
  );
}

// Utility functions
function getDeviceInfo() {
  const userAgent = navigator.userAgent;

  // Detect Device Type
  const deviceType = /Mobile|Android|iPhone/.test(userAgent) ? 'Mobile' : 'Desktop';

  // Detect Browser
  let browser = 'Unknown';
  if (userAgent.includes("Chrome")) {
    browser = 'Chrome';
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    browser = 'Safari';
  } else if (userAgent.includes("Firefox")) {
    browser = 'Firefox';
  } else if (userAgent.includes("Edge")) {
    browser = 'Edge';
  } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
    browser = 'Internet Explorer';
  }

  // Detect OS
  const os = navigator.platform;

  return { deviceType, browser, os };
}


function getSessionId() {
  const sessionId = localStorage.getItem('sessionId') || generateSessionId();
  localStorage.setItem('sessionId', sessionId);
  return sessionId;
}

function generateSessionId() {
  return 'session-' + Math.random().toString(36).substr(2, 9);
}

function getReferralSource() {
  return document.referrer || 'Direct';
}
