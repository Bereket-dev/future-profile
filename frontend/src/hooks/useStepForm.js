import { useMemo, useState } from "react";

export default function useStepForm(steps) {
  const [stepIndex, setStepIndex] = useState(0);

  const isFirst = stepIndex === 0;
  const isLast = stepIndex === steps.length - 1;
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

  const api = useMemo(
    () => ({
      stepIndex,
      isFirst,
      isLast,
      progress,
      step: steps[stepIndex],
      next: () => setStepIndex((i) => Math.min(i + 1, steps.length - 1)),
      back: () => setStepIndex((i) => Math.max(i - 1, 0)),
      goTo: (i) => setStepIndex(() => Math.max(0, Math.min(i, steps.length - 1)))
    }),
    [stepIndex, isFirst, isLast, progress, steps]
  );

  return api;
}

