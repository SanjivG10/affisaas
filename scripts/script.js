// config.js
const CONFIG = {
  BASE_URL: "https://affisaas.com/js",
  COOKIE_KEYS: {
    AFFILIATE_CODE: 'affiliate_code',
    EXPIRY_DAYS: 'affiliate_code_expiry_days',
    TRACKING_ID: 'affiliate_tracking_id',
    CUSTOMER_ID: 'affiliate_customer_id'
  },
  DEFAULT_EXPIRY_DAYS: 30
};

// cookieManager.js
const CookieManager = {
  get(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  },

  set(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Strict`;
  },

  getTrackingData() {
    return {
      affiliateCode: this.get(CONFIG.COOKIE_KEYS.AFFILIATE_CODE),
      trackingId: this.get(CONFIG.COOKIE_KEYS.TRACKING_ID),
      customerId: this.get(CONFIG.COOKIE_KEYS.CUSTOMER_ID)
    };
  }
};

// trackingService.js
const TrackingService = {
  async generateTrackingIds() {
    const trackingId = crypto.randomUUID();
    const customerId = crypto.randomUUID();
    return { trackingId, customerId };
  },

  async trackClick(affiliateCode, trackingId, customerId) {
    try {
      const response = await fetch(`${CONFIG.BASE_URL}/api/affiliate/${affiliateCode}/click`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ trackingId, customerId })
      });

      if (!response.ok) {
        throw new Error(`Click tracking failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error tracking click:', error);
      throw error;
    }
  },

  async trackConversion(params) {
    const { orderId, orderAmount } = params;
    const trackingData = CookieManager.getTrackingData();

    if (!trackingData.affiliateCode || !trackingData.trackingId || !trackingData.customerId) {
      console.warn('Missing tracking data for conversion');
      return null;
    }

    try {
      const response = await fetch(
        `${CONFIG.BASE_URL}/api/affiliate/${trackingData.affiliateCode}/convert`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderId,
            orderAmount,
            trackingId: trackingData.trackingId,
            customerId: trackingData.customerId
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Conversion tracking failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error tracking conversion:', error);
      throw error;
    }
  }
};

// main.js
class AffiliateTracker {
  static async init() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const affiliateCode = urlParams.get('aff_code');
      
      if (!affiliateCode) return;

      const expiryDays = parseInt(urlParams.get('expiry_days'), 10) || CONFIG.DEFAULT_EXPIRY_DAYS;
      const { trackingId, customerId } = await TrackingService.generateTrackingIds();

      // Set all required cookies
      CookieManager.set(CONFIG.COOKIE_KEYS.AFFILIATE_CODE, affiliateCode, expiryDays);
      CookieManager.set(CONFIG.COOKIE_KEYS.EXPIRY_DAYS, expiryDays, expiryDays);
      CookieManager.set(CONFIG.COOKIE_KEYS.TRACKING_ID, trackingId, expiryDays);
      CookieManager.set(CONFIG.COOKIE_KEYS.CUSTOMER_ID, customerId, expiryDays);

      // Track the click
      await TrackingService.trackClick(affiliateCode, trackingId, customerId);
    } catch (error) {
      console.error('Initialization error:', error);
    }
  }

  static async trackConversion(orderId, orderAmount) {
    if (!orderId || !orderAmount) {
      console.error('Missing required conversion parameters');
      return;
    }

    try {
      return await TrackingService.trackConversion({ orderId, orderAmount });
    } catch (error) {
      console.error('Conversion tracking error:', error);
    }
  }
}

// Initialize the tracker
document.addEventListener('DOMContentLoaded', () => AffiliateTracker.init());

// Expose the conversion tracking method globally
window.trackConversion = AffiliateTracker.trackConversion;