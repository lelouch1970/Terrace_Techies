Sopan 1.0 - by Team Terrace Techies

Welcome to the official repository for Sopan 1.0, our project for the Smart India Hackathon 2025. This repository contains the frontend code for our smart irrigation dashboard, designed to be intuitive and accessible for the farmers of Sikkim.

Frontend Code Usability
We have structured our frontend into two main files, App.js and App.css, which work together to create a seamless user experience.

src/App.js: The Brain of Our Application
In this file, we handle all the core logic and state management for the dashboard. It's the "engine" that makes everything work.

State Management: We use React's useState hook to manage the application's live memory, including:

The user's selected language (English, Hindi, or Nepali).

The current operational mode ("Automatic" or "Manual").

The live sensor data (Soil Moisture, Temperature) and the status of the water valve.

Interactive Logic: This file also contains the logic we wrote to make the app interactive and smart:

It powers the slider toggle switch, allowing a user to easily switch between modes.

It handles the manual ON/OFF buttons, giving the farmer direct control when needed.

It contains the automatic ruleset that simulates how the system responds to soil data, providing a clear demonstration of the project's core intelligence.

src/App.css: The Look and Feel
This file is where we define the entire visual identity and user experience of our dashboard. We designed it to be clean, intuitive, and visually informative.

Visual Design: We've created a clean, mobile-first layout so the dashboard is easy to read and use on a standard smartphone. The colors, fonts, and spacing are all designed to be professional and clear.

Intuitive User Experience (UX): We placed a strong emphasis on usability for non-technical users.

A key feature we implemented is the color-coded visual cues. The CSS contains rules that automatically change a card's border to red when the soil status is "Dry." This provides an instant visual warning that is understandable at a single glance, without needing to read the numbers.

We've also included interactive feedback, like the smooth animation of the toggle switch, to make the application feel responsive and modern.

How They Work Together
We've designed App.js and App.css to work in perfect sync. App.js manages the data and logic (the "what"), while App.css handles the visual presentation (the "how").

For example, when the soil moisture state in App.js changes to "Dry," our code assigns a "dry" status. App.css instantly sees this and applies the .status-dry class to make the UI element red. This seamless integration is key to the simple and intuitive user experience we aimed to create.
