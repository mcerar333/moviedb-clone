import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

export const loadStart = () => NProgress.start();
export const loadEnd = () => NProgress.done();
