
# Project Blueprint: Genshin Impact Character Scroller

## Overview

This project is a single-page web application that showcases characters from the game Genshin Impact. The application now includes a "HOME" page with an introduction and a "CHARACTERS" page with a scroll-based interaction.

## Design and Style

*   **Theme:** Dark, modern, and inspired by the Genshin Impact UI.
*   **Layout:**
    *   A fixed header containing the game logo and top navigation links.
    *   A main content area that switches between the "HOME" and "CHARACTERS" pages.

### HOME Page
*   **Background:** A full-screen background image.
*   **Content:** An "About Us" section with descriptive text and a "Start Browsing" button that navigates to the "CHARACTERS" page.
*   **Layout:** Retains the header and left social sidebar for consistency.

### CHARACTERS Page
*   **Layout:** A main content area divided into three columns:
    1.  **Left Sidebar:** A scrollable list of character cards.
    2.  **Center Content:** A large area to display the details of the selected character.
    3.  **Right Sidebar:** A vertical navigation bar for different game regions.
*   **Visuals:** High-quality images, subtle textures, and interactive hover effects.

## Features

*   **Page Navigation:** Users can switch between the "HOME" and "CHARACTERS" pages using the header navigation.
*   **"About Us" Section:** The HOME page provides introductory information.
*   **Call to Action:** A "Start Browsing" button on the HOME page directs users to the CHARACTERS page.
*   **Dynamic Character Data:** The CHARACTERS page uses a JavaScript array to store and display character information.
*   **Scroll-based Character Switching:** On the CHARACTERS page, scrolling the character list updates the main display.
*   **Active Character Highlight:** The currently viewed character is highlighted in the list.
*   **Responsive Design:** The layout adapts to different screen sizes.

## Current Plan

1.  **Update HTML Structure:**
    *   Add a new `<section>` for the "HOME" page.
    *   Wrap the existing "CHARACTERS" page content in its own `<section>`.
    *   Add content for the "HOME" page, including text and a button.
2.  **Update CSS Styles:**
    *   Add styles for the "HOME" page layout, background, and content.
    *   Create a utility class to show/hide the different page sections.
3.  **Update JavaScript Logic:**
    *   Implement a function to handle showing and hiding the "HOME" and "CHARACTERS" page sections.
    *   Add event listeners to the header navigation links ("HOME", "CHARACTERS") to switch pages.
    *   Add an event listener to the "Start Browsing" button to navigate to the "CHARACTERS" page.
    *   Ensure the "HOME" page is the default view on application load.
    *   Verify that the existing functionality of the "CHARACTERS" page is not affected.
