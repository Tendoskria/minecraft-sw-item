// Gestion des tabs dans la page admin
document.addEventListener('DOMContentLoaded', () => {
  
  // Tab switching
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.dataset.tab;
      
      // Remove active class from all tabs
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked tab
      button.classList.add('active');
      const targetContent = document.getElementById(`tab-${targetTab}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // Gestion du modal d'enchantement
  const addEnchBtn = document.querySelector('.btn-add-ench');
  const enchModal = document.getElementById('enchantment-modal');
  
  if (addEnchBtn && enchModal) {
    addEnchBtn.addEventListener('click', () => {
      enchModal.style.display = 'flex';
    });

    // Fermer le modal en cliquant à l'extérieur
    enchModal.addEventListener('click', (e) => {
      if (e.target === enchModal) {
        enchModal.style.display = 'none';
      }
    });
  }

  // Gestion des pills d'enchantement
  const enchPills = document.querySelectorAll('.enchantment-pill button');
  enchPills.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.remove();
    });
  });

  // Afficher les messages de succès/erreur
  const urlParams = new URLSearchParams(window.location.search);
  const success = urlParams.get('success');
  const error = urlParams.get('error');

  if (success) {
    showNotification(`${success} créé avec succès!`, 'success');
    // Nettoyer l'URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  if (error) {
    showNotification(`Erreur lors de la création de ${error}`, 'error');
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  // Auto-submit search form on Enter
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.target.closest('form').submit();
      }
    });
  }

  // Filter functionality
  const filterBtn = document.querySelector('.filter-btn');
  if (filterBtn) {
    filterBtn.addEventListener('click', () => {
      // TODO: Implement filter logic
      console.log('Filter clicked');
    });
  }

  // Regrouper par select
  const groupBySelect = document.querySelector('.filter-select');
  if (groupBySelect) {
    groupBySelect.addEventListener('change', (e) => {
      const value = e.target.value;
      if (value === 'year') {
        // Regrouper par année
        regroupByYear();
      } else if (value === 'event') {
        // Recharger la page normale
        window.location.href = '/';
      }
    });
  }
});

// Fonction pour afficher une notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
    color: white;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Fonction pour regrouper les events par année
function regroupByYear() {
  const eventsGrid = document.querySelector('.events-grid');
  if (!eventsGrid) return;

  const eventColumns = Array.from(eventsGrid.querySelectorAll('.event-column'));
  const yearMap = new Map();

  // Collecter toutes les années
  eventColumns.forEach(column => {
    const eventName = column.querySelector('h2').textContent;
    const yearLinks = column.querySelectorAll('.year-link');
    
    yearLinks.forEach(link => {
      const year = link.textContent.trim();
      if (!yearMap.has(year)) {
        yearMap.set(year, []);
      }
      yearMap.get(year).push({
        name: eventName,
        url: link.href
      });
    });
  });

  // Reconstruire la grille par année
  eventsGrid.innerHTML = '';
  
  const sortedYears = Array.from(yearMap.keys()).sort((a, b) => b - a);
  
  sortedYears.forEach(year => {
    const column = document.createElement('div');
    column.className = 'event-column';
    
    const title = document.createElement('h2');
    title.textContent = year;
    column.appendChild(title);
    
    const yearList = document.createElement('div');
    yearList.className = 'year-list';
    
    yearMap.get(year).forEach(event => {
      const link = document.createElement('a');
      link.href = event.url;
      link.className = 'year-link';
      link.textContent = event.name;
      yearList.appendChild(link);
    });
    
    column.appendChild(yearList);
    eventsGrid.appendChild(column);
  });
}

// Animation CSS à ajouter dynamiquement
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);