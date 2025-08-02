// ===== UTILITY FUNCTIONS =====

// ===== DOM UTILITIES =====
const DOMUtils = {
    // Get element by selector
    get: (selector) => document.querySelector(selector),
    
    // Get all elements by selector
    getAll: (selector) => document.querySelectorAll(selector),
    
    // Create element with attributes
    create: (tag, attributes = {}, children = []) => {
        const element = document.createElement(tag);
        
        // Set attributes
        Object.keys(attributes).forEach(key => {
            if (key === 'className') {
                element.className = attributes[key];
            } else if (key === 'textContent') {
                element.textContent = attributes[key];
            } else if (key === 'innerHTML') {
                element.innerHTML = attributes[key];
            } else {
                element.setAttribute(key, attributes[key]);
            }
        });
        
        // Append children
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        });
        
        return element;
    },
    
    // Add event listener with options
    on: (element, event, handler, options = {}) => {
        element.addEventListener(event, handler, options);
    },
    
    // Remove event listener
    off: (element, event, handler) => {
        element.removeEventListener(event, handler);
    },
    
    // Toggle class
    toggleClass: (element, className) => {
        element.classList.toggle(className);
    },
    
    // Add class
    addClass: (element, className) => {
        element.classList.add(className);
    },
    
    // Remove class
    removeClass: (element, className) => {
        element.classList.remove(className);
    },
    
    // Check if element has class
    hasClass: (element, className) => {
        return element.classList.contains(className);
    },
    
    // Set multiple styles
    setStyles: (element, styles) => {
        Object.keys(styles).forEach(property => {
            element.style[property] = styles[property];
        });
    },
    
    // Get computed style
    getStyle: (element, property) => {
        return window.getComputedStyle(element).getPropertyValue(property);
    },
    
    // Show element
    show: (element) => {
        element.style.display = '';
    },
    
    // Hide element
    hide: (element) => {
        element.style.display = 'none';
    },
    
    // Fade in element
    fadeIn: (element, duration = 300) => {
        element.style.opacity = '0';
        element.style.display = '';
        
        let start = null;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const opacity = Math.min(progress / duration, 1);
            
            element.style.opacity = opacity;
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },
    
    // Fade out element
    fadeOut: (element, duration = 300) => {
        const startOpacity = parseFloat(element.style.opacity) || 1;
        let start = null;
        
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const opacity = Math.max(startOpacity - (progress / duration), 0);
            
            element.style.opacity = opacity;
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        };
        
        requestAnimationFrame(animate);
    }
};

// ===== STRING UTILITIES =====
const StringUtils = {
    // Capitalize first letter
    capitalize: (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    
    // Convert to title case
    titleCase: (str) => {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },
    
    // Convert to camel case
    camelCase: (str) => {
        return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    },
    
    // Convert to kebab case
    kebabCase: (str) => {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    },
    
    // Truncate string
    truncate: (str, length, suffix = '...') => {
        if (str.length <= length) return str;
        return str.substring(0, length) + suffix;
    },
    
    // Generate random string
    random: (length = 8) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },
    
    // Slugify string
    slugify: (str) => {
        return str
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },
    
    // Escape HTML
    escapeHtml: (str) => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },
    
    // Unescape HTML
    unescapeHtml: (str) => {
        const div = document.createElement('div');
        div.innerHTML = str;
        return div.textContent;
    }
};

// ===== NUMBER UTILITIES =====
const NumberUtils = {
    // Format number with commas
    format: (num, decimals = 0) => {
        return num.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    },
    
    // Format as currency
    currency: (num, currency = 'USD') => {
        return num.toLocaleString('en-US', {
            style: 'currency',
            currency: currency
        });
    },
    
    // Format as percentage
    percentage: (num, decimals = 1) => {
        return (num * 100).toFixed(decimals) + '%';
    },
    
    // Clamp number between min and max
    clamp: (num, min, max) => {
        return Math.min(Math.max(num, min), max);
    },
    
    // Round to nearest multiple
    roundTo: (num, multiple) => {
        return Math.round(num / multiple) * multiple;
    },
    
    // Generate random number
    random: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    // Generate random float
    randomFloat: (min, max) => {
        return Math.random() * (max - min) + min;
    },
    
    // Check if number is between
    isBetween: (num, min, max) => {
        return num >= min && num <= max;
    },
    
    // Convert degrees to radians
    toRadians: (degrees) => {
        return degrees * (Math.PI / 180);
    },
    
    // Convert radians to degrees
    toDegrees: (radians) => {
        return radians * (180 / Math.PI);
    }
};

