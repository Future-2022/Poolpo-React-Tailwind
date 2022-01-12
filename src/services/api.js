export const restApiSettings = {
  baseURL: process.env.REACT_APP_API_BASE_URL || ((window.location.hostname === "v4.poolpo.in" || window.location.hostname === "localhost") ? 'https://staging.poolpo.in/api' : 'https://api.poolpo.in/api'),
  // baseURL: process.env.REACT_APP_API_BASE_URL || 'https://localhost:44352/api',
  alterURL: process.env.REACT_APP_API_BASE_URL || 'https://poolpo-strapi.herokuapp.com',
}
