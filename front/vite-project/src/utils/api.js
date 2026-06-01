// api.js
// Global Fetch API Wrapper for Maum Bread REST APIs

const BASE_URL = "http://localhost:8080";

/**
 * Custom Fetch Wrapper that automatically injects Authorization headers,
 * sets Content-Type, parses unified error responses, and prevents JSON parse crashes on empty responses.
 * 
 * @param {string} endpoint - The API endpoint path (e.g. "/notice/list" or "/member/me")
 * @param {Object} options - Standard fetch options (method, headers, body, etc.)
 * @returns {Promise<any>} - Resolved JSON data or parsed text response
 */
export function request(endpoint, options = {}) {
  // 1. Scan localStorage for the session token
  const token = localStorage.getItem("maum_auth_token");
  
  // 2. Clone headers to prevent mutation of default options
  const headers = {
    ...options.headers
  };

  // 3. Automatically inject default Content-Type for POST/PUT requests with body
  if (options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  // 4. Automatically inject Bearer Authorization header if token exists
  if (token && !headers["Authorization"]) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers
  };

  // 5. Execute fetch with base URL routing
  return fetch(`${BASE_URL}${endpoint}`, config)
    .then((response) => {
      if (!response.ok) {
        // Parse error response (either raw error text or JSON structure)
        return response.text().then((text) => {
          let parsedError = text;
          try {
            const json = JSON.parse(text);
            parsedError = json.message || text;
          } catch (e) {
            // Not a JSON error, use raw text
          }
          throw new Error(parsedError || `HTTP error! Status: ${response.status}`);
        });
      }
      
      // 6. Handle empty/void responses gracefully to prevent JSON parse crashes
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      }
      return response.text(); // Return plain text for 200/204 void responses
    });
}
