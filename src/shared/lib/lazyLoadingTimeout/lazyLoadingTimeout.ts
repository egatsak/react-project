export default function lazyLoadingTimeout<T>(
    dynamicImport: Promise<T>,
    ms: number
): Promise<T> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dynamicImport);
        }, ms);
    });
}
