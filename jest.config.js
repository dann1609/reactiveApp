module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-community|@reduxjs|immer|react-redux|@react-native-async-storage)/)',
  ],
};
