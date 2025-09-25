// Initial quote array
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", category: "Inspiration" }
];

  // DOM references
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteBtn = document.getElementById('newQuote');
  const quoteTextInput = document.getElementById('newQuoteText');
  const quoteCategoryInput = document.getElementById('newQuoteCategory');
  
  // Show a random quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.textContent = "No quotes available.";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
  
    quoteDisplay.innerHTML = `
      <p>"${quote.text}"</p>
      <p><strong>Category:</strong> ${quote.category}</p>
    `;
  }
  
  // Add a new quote
  function addQuote() {
    const text = quoteTextInput.value.trim();
    const category = quoteCategoryInput.value.trim();
  
    if (!text || !category) {
      alert("Please fill out both fields.");
      return;
    }
  
    const newQuote = { text, category };
    quotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(quotes)); // ✅ Save to Local Storage
    quoteTextInput.value = '';
    quoteCategoryInput.value = '';
    updateCategoryOptions();
    filterQuotes();
    showRandomQuote(); // Optionally show the new quote immediately
  }
  document.getElementById('exportQuotes').addEventListener('click', () => {
    const data = localStorage.getItem('quotes');
    if (!data) {
      alert("No quotes to export.");
      return;
    }
  
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
  
    URL.revokeObjectURL(url);
  });

  document.getElementById('importQuotes').addEventListener('click', () => {
    const fileInput = document.getElementById('quoteFile');
    const file = fileInput.files[0];
  
    if (!file) {
      alert("Please select a file first.");
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = function(event) {
      try {
        const importedQuotes = JSON.parse(event.target.result);
        if (Array.isArray(importedQuotes)) {
          quotes = quotes.concat(importedQuotes);
          localStorage.setItem('quotes', JSON.stringify(quotes));
          alert("Quotes imported successfully!");
          showRandomQuote(); // Optional: show one immediately
        } else {
          alert("Invalid file format. Expected an array of quotes.");
        }
      } catch (err) {
        alert("Error reading file: " + err.message);
      }
    };
  
    reader.readAsText(file);
  });
  
  let quote = JSON.parse(localStorage.getItem('quotes')) || [];
  const categoryFilter = document.getElementById('categoryFilter');

  // Save selected filter
  categoryFilter.addEventListener('change', () => {
    localStorage.setItem('selectedCategory', categoryFilter.value);
  });
  
  // Load saved filter on page load
  document.addEventListener('DOMContentLoaded', () => {
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
      categoryFilter.value = savedCategory;
      filterQuotes();
    }
  });
  function updateCategoryOptions() {
    const categories = [...new Set(quotes.map(q => q.category))];
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });
  }
  function filterQuotes() {
    const selected = categoryFilter.value;
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';
  
    const filtered = selected === 'all'
      ? quotes
      : quotes.filter(q => q.category === selected);
  
    if (filtered.length === 0) {
      quoteDisplay.textContent = 'No quotes found for this category.';
      return;
    }
  
    filtered.forEach(q => {
      const quoteEl = document.createElement('p');
      quoteEl.innerHTML = `"${q.text}" — <strong>${q.author}</strong>`;
      quoteDisplay.appendChild(quoteEl);
    });
  }
  function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(q => q.category))];
  
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    })
  
    // Restore last selected filter if available
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
      categoryFilter.value = savedCategory;
      filterQuotes(); // Apply filter immediately
    }
  }
  function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('selectedCategory', selectedCategory); // Save selection
  
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';
  
    const filteredQuotes = selectedCategory === 'all'
      ? quotes
      : quotes.filter(q => q.category === selectedCategory);
  
    if (filteredQuotes.length === 0) {
      quoteDisplay.textContent = 'No quotes found for this category.';
      return;
    }
  
    filteredQuotes.forEach(q => {
      const quoteEl = document.createElement('p');
      quoteEl.innerHTML = `"${q.text}" — <strong>${q.author}</strong>`;
      quoteDisplay.appendChild(quoteEl);
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    quotes = JSON.parse(localStorage.getItem('quotes')) || [];
    populateCategories();
  });
  quotes.push(newQuote);
  localStorage.setItem('quotes', JSON.stringify(quotes));
  populateCategories();
  filterQuotes();
    
  function addQuote() {
    const text = quoteTextInput.value.trim();
    const category = quoteCategoryInput.value.trim();
  
    if (!text || !category) {
      alert("Please fill out both fields.");
      return;
    }
  
    const newQuote = { text, category };
    quotes.push(newQuote);
  
    // Save updated quotes to local storage
    localStorage.setItem('quotes', JSON.stringify(quotes));
  
    // Update categories and dropdown
    populateCategories();
  
    // Reapply current filter
    const currentFilter = localStorage.getItem('selectedCategory') || 'all';
    categoryFilter.value = currentFilter;
    filterQuotes();
  
    // Clear inputs
    quoteTextInput.value = '';
    quoteCategoryInput.value = '';
  }
  function fetchQuotesFromServer() {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then(response => response.json())
      .then(data => {
        const serverQuotes = data.map(post => ({
          text: post.title,
          author: `User ${post.userId}`,
          category: 'Server'
        }));
  
        // Merge without duplicates
        const merged = [...quotes];
        serverQuotes.forEach(sq => {
          if (!merged.some(q => q.text === sq.text)) {
            merged.push(sq);
          }
        });
  
        quotes = merged;
        localStorage.setItem('quotes', JSON.stringify(quotes));
        populateCategories();
        filterQuotes();
      })
      .catch(err => console.error('Server fetch failed:', err));
  }
  setInterval(fetchQuotesFromServer, 30000); // every 30 seconds
    
  // Event listener
  newQuoteBtn.addEventListener('click', showRandomQuote);
  