// ===== ARRAY UTILITIES =====
const ArrayUtils = {
    // Shuffle array
    shuffle: (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },
    
    // Remove duplicates
    unique: (array) => {
        return [...new Set(array)];
    },
    
    // Group by property
    groupBy: (array, key) => {
        return array.reduce((groups, item) => {
            const group = item[key];
            groups[group] = groups[group] || [];
            groups[group].push(item);
            return groups;
        }, {});
    },
    
    // Sort by property
    sortBy: (array, key, order = 'asc') => {
        return [...array].sort((a, b) => {
            let aVal = a[key];
            let bVal = b[key];
            
            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }
            
            if (order === 'desc') {
                return bVal > aVal ? 1 : -1;
            }
            return aVal > bVal ? 1 : -1;
        });
    },
    
    // Chunk array
    chunk: (array, size) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    },
    
    // Flatten array
    flatten: (array) => {
        return array.reduce((flat, item) => {
            return flat.concat(Array.isArray(item) ? ArrayUtils.flatten(item) : item);
        }, []);
    },
    
    // Get random item
    random: (array) => {
        return array[Math.floor(Math.random() * array.length)];
    },
    
    // Get random items
    randomItems: (array, count) => {
        const shuffled = ArrayUtils.shuffle(array);
        return shuffled.slice(0, count);
    }
};

// ===== OBJECT UTILITIES =====
const ObjectUtils = {
    // Deep clone object
    clone: (obj) => {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => ObjectUtils.clone(item));
        if (typeof obj === 'object') {
            const clonedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = ObjectUtils.clone(obj[key]);
                }
            }
            return clonedObj;
        }
    },
    
    // Merge objects
    merge: (...objects) => {
        return objects.reduce((result, obj) => {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                        result[key] = ObjectUtils.merge(result[key] || {}, obj[key]);
                    } else {
                        result[key] = obj[key];
                    }
                }
            }
            return result;
        }, {});
    },
    
    // Pick properties
    pick: (obj, keys) => {
        const result = {};
        keys.forEach(key => {
            if (obj.hasOwnProperty(key)) {
                result[key] = obj[key];
            }
        });
        return result;
    },
    
    // Omit properties
    omit: (obj, keys) => {
        const result = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && !keys.includes(key)) {
                result[key] = obj[key];
            }
        }
        return result;
    },
    
    // Check if object is empty
    isEmpty: (obj) => {
        return Object.keys(obj).length === 0;
    },
    
    // Get nested property
    get: (obj, path, defaultValue = undefined) => {
        const keys = path.split('.');
        let result = obj;
        
        for (const key of keys) {
            if (result && typeof result === 'object' && key in result) {
                result = result[key];
            } else {
                return defaultValue;
            }
        }
        
        return result;
    },
    
    // Set nested property
    set: (obj, path, value) => {
        const keys = path.split('.');
        let current = obj;
        
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!(key in current) || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }
        
        current[keys[keys.length - 1]] = value;
        return obj;
    }
};

