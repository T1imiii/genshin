
# Project Blueprint: Hoyoverse Universe Explorer

## Overview

This project is a single-page web application that showcases characters from various Hoyoverse games (Genshin Impact, Honkai Star Rail, Zenless Zone Zero). The application features a "HOME" introduction page, a "CHARACTERS" browser, and now, a "NEWS" feed integrated with a VKontakte group.

## Design and Style

*   **Theme:** Dark, modern, and aesthetically inspired by the Hoyoverse game UIs.
*   **Layout:**
    *   A fixed header containing the logo and top navigation.
    *   A main content area that dynamically switches between the "HOME", "CHARACTERS", and "NEWS" pages.

### HOME Page
*   **Background:** A full-screen, atmospheric background image.
*   **Content:** An introduction to the purpose of the site with a "Start Browsing" button to navigate to the character browser.

### CHARACTERS Page
*   **Layout:** A three-column design:
    1.  **Left Sidebar:** A scrollable list of character cards for the selected game and region.
    2.  **Center Content:** A large, detailed view of the selected character, including their name, description, and a button to watch a demo video.
    3.  **Right Sidebar:** A vertical navigation bar for different game regions.
*   **Dynamic Theming:** The UI accent colors dynamically change based on the dominant color of the active character's artwork.

### NEWS Page
*   **Layout:** A single, scrollable column layout that displays a feed of news posts.
*   **Content:** Posts are fetched in real-time from a specified VKontakte group, displaying text and any attached images.
*   **Style:** Each post is styled as a "card" to fit the application's modern aesthetic.

## Features

*   **Multi-Page Navigation:** Users can switch between the "HOME", "CHARACTERS", and "NEWS" sections.
*   **Multi-Game Support:** The character browser is organized by game (Genshin Impact, Honkai Star Rail, Zenless Zone Zero) and further by in-game regions.
*   **Dynamic Character Loading:** Character data is fetched from local JSON files.
*   **Interactive Character Switching:** Users can switch between characters by scrolling or clicking.
*   **Video Modal:** A modal window to watch character demo videos.
*   **VKontakte Integration:** The "NEWS" page displays a live feed of posts from a VKontakte group.
*   **Responsive Design:** The layout is designed to adapt to different screen sizes.

## Current Plan: Add VK News Feed

1.  **Update `blueprint.md`:** Reflect the addition of the NEWS page and VKontakte integration. (Complete)
2.  **Modify `index.html`:**
    *   Add a `<section id="news-page" class="page">` to hold the news feed content.
    *   Ensure the "NEWS" link in the top navigation is correctly configured to switch to this new page.
3.  **Enhance `main.js`:**
    *   Add `news-page` to the page switching logic.
    *   Create a new function `initializeNewsPage()` that will be called when the user navigates to the "NEWS" page.
    *   This function will perform a `fetch` request to the VKontakte API's `wall.get` method using the provided service key and group ID.
    *   **Security Note:** For this implementation, the service key will be included directly in the client-side request. For a production environment, this is highly insecure. The recommended approach would be to set up a proxy server (e.g., using a Firebase Function) to securely handle the API key.
    *   Develop a function `renderPosts(posts)` that takes the API response and generates the HTML for the news feed, including text and images.
4.  **Update `style.css`:**
    *   Add styling for the `#news-page` container.
    *   Create styles for the individual news post cards (`.post-card`), including layout for the post text, date, and images, ensuring it matches the overall dark, modern theme of the site.
