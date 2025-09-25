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
  
    showRandomQuote(); // Optionally show the new quote immediately
  }
  
  // Event listener
  newQuoteBtn.addEventListener('click', showRandomQuote);
  