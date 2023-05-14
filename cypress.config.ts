import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        setupNodeEvents(on, config) {},
        baseUrl: 'http://localhost:3000',
    },

    component: {
        devServer: {
            framework: 'react',
            bundler: 'webpack',
        },
    },
});
