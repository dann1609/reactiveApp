import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation/Navigation.tsx';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store.ts';
import { reloadCart } from './redux/cart/slice.ts';
import storageService from './services/storage.ts';

const AppContent = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const dispatch = useDispatch();

  const load = async () => {
    try {
      const cart = await storageService.getItem<any>('cart');
      if (cart) {
        dispatch(reloadCart(cart));
      }
    } catch (error) {
      console.error('Failed to load cart', error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Navigation />
    </SafeAreaProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
