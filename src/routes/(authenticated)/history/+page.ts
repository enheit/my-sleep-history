export async function load() {
    return {
        value: await new Promise(resolve => setTimeout(() => resolve(20), 5000))
    };
}