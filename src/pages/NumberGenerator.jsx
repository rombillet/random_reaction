import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function parseNumber(value) {
  if (value === '' || value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function getRandomInt(min, max) {
  const lower = Math.ceil(min);
  const upper = Math.floor(max);
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

export default function NumberGenerator() {
  const [minValue, setMinValue] = useState('1');
  const [maxValue, setMaxValue] = useState('99');
  const [minutes, setMinutes] = useState('0');
  const [seconds, setSeconds] = useState('30');
  const [intervalSeconds, setIntervalSeconds] = useState('3');
  const [currentNumber, setCurrentNumber] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const intervalRef = useRef(null);
  const countdownRef = useRef(null);
  const finishRef = useRef(null);

  const totalSeconds = useMemo(() => {
    const parsedMinutes = parseNumber(minutes) ?? 0;
    const parsedSeconds = parseNumber(seconds) ?? 0;
    return Math.max(0, parsedMinutes * 60 + parsedSeconds);
  }, [minutes, seconds]);

  const parsedMin = parseNumber(minValue);
  const parsedMax = parseNumber(maxValue);
  const parsedInterval = parseNumber(intervalSeconds);

  const isValid =
    totalSeconds > 0 &&
    parsedInterval !== null &&
    parsedInterval > 0 &&
    parsedMin !== null &&
    parsedMax !== null &&
    parsedMin <= parsedMax;

  const clearTimers = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    if (finishRef.current) {
      clearTimeout(finishRef.current);
    }
    intervalRef.current = null;
    countdownRef.current = null;
    finishRef.current = null;
  };

  const startSession = () => {
    if (!isValid) return;
    if (parsedMin === null || parsedMax === null || parsedInterval === null) return;

    clearTimers();
    setIsFinished(false);
    setIsActive(true);
    setRemainingSeconds(totalSeconds);
    setCurrentNumber(getRandomInt(parsedMin, parsedMax));

    intervalRef.current = setInterval(() => {
      setCurrentNumber(getRandomInt(parsedMin, parsedMax));
    }, parsedInterval * 1000);

    countdownRef.current = setInterval(() => {
      setRemainingSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);

    finishRef.current = setTimeout(() => {
      clearTimers();
      setIsActive(false);
      setIsFinished(true);
    }, totalSeconds * 1000);
  };

  const stopSession = () => {
    clearTimers();
    setIsActive(false);
    setIsFinished(false);
    setCurrentNumber(null);
    setRemainingSeconds(0);
  };

  useEffect(() => () => clearTimers(), []);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-10">
      {!isActive && (
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Number tool</p>
            <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Number Generator
            </h1>
          </div>
          <Link
            to="/"
            className="rounded-full border border-ink/10 bg-white/80 px-3 py-1.5 text-xs font-semibold text-ink/60 shadow-sm transition hover:border-ink/30 hover:text-ink"
          >
            Back
          </Link>
        </header>
      )}

      {!isActive && !isFinished && (
        <section className="rounded-[32px] border border-ink/10 bg-white/90 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:p-8">
          <div className="grid gap-6">
            <div>
              <h2 className="text-lg font-semibold text-ink">Setup</h2>
              <p className="text-sm text-ink/55">
                Define the range, timing, and interval for the session.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-ink">Minimum value</span>
                <input
                  type="number"
                  value={minValue}
                  onChange={(event) => setMinValue(event.target.value)}
                  className="w-full rounded-2xl border border-ink/10 bg-mist px-4 py-3 text-base text-ink shadow-sm focus:border-ink/30 focus:outline-none"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-ink">Maximum value</span>
                <input
                  type="number"
                  value={maxValue}
                  onChange={(event) => setMaxValue(event.target.value)}
                  className="w-full rounded-2xl border border-ink/10 bg-mist px-4 py-3 text-base text-ink shadow-sm focus:border-ink/30 focus:outline-none"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-medium text-ink">Total duration</p>
                <div className="grid grid-cols-2 gap-3">
                  <label className="space-y-1">
                    <span className="text-xs uppercase tracking-[0.2em] text-ink/50">Minutes</span>
                    <input
                      type="number"
                      min="0"
                      value={minutes}
                      onChange={(event) => {
                        const next = event.target.value;
                        if (next === '') {
                          setMinutes('');
                        } else {
                          setMinutes(String(Math.max(0, Number(next))));
                        }
                      }}
                      className="w-full rounded-2xl border border-ink/10 bg-mist px-4 py-3 text-base text-ink shadow-sm focus:border-ink/30 focus:outline-none"
                    />
                  </label>
                  <label className="space-y-1">
                    <span className="text-xs uppercase tracking-[0.2em] text-ink/50">Seconds</span>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={seconds}
                      onChange={(event) => {
                        const next = event.target.value;
                        if (next === '') {
                          setSeconds('');
                        } else {
                          const numeric = Math.max(0, Number(next));
                          setSeconds(String(Math.min(59, numeric)));
                        }
                      }}
                      className="w-full rounded-2xl border border-ink/10 bg-mist px-4 py-3 text-base text-ink shadow-sm focus:border-ink/30 focus:outline-none"
                    />
                  </label>
                </div>
              </div>

              <label className="space-y-2">
                <span className="text-sm font-medium text-ink">Interval (seconds)</span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={intervalSeconds}
                  onChange={(event) => {
                    const next = event.target.value;
                    if (next === '') {
                      setIntervalSeconds('');
                    } else {
                      setIntervalSeconds(String(Math.max(1, Number(next))));
                    }
                  }}
                  className="w-full rounded-2xl border border-ink/10 bg-mist px-4 py-3 text-base text-ink shadow-sm focus:border-ink/30 focus:outline-none"
                />
                <p className="text-xs text-ink/50">
                  A new number will appear at each interval.
                </p>
              </label>
            </div>

            <button
              type="button"
              onClick={startSession}
              disabled={!isValid}
              className="w-full rounded-2xl bg-ink px-5 py-4 text-base font-semibold text-mist shadow-[0_12px_30px_rgba(11,11,15,0.25)] transition hover:-translate-y-0.5 hover:bg-ink/90 disabled:cursor-not-allowed disabled:bg-ink/40"
            >
              Start
            </button>
          </div>
        </section>
      )}

      {isActive && (
        <section className="fixed inset-0 z-10 flex min-h-screen flex-col items-center justify-center bg-mist px-3">
          <button
            type="button"
            onClick={stopSession}
            className="absolute right-4 top-4 rounded-full border border-ink/10 bg-white/90 px-3 py-1 text-xs font-semibold text-ink/60 shadow-sm transition hover:border-ink/30 hover:text-ink"
          >
            Stop / Exit
          </button>
          <div className="absolute left-4 top-4 space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-ink/45">Now playing</p>
            <p className="rounded-full border border-ink/10 bg-white/90 px-3 py-1 text-xs font-semibold text-ink/60 shadow-sm">
              Time left: {Math.floor(remainingSeconds / 60)}m {remainingSeconds % 60}s
            </p>
          </div>
          <div
            key={currentNumber}
            className="font-display text-[min(90vw,90vh)] leading-none text-ink animate-number-pop"
          >
            {currentNumber}
          </div>
        </section>
      )}

      {isFinished && (
        <section className="rounded-[32px] border border-ink/10 bg-white/90 p-6 text-center shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Session complete</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">Finished</h2>
          <p className="mt-2 text-sm text-ink/60">Ready for another round?</p>
          <button
            type="button"
            onClick={() => {
              setIsFinished(false);
              setCurrentNumber(null);
            }}
            className="mt-6 w-full rounded-2xl bg-ink px-5 py-4 text-base font-semibold text-mist shadow-[0_12px_30px_rgba(11,11,15,0.25)] transition hover:-translate-y-0.5 hover:bg-ink/90"
          >
            Restart
          </button>
        </section>
      )}
    </main>
  );
}
