import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from '../types/config';

export function buildCssLoaders(isDev: boolean) {
  return {
    // test: /\.s[ac]ss$/i,
    // test: /\.(c|sa|sc)ss$/,
    // use: ['style-loader', 'css-loader', 'sass-loader'],
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Загрузчики для CSS файлов
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'], // Загрузчики для SCSS файлов
      },
    ],
    // use: [
    //   isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    //   {
    //     loader: 'css-loader',
    //     options: {
    //       modules: {
    //         auto: (resPath: string) =>
    //           Boolean(resPath.includes('.module.scss')),
    //         localIdentName: isDev
    //           ? '[path][name]__[local]--[hash:base64:8]'
    //           : '[hash:base64:8]'
    //       }
    //     }
    //   },
    //   'sass-loader'
    // ]
  };
}
