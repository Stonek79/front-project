import webpack from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: {config: webpack.Configuration}) => {
    // const paths: BuildPaths = {
    //     build: '',
    //     html: '',
    //     entry: '',
    //     src: path.resolve(__dirname, '..', '..', 'src'),
    // };

    // config.resolve.modules.push(paths.src)
    config!.resolve!.modules = [
        path.resolve(__dirname, '../../src'),
        'node_modules',
    ];
    const isDevPlugin = new webpack.DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify(''),
        __PROJECT__: JSON.stringify('storybook'),
    })

    config!.plugins!.push(isDevPlugin);

    config!.resolve!.extensions!.push('.ts', '.tsx');

    config!.module!.rules = config!.module!.rules!.map((rule: any) => {
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
    });

    config!.module!.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });
    config!.module!.rules!.push(buildCssLoader(true));

    return config;
};
