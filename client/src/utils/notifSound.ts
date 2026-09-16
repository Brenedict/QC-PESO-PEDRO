

let audioContext: AudioContext | null = null;

export function unlockAudio() {
    if (!audioContext) {
        audioContext = new AudioContext();
    }
    if (audioContext.state === "suspended") {
        void audioContext.resume();
    }
    return audioContext;
}

// Plays the chime sound (copy-pasted code, idk what it does but hey it works)
export function playNotificationSound() {
    if (!audioContext || audioContext.state !== "running") return;

    try {
        const now = audioContext.currentTime;

        const playTone = (freq: number, start: number, duration: number) => {
            const oscillator = audioContext!.createOscillator();
            const gain = audioContext!.createGain();

            oscillator.type = "sine";
            oscillator.frequency.value = freq;

            // Short fade in/out so the tone doesn't click
            gain.gain.setValueAtTime(0.0001, start);
            gain.gain.exponentialRampToValueAtTime(0.2, start + 0.015);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

            oscillator.connect(gain);
            gain.connect(audioContext!.destination);

            oscillator.start(start);
            oscillator.stop(start + duration + 0.05);
        };

        // "Ding-dong" — two notes, ~180ms apart
        playTone(880, now, 0.2);
        playTone(1174.66, now + 0.18, 0.25);
    } catch {
        // Best-effort sound; never crash the UI
    }
}