import Bowser from "bowser";

const SUPPORTED_BROWSERS = {
	CHROME: "Chrome",
	BRAVE: "Brave",
	FIREFOX: "Firefox",
	SAFARI: "Safari",
} as const;

const windowKeys = {
	moz: SUPPORTED_BROWSERS.FIREFOX,
	chrome: SUPPORTED_BROWSERS.CHROME,
	safari: SUPPORTED_BROWSERS.SAFARI,
	brave: SUPPORTED_BROWSERS.BRAVE,
};
type WindowKeys = keyof typeof windowKeys;
type WindowValues = (typeof windowKeys)[WindowKeys];

const browserTree = {
	brave: "chrome",
	chrome: "chrome",
	firefox: "firefox",
	safari: "safari",
} as const;

const getWindowBrowser = () => {
	const uaBrowserVendors = new Set<WindowKeys>();

	Object.keys(window).forEach((key) => {
		const isVendor = Object.keys(windowKeys).includes(key);
		if (isVendor) {
			uaBrowserVendors.add(key as WindowKeys);
		}
	});

	const uaBrowser = [...uaBrowserVendors].find(
		(vendor) => browserTree[vendor as keyof typeof browserTree]
	);

	const uaBrowserName = uaBrowser
		? windowKeys[uaBrowser as WindowKeys]
		: "unknown";

	const n = window.navigator as {
		brave?: unknown;
	};
	const isBrave = !!n.brave || false;

	if (isBrave && uaBrowserName === SUPPORTED_BROWSERS.CHROME) {
		return {
			vendor: SUPPORTED_BROWSERS.BRAVE,
			isSupported: true,
		} as const;
	}

	return {
		vendor: uaBrowserName,
		isSupported: Object.values(SUPPORTED_BROWSERS).includes(
			uaBrowserName as WindowValues
		),
	} as const;
};

const getUserAgentBrowser = () => {
	const uaBrowser = Bowser.parse(window.navigator.userAgent);

	const isSupported = Object.values(SUPPORTED_BROWSERS).includes(
		uaBrowser.browser.name as WindowValues
	);

	const n = window.navigator as {
		brave?: unknown;
	};
	const isBrave = !!n.brave || false;

	if (isBrave && uaBrowser.browser.name === SUPPORTED_BROWSERS.CHROME) {
		return {
			vendor: SUPPORTED_BROWSERS.BRAVE,
			isSupported: true,
		} as const;
	}

	return {
		vendor: uaBrowser.browser.name,
		isSupported,
	} as const;
};

const getBrowserMatch = () => {
	const windowVendor = getWindowBrowser();
	const uaVendor = getUserAgentBrowser();

	if (windowVendor.vendor !== uaVendor.vendor) {
		return {
			vendor: "unknown",
			window: windowVendor,
			ua: uaVendor,
			isSupported: false,
			mismatch: true,
		} as const;
	}

	return {
		vendor: uaVendor.vendor,
		window: windowVendor,
		ua: uaVendor,
		isSupported: windowVendor.isSupported,
		mismatch: false,
	} as const;
};

export const getBrowser = () => {
	const browser = getBrowserMatch();

	return {
		vendor: browser.vendor,
		isSupported: browser.isSupported,
		isBrave: browser.vendor === SUPPORTED_BROWSERS.BRAVE,
		isChrome: browser.vendor === SUPPORTED_BROWSERS.CHROME,
		isFirefox: browser.vendor === SUPPORTED_BROWSERS.FIREFOX,
		isSafari: browser.vendor === SUPPORTED_BROWSERS.SAFARI,
	};
};
