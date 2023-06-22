import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type webpack from 'webpack';
import { type BuildOptions } from './types/config';
import plugin from './../../node_modules/babel-plugin-i18next-extract/index.d';
import { buildCssLoaders } from './loaders/buildCssLoaders';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };

  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };

  const cssLoader = buildCssLoaders(isDev);

  const babelLoader = buildBabelLoader(isDev);
  // {
  //   test: /\.(js|jsx|tsx)$/,
  //   exclude: /node_modules/,
  //   use: {
  //     loader: 'babel-loader',
  //     options: {
  //       presets: ['@babel/preset-env'],
  //       plugins: [
  //         [
  //           'i18next-extract',
  //           { locales: ['ru', 'en'], keyAsDefaultValue: true },
  //         ],
  //         isDev && require.resolve('react-refresh/babel'),
  //       ].filter(Boolean),
  //     },
  //   },
  // };

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  return [fileLoader, svgLoader, babelLoader, typescriptLoader, cssLoader];
}
