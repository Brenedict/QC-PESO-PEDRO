import { useSyncExternalStore, type ReactNode } from "react";
import { LoadingOverlay } from "../components/LoadingOverlay";

/* eslint-disable react-refresh/only-export-components */
const SHOW_DELAY_MS = 200; // don't show delay if the load is quick
const MIN_DISPLAY_MS = 400; // show loading for at least this long

type Listener = () => void;

let inFlight = 0;
let visible = false;
let shownAt: number | null = null;
let showDelayTimer: ReturnType<typeof setTimeout> | null = null;
let minDisplayTimer: ReturnType<typeof setTimeout> | null = null;
const listeners = new Set<Listener>();

const emit = () => listeners.forEach((l) => l());

const clearShowDelay = () => {
    if (showDelayTimer) {
        clearTimeout(showDelayTimer);
        showDelayTimer = null;
    }
};

const clearMinDisplay = () => {
    if (minDisplayTimer) {
        clearTimeout(minDisplayTimer);
        minDisplayTimer = null;
    }
};

export const beginLoading = () => {
    inFlight += 1;
    if (inFlight === 1) {
        clearMinDisplay();
        clearShowDelay();

        // Show the loading overlay after the show delay
        showDelayTimer = setTimeout(() => {
            showDelayTimer = null;
            if (inFlight > 0) {
                shownAt = Date.now();
                visible = true;
                emit();
            }
        }, SHOW_DELAY_MS);
    }
};

export const endLoading = () => {
    inFlight = Math.max(0, inFlight - 1);
    if (inFlight > 0) return;

    // Check if loading finished fast than show delay
    if (!visible) {
        clearShowDelay();
        return;
    }

    const elapsed = shownAt ? Date.now() - shownAt : MIN_DISPLAY_MS;
    const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
    clearMinDisplay();
    minDisplayTimer = setTimeout(() => {
        minDisplayTimer = null;
        if (inFlight === 0) {
            visible = false;
            shownAt = null;
            emit();
        }
    }, remaining);
};

const subscribeLoading = (listener: Listener): (() => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

export const getLoadingSnapshot = (): boolean => visible;

export function LoadingProvider({ children }: { children: ReactNode }) {
    const visible = useSyncExternalStore(subscribeLoading, getLoadingSnapshot);
    return (
        <>
            {children}
            {visible ? <LoadingOverlay /> : null}
        </>
    );
}
