export const GA_TRACKING_ID = 'G-20SGT8JBK6'; 
export const GTM_TRACKING_ID = 'GTM-MS7MCFTR'; 

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: any) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};