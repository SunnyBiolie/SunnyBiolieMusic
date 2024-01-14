import { memo } from "react";

interface TimerTransformProps {
  duration: string | number;
}

export const TimerTransform = memo(function TimerTransform({
  duration,
}: TimerTransformProps) {
  let durationMinutes: string | number = Math.floor((duration as number) / 60);
  let durationSeconds: string | number = Math.floor(
    (duration as number) - durationMinutes * 60
  );

  if (durationMinutes < 10) durationMinutes = "0" + durationMinutes;
  if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;

  return (
    <div className="w-[50px] flex items-center justify-center text-xs font-medium text-neutral-400">
      {`${durationMinutes}:${durationSeconds}`}
    </div>
  );
});
