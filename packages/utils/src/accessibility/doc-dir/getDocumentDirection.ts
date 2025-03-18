/**
 * @name DirEnum
 * @description Enum for the different directions, rtl, ltr and auto
 * @property {string} rtl - Right to left direction
 * @property {string} ltr - Left to right direction
 * @property {string} auto - Automatic direction
 * @example
 * <Tooltip dir={DirEnum.rtl} ... // Right to left direction
 * <Tooltip dir={DirEnum.ltr} ... // Left to right direction
 * <Tooltip dir={DirEnum.auto} ... // Automatic direction
 * @see getDocumentDirection for the usage of this enum
 * @author Pol Gubau Amores - https://polgubau.com
 */
export enum DirEnum {
	rtl = "rtl",
	ltr = "ltr",
	auto = "auto",
}
export type Dir = `${DirEnum}`;

export function getDocumentDirection(): Dir {
	if (typeof window === "undefined" || !window.document) {
		return "ltr";
	}

	const dirAttribute = document.documentElement.getAttribute("dir") as Dir;
	if (dirAttribute === DirEnum.auto || !dirAttribute) {
		return window.getComputedStyle(document.documentElement).direction as Dir;
	}
	return dirAttribute;
}
