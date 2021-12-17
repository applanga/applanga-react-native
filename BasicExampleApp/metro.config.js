/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
	resolver: {
    /* resolver options */
   sourceExts: ['jsx','js', 'ts', 'tsx'] // add tsx if its not yet defined
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
