import type { StorybookConfig } from '@storybook/react-webpack5';
import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';
import 'ts-node/register';

const rootDir = path.resolve(process.cwd(), '.storybook-web');

dotenv.config({
  path: path.resolve(rootDir, '../.env'),
})

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  stories: ['../.rnstorybook/stories/**/*.stories.@(ts|tsx|js|jsx)'],

  addons: [
    '@storybook/addon-essentials',
  ],

  staticDirs: ['public'],
  
  webpackFinal: async (config) => {
    config.resolve!.alias = {
      ...(config.resolve!.alias || {}),
      'react-native$': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
      'react-native-reanimated': path.resolve(rootDir, './mocks/react-native-reanimated/react-native-reanimated.ts'),
      'react-native-gesture-handler': path.resolve(rootDir, './mocks/react-native-gesture-handler/react-native-gesture-handler.ts'),
      'react-native-safe-area-context': path.resolve(rootDir, './mocks/react-native-safe-area-context/react-native-safe-area-context.ts'),
      'react-native/Libraries/Utilities/codegenNativeComponent': path.resolve(rootDir, './mocks/react-native/Libraries/Utilities/codegenNativeComponent.ts'),
      'react-native/Libraries/TurboModule/TurboModuleRegistry': path.resolve(rootDir, './mocks/Libraries/TurboModule/TurboModuleRegistry.ts'),
      'react-native-fast-image': path.resolve(rootDir, './mocks/react-native-fast-image/react-native-fast-image.tsx'),
      '@react-native-community/slider': path.resolve(rootDir, './mocks/@react-native-community/slider.tsx'),
      '@react-native-clipboard/clipboard': path.resolve(rootDir, './mocks/@react-native-clipboard/clipboard.ts'),
    };

    // config.cache = false;

    config.mode = 'development';

    config.resolve!.extensions!.push('.ts', '.tsx', '.js', '.jsx');

    config.module!.rules!.push({
      test: /\.[jt]sx?$/,
      include: [
        path.resolve(rootDir, '../.rnstorybook'),
        path.resolve(rootDir, '../.storybook-web'),
        path.resolve(rootDir, '../src/utils'),
        path.resolve(rootDir, '../src/types'),
        path.resolve(rootDir, '../src/components'),
      ],
      use: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            configFile: false,
            presets: [
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
              ['@babel/preset-typescript'],
            ],
          },
        },
      ],
    });

    config.plugins!.push(
      new webpack.DefinePlugin({
        'process.env.PAGE_TITLE': JSON.stringify(
          process.env.PAGE_TITLE
        ),
      })
    )

    // config.plugins = [
    //   ...(config.plugins || []),

    //   new webpack.NormalModuleReplacementPlugin(
    //     /^react-native-vector-icons\/.*$/,
    //     path.resolve(rootDir, './mocks/react-native-vector-icons.ts')
    //   ),
    // ];

    return config;
  },

  core: {
    builder: {
      name: "@storybook/builder-webpack5",
      options: {}
    },
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },
};

export default config;
