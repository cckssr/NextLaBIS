# Comprehensive To-Do List

## 1. Project Setup and Infrastructure

- [ ] Project Initialization:
  - [ ] Create a new Next.js project (e.g., with npx create-next-app).
  - [ ] Set up a version control system (Git) and create a repository.
- [ ] Install dependencies:
  - [ ] UI Library, Install Mantine:

    ```shell
    npm install @mantine/core @mantine/hooks @mantine/notifications
    ```

  - [ ] Helper Libraries:
    - [ ] Optionally: react-window or react-sortable-tree for virtual tree structures.
  - [ ] Testing Frameworks:
    - [ ] Unit and Integration Tests: Jest, React Testing Library
      - [ ] npm install --save-dev jest @testing-library/react @testing-library/jest-dom
    - [ ] End-to-End Tests: Cypress (or an alternative)
  - [ ] Linter & Formatter: - [ ] ESLint, Prettier

- [ ] Set up folder structure:
  - [ ] Standard folders (e.g., app/ or pages/) for Next.js pages.
  - [ ] Components folder (e.g., components/).
  - [ ] API routes (e.g., app/api/ or pages/api/).
  - [ ] Helper functions (e.g., lib/).
  - [ ] Custom Components: A special folder, e.g., custom-components/, where administrators can place their own object templates.
  - [ ] Tests folder (e.g., **tests**/ or within the respective modules).

## 2. Architecture and Routing

- [ ] Choice of Router:
  - [ ] Decide on the App Router (Next.js 13+) or the classic Pages Router.
  - [ ] Set up dynamic routes for the objects (e.g., /objects/[id]/page.js).
- [ ] Page Generation:
  - [ ] Static Site Generation (SSG) for the static templates of the objects, as they do not change often.
  - [ ] Dynamic loading of current data (client-side via API routes).
- [ ] Revalidation & Updates:
  - [ ] Implement revalidate or an API route (webhook or cron job) to selectively regenerate individual object pages when the modification date (from the openBIS database) changes.

## 3. UI/UX – User Interface

- [ ] Navigation:
  - [ ] Hierarchical Tree Structure:
    - [ ] Create a sidebar or dropdown menu with a filter function for spaces, projects, collections, and objects.
    - [ ] Use, for example, recursive components or external libraries (e.g., react-window for virtual lists) for performance with many entries.
  - [ ] Breadcrumbs:
    - [ ] Show the current position in the object tree to facilitate orientation.
  - [ ] Multi-Tab Navigation:
    - [ ] Enable parallel work on multiple projects/objects (if useful).
- [ ] Object Display:
  - [ ] Standard Template:
    - [ ] Create a standard component (e.g., components/ObjectTemplates/StandardObject.js) that displays all typical data (name, description, custom properties).
  - [ ] Dynamic Loading:
    - [ ] Create a client component (e.g., components/ObjectData.js) that loads the current data via a Next.js API route.
  - [ ] Dynamic Loading of Custom Components:
    - [ ] Implement logic that checks during server render if a custom template for the object type exists in the custom-components/ folder.
    - [ ] If available, dynamically import and use it; otherwise, fallback to the standard template.
  - [ ] Responsive Design:
    - [ ] Define different viewports (desktop, tablet, mobile).
    - [ ] Use Mantine layout components and CSS media queries to adapt the UI to different screen sizes.

## 4. Integration with openBIS and Data Management

- [ ] API Integration:
  - [ ] Develop functions in lib/openbis-api.js to communicate with the openBIS API:
    - [ ] getObjectById(objectId): Loads current object data.
    - [ ] getObjectMetadata(objectId): Loads static metadata that rarely changes.
    - [ ] fetchOpenBisObjectList(): Loads the list of all objects for static generation.
  - [ ] Data Model & Modification Date:
    - [ ] Ensure that each object has a modification date (e.g., lastModified).
    - [ ] Use this date to decide if a rebuild or revalidation is necessary.
  - [ ] API Routes in Next.js:
    - [ ] Create routes that act as a proxy between your Next.js application and the openBIS API.
    - [ ] Implement, for example, /api/openbis-data for data queries and /api/revalidate for targeted revalidation.

## 5. Administrator Functions

- [ ] Custom Templates:
  - [ ] Create a concept where administrators can place their own components (templates) in a special folder (custom-components/).
  - [ ] Implement server-side logic that checks if a custom component is available for a specific object type.
  - [ ] Optional: Develop an admin interface to upload or edit custom components.
- [ ] Revalidation Management:
  - [ ] Develop a system (via API and possibly cron jobs or webhooks) that monitors the modification date and only regenerates the affected pages.

## 6. Testing and Quality Assurance

- [ ] Unit Tests:
  - [ ] Write tests for all individual components (e.g., navigation, object display, dynamic data loading).
  - [ ] Use Jest and React Testing Library.
- [ ] Integration Tests:
  - [ ] Test the interaction between UI components and API routes (e.g., whether data is correctly loaded and displayed from the API).
- [ ] End-to-End (E2E) Tests:
  - [ ] Set up E2E tests with Cypress (or a similar solution) to test the complete user journey (navigation, data query, object display).
- [ ] Viewport Tests / Responsive Tests:
  - [ ] Test the display of the page on different screen sizes (desktop, tablet, mobile).
  - [ ] Automated screenshot tests or visual regression tests (e.g., with Storybook or Percy) can help here.
- [ ] Testing Dynamic Components:
  - [ ] Ensure that the logic for dynamically importing custom components works correctly and that the standard template is used if no custom template is available.
- [ ] CI/CD:
  - [ ] Set up a CI/CD pipeline (e.g., with GitHub Actions, GitLab CI) that runs tests and generates builds on every commit.

## 7. Deployment and Monitoring

- [ ] Deployment:
  - [ ] Choose a host (e.g., Vercel, Netlify, or own server).
  - [ ] Configure automatic deployments via your CI/CD system.
- [ ] Monitoring & Logging:
  - [ ] Implement monitoring to track errors, performance, and user behavior.
  - [ ] Set up error logging (e.g., Sentry).
- [ ] Documentation & Administrator Guides:
  - [ ] Create comprehensive documentation explaining the structure of the application, API integration, revalidation process, and management of custom components.
  - [ ] Create guides for administrators on how to create, upload, and manage custom templates.

## 8. Other Optimizations

- [ ] Performance Optimizations:
  - [ ] Use lazy loading for components that are not immediately needed.
  - [ ] Implement virtualization for long lists (e.g., in the tree structure).
- [ ] Security:
  - [ ] Protect API routes and sensitive data.
  - [ ] Implement authentication and authorization mechanisms (e.g., for administrators).
- [ ] SEO and Accessibility:
  - [ ] Ensure semantic HTML, correct meta tags, and accessibility.
  - [ ] Test the application with accessibility tools.
