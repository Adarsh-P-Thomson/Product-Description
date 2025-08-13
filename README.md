
# Product-Description Chrome Extension

A Chrome extension that explains or summarizes products listed on **Amazon** or **Flipkart** directly while you browse.  
It detects when you're on a product page and provides useful insights without leaving the site.

---

## ✨ Features
- Detects Amazon and Flipkart product pages automatically.
- Extracts product details and provides a short, clear explanation.
- Simple popup UI for quick access.
- Lightweight and fast—works in real time.

---

## 📦 Installation

1. **Clone this repository**
   ``bash
   git clone https://github.com/Adarsh-P-Thomson/Product-Description.git
``

2. **Load into Chrome**

   * Open `chrome://extensions/` in Chrome.
   * Enable **Developer mode** (top right corner).
   * Click **Load unpacked**.
   * Select the cloned `Product-Description` folder.

3. **Start Using**

   * Visit any Amazon or Flipkart product page.
   * Click the extension icon in your Chrome toolbar.
   * View the generated product description.

---

## 🖥️ Usage

1. Navigate to a product page on **Amazon** or **Flipkart**.
2. Click on the **extension icon** in the Chrome toolbar.
3. Read the product explanation displayed in the popup.

---

## 📂 Project Structure

```
Product-Description/
├── manifest.json        # Extension metadata, permissions, and scripts
├── background.js        # Background service worker for API calls or events
├── contentScript.js     # Injected script to read product details from pages
├── popup.html           # Popup UI layout
├── popup.js             # Logic for handling popup interactions
└── images/              # Extension icons and assets
```

---

## ⚙️ Technical Details

### `manifest.json`

* Declares permissions (e.g., `activeTab`, specific domain matches for Amazon/Flipkart).
* Specifies background scripts and content scripts.
* Configures the extension’s popup.

### `contentScript.js`

* Runs in the context of the product page.
* Extracts product information (e.g., title, description).
* Sends extracted data to the background script or popup.

### `background.js`

* Handles API calls or persistent extension logic.
* Responds to messages from the content script.

### `popup.js`

* Displays the fetched or generated description in the popup.
* Handles user interactions within the popup.

---

## 🔮 Future Enhancements

* Support for more e-commerce platforms (e.g., eBay, Myntra).
* Inline product summaries directly on the page without popup.
* Multi-language support for global users.
* Option to compare products instantly.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes.
4. Push to the branch.
5. Create a Pull Request.

---

## 📜 License

This project is licensed under the MIT License.

---

```

If you want, I can **add code snippets and real screenshots** from your repo so the README looks professional and visually appealing. That would make it stand out on GitHub.
```
