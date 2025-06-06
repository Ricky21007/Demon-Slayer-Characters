document.addEventListener('DOMContentLoaded', () => {
  // Character data for search and favorites
  const characters = [
    { name: "Tanjiro Kamado", section: "slayers", pages: ["slayers.html"] },
    { name: "Zenitsu Agatsuma", section: "slayers", pages: ["slayers.html"] },
    { name: "Inosuke Hashibira", section: "slayers", pages: ["slayers.html"] },
    { name: "Giyu Tomioka", section: "slayers", pages: ["slayers.html", "hashira.html"] },
    { name: "Kyojuro Rengoku", section: "slayers", pages: ["slayers.html", "hashira.html"] },
    { name: "Tengen Uzui", section: "slayers", pages: ["slayers.html", "hashira.html"] },
    { name: "Mitsuri Kanroji", section: "slayers", pages: ["slayers.html", "hashira.html"] },
    { name: "Muichiro Tokito", section: "slayers", pages: ["slayers.html", "hashira.html"] },
    { name: "Shinobu Kocho", section: "slayers", pages: ["slayers.html", "hashira.html"] },
    { name: "Obanai Iguro", section: "slayers", pages: ["slayers.html", "hashira.html"] },
    { name: "Sanemi Shinazugawa", section: "slayers", pages: ["slayers.html", "hashira.html"] },
    { name: "Gyomei Himejima", section: "slayers", pages: ["slayers.html", "hashira.html"] },
    { name: "Kanao Tsuyuri", section: "slayers", pages: ["slayers.html"] },
    { name: "Genya Shinazugawa", section: "slayers", pages: ["slayers.html"] },
    { name: "Sakonji Urokodaki", section: "slayers", pages: ["slayers.html"] },
    { name: "Jigoro Kuwajima", section: "slayers", pages: ["slayers.html"] },
    { name: "Kanae Kocho", section: "slayers", pages: ["slayers.html"] },
    { name: "Yoriichi Tsugikuni", section: "slayers", pages: ["slayers.html"] },
    { name: "Muzan Kibutsuji", section: "demons", pages: ["demons.html", "upper-moons.html"] },
    { name: "Nezuko Kamado", section: "demons", pages: ["demons.html"] },
    { name: "Kokushibo", section: "demons", pages: ["demons.html", "upper-moons.html"] },
    { name: "Doma", section: "demons", pages: ["demons.html", "upper-moons.html"] },
    { name: "Akaza", section: "demons", pages: ["demons.html", "upper-moons.html"] },
    { name: "Hantengu", section: "demons", pages: ["demons.html", "upper-moons.html"] },
    { name: "Gyokko", section: "demons", pages: ["demons.html", "upper-moons.html"] },
    { name: "Daki", section: "demons", pages: ["demons.html", "upper-moons.html"] },
    { name: "Gyutaro", section: "demons", pages: ["demons.html", "upper-moons.html"] },
    { name: "Kaigaku", section: "demons", pages: ["demons.html", "upper-moons.html"] },
    { name: "Rui", section: "demons", pages: ["demons.html"] },
    { name: "Enmu", section: "demons", pages: ["demons.html"] },
    { name: "Kyogai", section: "demons", pages: ["demons.html"] },
    { name: "Tamayo", section: "demons", pages: ["demons.html"] },
    { name: "Yushiro", section: "demons", pages: ["demons.html"] },
    { name: "Susamaru", section: "demons", pages: ["demons.html"] },
    { name: "Yahaba", section: "demons", pages: ["demons.html"] }
  ];

  // Initialize favorites from localStorage
  let favorites = [];
  try {
    favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  } catch (e) {
    console.error('Failed to parse favorites from localStorage:', e);
  }

  // Sidebar toggle functionality
  const burgerBtn = document.querySelector('#burger-btn');
  const sidebar = document.querySelector('#sidebar');
  const sidebarClose = document.querySelector('#sidebar-close');
  const mainElement = document.querySelector('main');
  const introContent = document.querySelector('.intro-content');

  // Ensure sidebar is hidden on load
  if (sidebar) {
    sidebar.classList.add('sidebar-hidden');
    sidebar.classList.remove('sidebar-visible');
    sidebar.style.transform = 'translateX(-100%)'; // Force initial hide
  }

  if (burgerBtn && sidebar) {
    console.log('Burger button click listener attached');
    burgerBtn.addEventListener('click', () => {
      sidebar.classList.toggle('sidebar-visible');
      sidebar.classList.toggle('sidebar-hidden');
      if (mainElement) {
        mainElement.classList.toggle('sidebar-open');
      }
      if (introContent) {
        introContent.classList.toggle('sidebar-open');
      }
    });

    if (sidebarClose) {
      sidebarClose.addEventListener('click', () => {
        sidebar.classList.remove('sidebar-visible');
        sidebar.classList.add('sidebar-hidden');
        sidebar.style.transform = 'translateX(-100%)'; // Force close
        if (mainElement) {
          mainElement.classList.remove('sidebar-open');
        }
        if (introContent) {
          introContent.classList.remove('sidebar-open');
        }
      });
    } else {
      console.error('Sidebar close button not found');
    }
  } else {
    console.error('Burger button or sidebar not found');
  }

  // Intro page functionality
  const introPage = document.querySelector('#intro-page');
  if (introPage) {
    const enterButton = document.querySelector('#enter-btn');
    const introSearch = document.querySelector('#intro-search-bar');

    if (enterButton) {
      enterButton.addEventListener('click', () => {
        window.location.href = 'slayers.html';
      });
    }

    if (introSearch) {
      introSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 2) {
          const results = characters.filter(char => char.name.toLowerCase().includes(query));
          if (results.length > 0) {
            const preferredPage = results[0].pages.find(page =>
              page === 'slayers.html' || page === 'demons.html' || page === 'hashira.html' || page === 'upper-moons.html'
            ) || results[0].pages[0];
            window.location.href = `${preferredPage}?search=${encodeURIComponent(query)}`;
          }
        }
      });
    }
  }

  // Main content page functionality
  const mainContent = document.querySelector('#main-content');
  if (mainContent) {
    const searchBar = document.querySelector('#search-bar');
    const navLinks = document.querySelectorAll('.sidebar a');
    const characterCards = document.querySelectorAll('.character-card');
    const favoritesGrid = document.querySelector('#favorites-grid');
    const searchMessage = document.createElement('div');
    searchMessage.className = 'search-message';
    mainContent.prepend(searchMessage);

    // Handle URL search query on page load
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('search');
    if (initialQuery) {
      searchBar.value = initialQuery;
      filterCharacters(initialQuery);
    }

    // Handle search
    searchBar.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      filterCharacters(query);
    });

    function filterCharacters(query) {
      let hasMatches = false;
      characterCards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const matches = name.includes(query);
        card.style.display = matches ? 'block' : 'none';
        if (matches) hasMatches = true;
      });

      if (query.length > 0) {
        const otherMatches = characters.filter(char => 
          char.name.toLowerCase().includes(query) && 
          !Array.from(characterCards).some(card => card.dataset.name.toLowerCase() === char.name.toLowerCase())
        );
        if (!hasMatches && otherMatches.length > 0) {
          const otherPages = [...new Set(otherMatches.flatMap(char => char.pages))].filter(page => page !== window.location.pathname.split('/').pop());
          if (otherPages.length > 0) {
            searchMessage.textContent = `No matches found on this page. Try searching on: ${otherPages.map(page => `<a href="${page}?search=${encodeURIComponent(query)}">${page.replace('.html', '')}</a>`).join(', ')}.`;
            searchMessage.style.display = 'block';
          } else {
            searchMessage.textContent = 'No matches found.';
            searchMessage.style.display = 'block';
          }
        } else if (!hasMatches) {
          searchMessage.textContent = 'No matches found.';
          searchMessage.style.display = 'block';
        } else {
          searchMessage.style.display = 'none';
        }
      } else {
        searchMessage.style.display = 'none';
      }

      if (favoritesGrid) {
        renderFavorites(query);
      }
    }

    // Handle navigation
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        window.location.href = link.getAttribute('href');
      });
    });

    // Handle favorites
    characterCards.forEach(card => {
      const favBtn = card.querySelector('.favorite-btn');
      const name = card.dataset.name;
      if (favorites.includes(name)) {
        favBtn.classList.add('favorited');
      }
      favBtn.addEventListener('click', () => {
        if (favorites.includes(name)) {
          favorites = favorites.filter(f => f !== name);
          favBtn.classList.remove('favorited');
        } else {
          favorites.push(name);
          favBtn.classList.add('favorited');
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        if (favoritesGrid) {
          renderFavorites(searchBar.value.toLowerCase());
        }
      });
    });

    // Render favorites on favorites page
    function renderFavorites(query = '') {
      if (!favoritesGrid) return;
      favoritesGrid.innerHTML = '';
      favorites.forEach(fav => {
        if (query && !fav.toLowerCase().includes(query)) return;
        const char = characters.find(c => c.name === fav);
        if (!char) return;
        let card = document.querySelector(`.character-card[data-name="${char.name}"]`);
        if (card) {
          const clonedCard = card.cloneNode(true);
          favoritesGrid.appendChild(clonedCard);
          const favBtn = clonedCard.querySelector('.favorite-btn');
          if (favorites.includes(fav)) {
            favBtn.classList.add('favorited');
          }
          favBtn.addEventListener('click', () => {
            if (favorites.includes(fav)) {
              favorites = favorites.filter(f => f !== fav);
              favBtn.classList.remove('favorited');
            } else {
              favorites.push(fav);
              favBtn.classList.add('favorited');
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
            renderFavorites(query);
          });
        }
      });
    }

    if (favoritesGrid) {
      renderFavorites();
    }

    // Image modal functionality
    const modal = document.querySelector('#image-modal');
    const modalImg = document.querySelector('#modal-image');
    const modalClose = document.querySelector('#modal-close');
    const images = document.querySelectorAll('.character-img, .character-details img');

    images.forEach(img => {
      img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = img.src;
        modalImg.alt = img.alt;
      });
    });

    modalClose.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
      } else if (e.key === '/' && !e.target.matches('input')) {
        e.preventDefault();
        searchBar.focus();
      }
    });
  }
});