/**
 * Date Formatting Utilities
 * Provides human-readable date formats for the HESS Essay Scoring System
 */

/**
 * Format a date string into a human-readable relative or absolute format
 * @param {string} dateString - ISO date string (e.g., "2024-12-04")
 * @returns {string} Formatted date (e.g., "Today", "Yesterday", "2 days ago", "Dec 1")
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  
  // Reset time to midnight for accurate day comparison
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const diffTime = nowOnly - dateOnly;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // If today
  if (diffDays === 0) {
    return 'Today';
  }
  // If yesterday
  else if (diffDays === 1) {
    return 'Yesterday';
  }
  // If within the last 7 days
  else if (diffDays > 1 && diffDays < 7) {
    return `${diffDays} days ago`;
  }
  // If within the last 30 days
  else if (diffDays >= 7 && diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
  }
  // Otherwise, show formatted date
  else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }
}

/**
 * Format a date string into a full date with time
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date with time (e.g., "Dec 4, 2024 at 2:30 PM")
 */
export function formatDateTime(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  
  const dateStr = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
  
  const timeStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  return `${dateStr} at ${timeStr}`;
}

/**
 * Format a date string into a full date (no time)
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date (e.g., "December 4, 2024")
 */
export function formatFullDate(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Format a date string into a short date (no year if current year)
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date (e.g., "Dec 4")
 */
export function formatShortDate(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
}

/**
 * Get a friendly relative time string
 * @param {string} dateString - ISO date string
 * @returns {string} Relative time (e.g., "just now", "5 minutes ago", "2 hours ago")
 */
export function formatRelativeTime(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffSec < 60) {
    return 'just now';
  } else if (diffMin < 60) {
    return diffMin === 1 ? '1 minute ago' : `${diffMin} minutes ago`;
  } else if (diffHour < 24) {
    return diffHour === 1 ? '1 hour ago' : `${diffHour} hours ago`;
  } else if (diffDay < 7) {
    return diffDay === 1 ? '1 day ago' : `${diffDay} days ago`;
  } else {
    return formatDate(dateString);
  }
}

/**
 * Check if a date is today
 * @param {string} dateString - ISO date string
 * @returns {boolean} True if the date is today
 */
export function isToday(dateString) {
  if (!dateString) return false;
  
  const date = new Date(dateString);
  const now = new Date();
  
  return date.getDate() === now.getDate() &&
         date.getMonth() === now.getMonth() &&
         date.getFullYear() === now.getFullYear();
}

/**
 * Check if a date is within the last N days
 * @param {string} dateString - ISO date string
 * @param {number} days - Number of days
 * @returns {boolean} True if the date is within the last N days
 */
export function isWithinLastDays(dateString, days) {
  if (!dateString) return false;
  
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays >= 0 && diffDays <= days;
}

export default {
  formatDate,
  formatDateTime,
  formatFullDate,
  formatShortDate,
  formatRelativeTime,
  isToday,
  isWithinLastDays
};