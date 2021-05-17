let  serveBaseUrl = process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.deviceUrl;

export default serveBaseUrl
