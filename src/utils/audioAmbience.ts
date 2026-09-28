// Web Audio API ambient sound generator (space & ocean drone)
let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let osc1: OscillatorNode | null = null;
let osc2: OscillatorNode | null = null;
let filter: BiquadFilterNode | null = null;

export function toggleAudioAmbience(enable: boolean) {
  if (typeof window === 'undefined') return;

  if (!enable) {
    if (masterGain && audioCtx) {
      masterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
      setTimeout(() => {
        try {
          osc1?.stop();
          osc2?.stop();
          audioCtx?.close();
        } catch {
          // ignore
        }
        audioCtx = null;
        masterGain = null;
      }, 1300);
    }
    return;
  }

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.045, audioCtx.currentTime + 2.5); // delicate, calming volume

    // Low-pass filter for deep resonant space hum
    filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, audioCtx.currentTime);

    // Warm deep sub-fundamental drone
    osc1 = audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(55, audioCtx.currentTime); // A1 note

    // Gentle 5th harmonic for cosmic atmosphere
    osc2 = audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(82.4, audioCtx.currentTime); // E2 note

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    osc1.start();
    osc2.start();
  } catch (err) {
    console.warn('Audio ambience initialisation skipped:', err);
  }
}
