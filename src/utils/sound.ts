// Custom Synthesized Web Audio API sound generator for retro mechanical ticks and beeps.

let isSoundOn = true;
let audioCtx: AudioContext | null = null;

// Safe initializer for AudioContext
function initAudioContext() {
  if (audioCtx) return audioCtx;
  try {
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioCtxClass();
  } catch (e) {
    console.error("Failed to initialize Web Audio API", e);
  }
  return audioCtx;
}

// Global user-gesture listeners to satisfy rigid browser autoplay policies
if (typeof window !== 'undefined') {
  const resumeOnGesture = () => {
    const ctx = initAudioContext();
    if (ctx) {
      if (ctx.state === 'suspended') {
        ctx.resume()
          .then(() => {
            if (ctx.state === 'running') {
              removeGestureListeners();
            }
          })
          .catch(err => console.warn("Failed to resume Web Audio context via gesture:", err));
      } else if (ctx.state === 'running') {
        removeGestureListeners();
      }
    }
  };

  const gestureEvents = ['mousedown', 'mouseup', 'keydown', 'touchstart', 'click'];

  const removeGestureListeners = () => {
    gestureEvents.forEach(evt => {
      window.removeEventListener(evt, resumeOnGesture, { capture: true });
    });
  };

  gestureEvents.forEach(evt => {
    window.addEventListener(evt, resumeOnGesture, { capture: true, passive: true });
  });
}

export function getSoundEnabled(): boolean {
  return isSoundOn;
}

export function setSoundEnabled(enabled: boolean): void {
  isSoundOn = enabled;
  // Try to resume audio context if enabled
  if (enabled) {
    const ctx = initAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
  }
}

export function toggleSound(): boolean {
  const nextVal = !isSoundOn;
  setSoundEnabled(nextVal);
  return nextVal;
}

// 1. Retro click/keypress mechanism sound generator
export function playClickSound() {
  if (!isSoundOn) return;
  
  try {
    const ctx = initAudioContext();
    if (!ctx) return;

    // Direct synchronous check and call to resume if suspended
    if (ctx.state === 'suspended') {
      ctx.resume().catch(err => console.warn("Failed to resume audio context manually on click:", err));
    }

    const now = ctx.currentTime;

    // LAYER A: Low-mid keycap bottom-out thud (resonance)
    const thudOsc = ctx.createOscillator();
    const thudGain = ctx.createGain();
    thudOsc.type = 'triangle';
    thudOsc.frequency.setValueAtTime(160, now);
    thudOsc.frequency.exponentialRampToValueAtTime(65, now + 0.05);

    thudGain.gain.setValueAtTime(0.18, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    thudOsc.connect(thudGain);
    thudGain.connect(ctx.destination);

    // LAYER B: Mid-resonant metallic switch housing contact clack
    const clackOsc = ctx.createOscillator();
    const clackGain = ctx.createGain();
    clackOsc.type = 'sine';
    clackOsc.frequency.setValueAtTime(750, now);
    clackOsc.frequency.exponentialRampToValueAtTime(320, now + 0.03);

    clackGain.gain.setValueAtTime(0.14, now);
    clackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    clackOsc.connect(clackGain);
    clackGain.connect(ctx.destination);

    // LAYER C: Crisp high-frequency gold-plated leaf contact tick
    const tickOsc = ctx.createOscillator();
    const tickGain = ctx.createGain();
    tickOsc.type = 'sine';
    tickOsc.frequency.setValueAtTime(1700, now);
    tickOsc.frequency.exponentialRampToValueAtTime(550, now + 0.012);

    tickGain.gain.setValueAtTime(0.09, now);
    tickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);

    tickOsc.connect(tickGain);
    tickGain.connect(ctx.destination);

    // Start and scheduled-stop all synthesis layers
    thudOsc.start(now);
    thudOsc.stop(now + 0.05);

    clackOsc.start(now);
    clackOsc.stop(now + 0.03);

    tickOsc.start(now);
    tickOsc.stop(now + 0.012);
  } catch (error) {
    console.warn("Audio Context playback error bypassed safely:", error);
  }
}

// 2. Short vintage electronic click/tick on mouse hover
export function playHoverSound() {
  if (!isSoundOn) return;

  try {
    const ctx = initAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(err => console.warn("Failed to resume audio context manually on hover:", err));
    }

    const now = ctx.currentTime;

    // Super-subtle vintage CRT monitor static hum burst / tick
    const hoverOsc = ctx.createOscillator();
    const hoverGain = ctx.createGain();
    
    hoverOsc.type = 'sine';
    hoverOsc.frequency.setValueAtTime(1050, now);
    hoverOsc.frequency.exponentialRampToValueAtTime(450, now + 0.015);
    
    // Configured subtle but audible volume (0.045 instead of 0.012)
    hoverGain.gain.setValueAtTime(0.045, now);
    hoverGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

    hoverOsc.connect(hoverGain);
    hoverGain.connect(ctx.destination);

    hoverOsc.start(now);
    hoverOsc.stop(now + 0.015);
  } catch (error) {
    console.warn("Audio Context hover playback error bypassed safely:", error);
  }
}
