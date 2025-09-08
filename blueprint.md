
# Project Blueprint: Genshin Impact Character Scroller

## Overview

This project is a single-page web application that showcases characters from the game Genshin Impact. The main feature is a scroll-based interaction where users can scroll through a list of characters, and the main display area updates to show the currently selected character.

## Design and Style

*   **Theme:** Dark, modern, and inspired by the Genshin Impact UI. The primary color palette will be shades of purple, black, and white.
*   **Layout:**
    *   A fixed header containing the game logo and top navigation links.
    *   A main content area divided into three columns:
        1.  **Left Sidebar:** A scrollable list of character cards. The currently active card will be highlighted.
        2.  **Center Content:** A large area to display the details of the selected character, including a full-body image, name, title, and description.
        3.  **Right Sidebar:** A vertical navigation bar for different game regions.
*   **Typography:** A modern, sans-serif font will be used. Font sizes will be varied to create a clear visual hierarchy (large for character names, smaller for descriptions).
*   **Visuals:**
    *   High-quality images of the characters will be used.
    *   Subtle background textures and gradients will be used to add depth.
    *   Interactive elements like buttons and links will have hover effects.

## Features

*   **Character Data:** The application will use a JavaScript array of objects to store character data (name, title, description, images).
*   **Scroll-based Character Switching:** As the user scrolls the left sidebar, the central content area will dynamically update to display the corresponding character. This is implemented using the `IntersectionObserver` API for efficiency and accuracy.
*   **Active Character Highlight:** The character currently in view in the left sidebar will be visually highlighted.
*   **Responsive Design:** The layout will adapt to different screen sizes, ensuring a good experience on both desktop and mobile devices.

## Current Plan

1.  **Setup HTML Structure:**
    *   Create the main `index.html` file with the necessary containers for the header, sidebars, and main content.
    *   Link the CSS and JavaScript files.
2.  **Style with CSS:**
    *   Implement the dark theme with the purple color palette.
    *   Use Flexbox and CSS Grid for the layout.
    *   Style the character cards, main display area, and navigation elements.
    *   Add responsive media queries.
3.  **Implement JavaScript Logic:**
    *   Define the character data in a JavaScript array.
    *   Write a function to dynamically populate the character list and the main display.
    *   Use `IntersectionObserver` to track the active character in the scrollable list.
    *   Update the main display when a new character card becomes visible.
