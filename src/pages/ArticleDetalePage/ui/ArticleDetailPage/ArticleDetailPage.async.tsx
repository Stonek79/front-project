import { lazy } from 'react';

export const ArticleDetailPageAsync = lazy(() => new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setTimeout(() => resolve(import('./ArticleDetailPage')), 400);
}));
