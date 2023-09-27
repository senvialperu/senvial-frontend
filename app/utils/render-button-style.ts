export function renderButtonStyle(type: string) {
	switch (type) {
		case "primary":
			return "px-8 py-3 text-lg font-semibold rounded bg-primary dark:text-gray-900";
		case "secondary":
			return "px-8 py-3 text-lg font-semibold border rounded border-gray-100";
		default:
			return "px-8 py-3 text-lg font-semibold rounded bg-primary text-gray-900";
	}
}
