const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_URL = process.env.API_URL || 'http://localhost:3000/api';

// Configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Helper
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  proxy: false
});

// Middleware pour passer l'API_URL aux vues
app.use((req, res, next) => {
  res.locals.API_URL = API_URL;
  next();
});

// ============================================
// ROUTES
// ============================================

// Page d'accueil
app.get('/', async (req, res) => {
  try {
    const eventsResponse = await api.get('/events/grouped');
    const events = eventsResponse.data;
    
    console.log('Loaded events:', events);
    res.render('index', { 
      events,
      title: 'Item event SW'
    });
  } catch (error) {
    console.error('Error loading events:', error);
    res.render('index', { 
      events: {},
      title: 'Item event SW',
      error: 'Erreur lors du chargement des events'
    });
  }
});

// Page de détails d'un event
app.get('/event/:eventName/:year', async (req, res) => {
  console.log('Loading items for event:', req.params);
  try {
    const { eventName, year } = req.params;
    const itemsResponse = await api.get('/items', {
      params: { eventName: eventName, year }
    });
    
    const items = itemsResponse.data;
    
    // Grouper par catégorie
    const groupedItems = {
      RecompenseEvent: items.filter(item => item.category === 'RecompenseEvent'),
      Caisse: items.filter(item => item.category === 'Caisse'),
      Quetes: items.filter(item => item.category === 'Quetes'),
      Autres: items.filter(item => item.category === 'Autres')
    };
    
    res.render('event', {
      eventName,
      year,
      items: groupedItems,
      title: `${eventName} ${year}`
    });
  } catch (error) {
    console.error('Error loading event items:', error);
    res.status(500).render('error', { 
      message: 'Erreur lors du chargement des items',
      error 
    });
  }
});

// Page de détails d'un item
app.get('/item/:id', async (req, res) => {
  try {
    const itemResponse = await api.get(`/items/${req.params.id}`);
    const item = itemResponse.data;
    
    console.log('Loaded item:', item);
    res.render('item', {
      item,
      title: item.name
    });
  } catch (error) {
    console.error('Error loading item:', error);
    res.status(500).render('error', { 
      message: 'Item non trouvé',
      error 
    });
  }
});

// Recherche
app.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.redirect('/');
    }
    
    const searchResponse = await api.get('/items/search', {
      params: { q: query }
    });
    
    res.render('search', {
      query,
      results: searchResponse.data,
      title: `Recherche: ${query}`
    });
  } catch (error) {
    console.error('Search error:', error);
    res.render('search', {
      query: req.query.q,
      results: [],
      title: 'Recherche',
      error: 'Erreur lors de la recherche'
    });
  }
});

// Page d'administration
app.get('/admin', async (req, res) => {
  try {
    const eventsResponse = await api.get('/events');
    const enchantmentsResponse = await api.get('/enchantments');
    const vanillaItemsResponse = await api.get('/vanilla-items');
    
    res.render('admin', {
      events: eventsResponse.data,
      enchantments: enchantmentsResponse.data,
      vanillaItems: vanillaItemsResponse.data,
      title: 'Administration'
    });
  } catch (error) {
    console.error('Error loading admin page:', error);
    res.render('admin', {
      events: [],
      enchantments: [],
      vanillaItems: [],
      title: 'Administration',
      error: 'Erreur lors du chargement'
    });
  }
});

// API Endpoints pour les formulaires
app.post('/admin/event', async (req, res) => {
  try {
    const { eventName, year } = req.body;
    
    // Créer l'event
    await api.post('/events', {
      eventName: eventName,
      year: year
    });
    
    res.redirect('/admin?success=event');
  } catch (error) {
    console.error('Error creating event:', error);
    res.redirect('/admin?error=event');
  }
});

app.post('/admin/item', async (req, res) => {
  try {
    const { itemName, vanillaItem, eventId, category, enchantments } = req.body;
    console.log('Received item data:', req.body);
    // Parser les enchantements
    const enchantmentsList = enchantments ? enchantments.split('\n')
      .filter(line => line.trim())
      .map(line => {
        const parts = line.trim().split(' ');
        return {
          name: parts[0],
          level: parts[1] ? parseInt(parts[1]) : null
        };
      }) : [];
    
    await api.post('/items', {
      name: itemName,
      id_event: eventId,
      id_item_vanilla: vanillaItem || null,
      category: category || 'Autres',
      enchantments: enchantmentsList
    });
    
    res.redirect('/admin?success=item');
  } catch (error) {
    console.error('Error creating item:', error);
    res.redirect('/admin?error=item');
  }
});

app.post('/admin/enchantment', async (req, res) => {
  try {
    const { enchantmentName } = req.body;
    
    await api.post('/enchantments', {
      name: enchantmentName
    });
    
    res.redirect('/admin?success=enchantment');
  } catch (error) {
    console.error('Error creating enchantment:', error);
    res.redirect('/admin?error=enchantment');
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    message: 'Une erreur est survenue',
    error: err
  });
});

app.listen(PORT, () => {
  console.log(`Frontend server running on http://localhost:${PORT}`);
});