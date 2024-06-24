export const loops = 5_000;
export const concurrency = 5;

export function checkEqual(a: any, b: any) {
	if (a !== b) {
		throw new Error(`${a} !== ${b}`);
	}
}

export function promiseWithResolvers() {
	let resolve = undefined as unknown as () => void;
	const promise = new Promise((res) => {
		resolve = res as () => void;
	});
	return { promise, resolve };
}