// ===== DATE UTILITIES =====
const DateUtils = {
    // Format date
    format: (date, format = 'YYYY-MM-DD') => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);
    },
    
    // Get relative time
    relative: (date) => {
        const now = new Date();
        const diff = now - new Date(date);
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return 'Just now';
    },
    
    // Check if date is today
    isToday: (date) => {
        const today = new Date();
        const d = new Date(date);
        return d.toDateString() === today.toDateString();
    },
    
    // Check if date is yesterday
    isYesterday: (date) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const d = new Date(date);
        return d.toDateString() === yesterday.toDateString();
    },
    
    // Add days to date
    addDays: (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    },
    
    // Get start of day
    startOfDay: (date) => {
        const result = new Date(date);
        result.setHours(0, 0, 0, 0);
        return result;
    },
    
    // Get end of day
    endOfDay: (date) => {
        const result = new Date(date);
        result.setHours(23, 59, 59, 999);
        return result;
    }
};

// ===== VALIDATION UTILITIES =====
const ValidationUtils = {
    // Validate email
    email: (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    
    // Validate URL
    url: (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },
    
    // Validate phone number
    phone: (phone) => {
        const regex = /^[\+]?[1-9][\d]{0,15}$/;
        return regex.test(phone.replace(/[\s\-\(\)]/g, ''));
    },
    
    // Validate password strength
    password: (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        return {
            isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
            score: [password.length >= minLength, hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length,
            feedback: {
                length: password.length >= minLength ? 'Good length' : `At least ${minLength} characters`,
                uppercase: hasUpperCase ? 'Has uppercase' : 'Needs uppercase letter',
                lowercase: hasLowerCase ? 'Has lowercase' : 'Needs lowercase letter',
                numbers: hasNumbers ? 'Has numbers' : 'Needs numbers',
                special: hasSpecialChar ? 'Has special characters' : 'Needs special characters'
            }
        };
    },
    
    // Validate required field
    required: (value) => {
        return value !== null && value !== undefined && value.toString().trim() !== '';
    },
    
    // Validate min length
    minLength: (value, min) => {
        return value && value.toString().length >= min;
    },
    
    // Validate max length
    maxLength: (value, max) => {
        return value && value.toString().length <= max;
    }
};

// ===== STORAGE UTILITIES =====
const StorageUtils = {
    // Set item
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },
    
    // Get item
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    },
    
    // Remove item
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },
    
    // Clear all
    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    },
    
    // Check if key exists
    has: (key) => {
        return localStorage.getItem(key) !== null;
    },
    
    // Get all keys
    keys: () => {
        return Object.keys(localStorage);
    },
    
    // Get storage size
    size: () => {
        let size = 0;
        for (const key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                size += localStorage[key].length;
            }
        }
        return size;
    }
};

// ===== PERFORMANCE UTILITIES =====
const PerformanceUtils = {
    // Debounce function
    debounce: (func, wait, immediate = false) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(this, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(this, args);
        };
    },
    
    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Measure execution time
    measure: (func, name = 'Function') => {
        const start = performance.now();
        const result = func();
        const end = performance.now();
        console.log(`${name} took ${(end - start).toFixed(2)}ms`);
        return result;
    },
    
    // Request animation frame wrapper
    raf: (callback) => {
        return requestAnimationFrame(callback);
    },
    
    // Cancel animation frame wrapper
    cancelRaf: (id) => {
        cancelAnimationFrame(id);
    }
};

// ===== NETWORK UTILITIES =====
const NetworkUtils = {
    // Check if online
    isOnline: () => {
        return navigator.onLine;
    },
    
    // Fetch with timeout
    fetchWithTimeout: async (url, options = {}, timeout = 5000) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    },
    
    // Retry fetch
    retryFetch: async (url, options = {}, maxRetries = 3) => {
        for (let i = 0; i < maxRetries; i++) {
            try {
                return await fetch(url, options);
            } catch (error) {
                if (i === maxRetries - 1) throw error;
                await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
            }
        }
    }
};

// ===== EXPORT ALL UTILITIES =====
window.Utils = {
    DOM: DOMUtils,
    String: StringUtils,
    Number: NumberUtils,
    Array: ArrayUtils,
    Object: ObjectUtils,
    Date: DateUtils,
    Validation: ValidationUtils,
    Storage: StorageUtils,
    Performance: PerformanceUtils,
    Network: NetworkUtils
};
