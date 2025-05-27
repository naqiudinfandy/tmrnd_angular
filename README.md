# TM Research and Development Web Assessment

## Project Description

This project is a web assessment developed for TM Research and Development, built using **Angular v19.2.5**. It comprises **five distinct modules** and features a user-friendly interface across **three core webpages**:

* **Login Page:** Secure entry point for user authentication.
* **Homepage:** Central hub for navigating the application and accessing key features.
* **Detail Page:** Provides in-depth information and functionalities related to specific items or data.

The application is designed for a seamless user experience, demonstrating modern web development best practices with Angular.

---

## Angular Version and Key Features (v19.2.5)

This project leverages **Angular v19.2.5**, which brings several enhancements and features designed to improve developer experience and application performance. Key highlights relevant to this project include:

* **Enhanced Resource Management:** Angular 19.2.5 includes improvements to the `resource()` and introduces the experimental `httpResource()` APIs. These aim to simplify reactive data fetching and state management, potentially reducing boilerplate code for asynchronous operations.
* **Improved Type Safety:** Full compatibility with **TypeScript 5.8** ensures better type-checking and robust code.
* **Streamlined Template Syntax:** Support for untagged template literals allows for cleaner and more expressive syntax directly within Angular templates.
* **Performance Optimizations:** Continuous improvements in the Angular core and build system contribute to faster development cycles and optimized application bundles.

These features contribute to a more efficient and maintainable codebase, reflecting the modern capabilities of the Angular framework.

---

## Deployment Guide

This guide outlines the steps to deploy and run the TM Research and Development Web Assessment application.

### 1. Source Code Management (GitLab)

The entire source code for this project is hosted on GitLab, providing version control, collaboration, and continuous integration/delivery capabilities.

* **Repository Access:** Ensure you have access to the project's GitLab repository. If not, contact the project administrator.
* **Cloning the Repository:**
    If you haven't already, clone the repository to your local machine using Git:
    ```bash
    git clone <your_gitlab_repository_url>
    ```
    (Replace `<your_gitlab_repository_url>` with the actual URL from your GitLab project's "Clone" button.)

### 2. Running the Application Locally

Once the source code is on your local machine, you can run the Angular application using the Angular CLI.

* **Navigate to the Project Directory:**
    Open your terminal (VS Code integrated terminal, Command Prompt, or PowerShell) and navigate to the root directory of the cloned project:
    ```bash
    cd your-project-folder-name
    ```
    (Replace `your-project-folder-name` with the actual name of your project's root directory.)

* **Install Dependencies (if not already done):**
    If this is your first time setting up the project, install the necessary Node.js packages:
    ```bash
    npm install
    ```

* **Start the Development Server:**
    Use the Angular CLI to start the development server. This will compile the application and serve it, typically at `http://localhost:4200/`.
    ```bash
    ng serve
    ```
    The application will now be accessible in your web browser. Any changes saved in your source files will automatically recompile and refresh the browser.

---

## Demo URL

[Link to Your Deployed Demo (e.g., GitLab Pages, Netlify, Vercel, etc.)](https://example.com/your-demo-url)
*(Replace `https://example.com/your-demo-url` with the actual URL where your demo is deployed. If you don't have one yet, you can leave this as a placeholder or remove the section.)*