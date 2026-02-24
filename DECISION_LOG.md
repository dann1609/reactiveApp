# Decision Log & Development Timeline

This document provides a chronological record of the project's development, based on the actual commit history. It highlights key decisions and the iteration process between AI suggestions and developer implementation.

## 1. Initial Architecture & UI (Core Foundation)
*   **navigation and home implemented (bca6a9b)**
    *   *Decision*: Established the base `NavigationContainer` and `HomeScreen`. Placed navigation outside the main screen stack to allow for a persistent shared UI.
*   **Api call added to app (8e59a02)**
    *   *Decision*: Integrated `fetch` logic directly to start prototyping data flow.
*   **products rendered on home (687caa3)**
    *   *Decision*: Defined initial `IProduct` interfaces to ensure type safety early on.
*   **Product Card frame added (011a60a)**
    *   *Decision*: Created a reusable `ProductCard` component to separate list logic from layout logic.

## 2. Design System & Theme
*   **Theme implemented (687ddaf)**
    *   *Decision*: Created a central theme provider. 
    *   *Conflict*: Initial theme missed some navigation-specific tokens, corrected by unifying `ITheme`.
*   **Themed text implemented (a2c79cc)**
    *   *Decision*: Wrapped standard React Native `<Text>` into a custom component to enforce consistent typography and dynamic colors.
*   **Card UI updated (17ca6ae)**
    *   *Decision*: Polished the `ProductCard` with gradients and rounded corners for a premium feel.
*   **Loading and error state handle implemented (b0a5cd7)**
    *   *Decision*: Centralized UI feedback for asynchronous operations.

## 3. Product Discovery & Interaction
*   **Slider implemented (33260b6)**
    *   *Decision*: Used a sliding panel for product details instead of a separate screen to maintain context.
*   **Product details frame added (b29828e) / Improved (ddf9241)**
    *   *Decision*: Implemented a pull-down-to-close gesture on the fragment for better UX on mobile.
*   **Variant enabled (d5988b2)**
    *   *Decision*: Added complex logic to handle product variant selection (sizes/colors) with dynamic price updates.

## 4. State Management & Shopping Cart
*   **Redux installed (974cf7e)**
    *   *Decision*: Moved from local state to Redux Toolkit to manage the cart globally.
*   **Add item to cart implemented (8b21603)**
    *   *Decision*: Logic centralized in a `useCart` hook for easy consumption across components.
*   **React native svg added (f0c90f5)**
    *   *Decision*: Used `react-native-svg` for icons.
    *   *Conflict*: AI suggested standard paths; Developer refined the `ShoppingCartIcon` with a custom **-2 unit X-shift** for visual centering inside circular containers.
*   **Bottom tab bar implemented (e4ddb19)**
    *   *Decision*: Strategic placement of the FAB button in the tab bar.
*   **Badge added (34888b1)**
    *   *Decision*: Integrated a dynamic badge above the cart icon that calculates total items from Redux.

## 5. Persistence & Reliability
*   **Cart screen frame / Implemented (ef037dd / 4a6491f)**
    *   *Decision*: Created a dedicated `CartItem` component for the list. Refined the layout to include a sticky summary footer.
*   **Storage Added (40a440c) / Store persisted (da00aaf)**
    *   *Decision*: Implemented `persistenceMiddleware` and `storageService` to ensure user data survives app reloads.
*   **Environment added (4443185)**
    *   *Decision*: Structured environment variables to allow different API endpoints and keys.
*   **Cache implemented (d5dd44f)**
    *   *Decision*: Wrapped API calls in a `cachedApiFacade` for "offline-first" product browsing.

## 6. Optimization & Polish
*   **type-safe navigation (38187af)**
    *   *Decision*: Implemented `StackParamList` to avoid generic string routes and improve developer experience.
*   **Internal Memoization Refinement**
    *   *Decision*: (During optimization phase) Refactored `useCart` to return **functions** that return memoized closures instead of just raw values.
*   **On refresh control implemented / readme updated (06ceecb)**
    *   *Decision*: Added "Pull-to-Refresh" with `forceScroll`. Refined `RefreshControl` to set `refreshing={false}` and use the custom layout loader to avoid UI flickering.
*   **Project Documentation (c522c49 - 06ceecb)**
    *   *Decision*: Created comprehensive `README.md` and `DECISION_LOG.md` to document the journey and architecture.

## 7. Unit Testing & Environment Setup
*   **Action**: Implemented comprehensive unit tests for product helpers and Redux cart logic.
*   **The Mocking Strategy**:
    *   *Problem*: Tests failed with `Native module is null` because `AsyncStorage` was accessed during the component rendering in `App.test.tsx`.
    *   *Decision*: Created a dedicated `jest.setup.js` with a manual mock for `AsyncStorage`.
    *   *Rationale*: A manual mock is more reliable than searching for internal dependency paths and ensures a predictable storage interface for testing persistence logic.