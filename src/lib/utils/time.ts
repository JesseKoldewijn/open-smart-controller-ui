/**
 * This `Time` class in provides methods to convert time between milliseconds,
 * seconds, minutes, hours, days, months, and years.
 */
export class Time {
	/**
	 * The function `getSecondsInMs` converts a given number of seconds into milliseconds.
	 * @param {number} seconds - number
	 */
	static getSecondsInMs = (seconds: number) => seconds * 1000;

	/**
	 * The function `getMinutesInMs` converts minutes to milliseconds by multiplying the input by 60.
	 * @param {number} minutes - The `minutes` parameter is a number representing the duration in minutes.
	 */
	static getMinutesInMs = (minutes: number) =>
		this.getSecondsInMs(minutes * 60);

	/**
	 * The function `getHoursInMs` converts a given number of hours into milliseconds.
	 * @param {number} hours - The `hours` parameter is a number representing the number of hours for which
	 * you want to calculate the equivalent time in milliseconds.
	 */
	static getHoursInMs = (hours: number) => this.getMinutesInMs(hours * 60);

	/**
	 * The function `getDaysInMs` calculates the number of milliseconds in a specified number of days.
	 * @param {number} days - number of days for which you want to calculate the total milliseconds.
	 */
	static getDaysInMs = (days: number) => this.getHoursInMs(days * 24);

	/**
	 * The function `getMonthsInMs` calculates the number of milliseconds in a specified number of months.
	 * @param {number} months - The `months` parameter is a number representing the number of months for
	 * which you want to calculate the equivalent duration in milliseconds.
	 */
	static getMonthsInMs = (months: number) => this.getDaysInMs(months * 30);

	/**
	 * The function `getYearsInMs` calculates the number of milliseconds in a given number of years.
	 * @param {number} years - The `years` parameter is a number representing the number of years for which
	 * you want to calculate the equivalent duration in milliseconds.
	 */
	static getYearsInMs = (years: number) => this.getDaysInMs(years * 365);

	/**
	 * The function `getMsInSeconds` converts milliseconds to seconds.
	 * @param {number} ms - The milliseconds to convert to seconds
	 */
	static getMsInSeconds = (ms: number) => ms / 1000;

	/**
	 * The function `getMsInMinutes` converts milliseconds to minutes.
	 * @param {number} ms - The milliseconds to convert to minutes
	 */
	static getMsInMinutes = (ms: number) => this.getMsInSeconds(ms) / 60;

	/**
	 * The function `getMsInHours` converts milliseconds to hours.
	 * @param {number} ms - The milliseconds to convert to hours
	 */
	static getMsInHours = (ms: number) => this.getMsInMinutes(ms) / 60;

	/**
	 * The function `getMsInDays` converts milliseconds to days.
	 * @param {number} ms - The milliseconds to convert to days
	 */
	static getMsInDays = (ms: number) => this.getMsInHours(ms) / 24;

	/**
	 * The function `getMsInMonths` converts milliseconds to months (assuming 30 days per month).
	 * @param {number} ms - The milliseconds to convert to months
	 */
	static getMsInMonths = (ms: number) => this.getMsInDays(ms) / 30;

	/**
	 * The function `getMsInYears` converts milliseconds to years (assuming 365 days per year).
	 * @param {number} ms - The milliseconds to convert to years
	 */
	static getMsInYears = (ms: number) => this.getMsInDays(ms) / 365;
}
