import { browser } from '$app/environment';
import { writable } from 'svelte/store';

function createThemeStore() {

  const { subscribe, set, update } = writable('dark');
  
  // Initialiser le thème
  function init() {
    if (browser) {
      // Récupérer le thème depuis localStorage ou  'dark' par défaut
      const savedTheme = localStorage.getItem('theme') || 'dark';
      set(savedTheme);
      applyTheme(savedTheme);
    }
  }
  
  // Appliquer le thème au DOM
  function applyTheme(theme) {
    if (browser) {
      document.documentElement.classList.toggle('light', theme === 'light');
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }
  
  return {
    subscribe,
    
    // Transition entre thèmes clair et sombre
    toggle: () => {
      update(currentTheme => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        if (browser) {
          localStorage.setItem('theme', newTheme);
          applyTheme(newTheme);
        }
        return newTheme;
      });
    },

    set: (theme) => {
      if (theme === 'dark' || theme === 'light') {
        set(theme);
        if (browser) {
          localStorage.setItem('theme', theme);
          applyTheme(theme);
        }
      }
    },
    
    // Initialiser le thème
    init
  };
}

export const theme = createThemeStore();