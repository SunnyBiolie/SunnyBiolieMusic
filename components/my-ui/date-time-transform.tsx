import { useEffect, useState } from "react";

interface DateTimeTransformProps {
  dateInNumber: number;
}

export const DateTimeTransform = ({ dateInNumber }: DateTimeTransformProps) => {
  const [result, setResult] = useState<string>();

  const time = Date.now() - dateInNumber;
  const timeInSeconds = time / 1000;

  useEffect(() => {
    if (timeInSeconds < 60) {
      setResult(`${Math.floor(timeInSeconds)} seconds ago`);
    } else if (timeInSeconds < 60 * 60) {
      setResult(`${Math.floor(timeInSeconds / 60)} minutes ago`);
    } else if (timeInSeconds < 60 * 60 * 24) {
      setResult(`${Math.floor(timeInSeconds / 60 / 60)} hours ago`);
    } else if (timeInSeconds < 60 * 60 * 24 * 7) {
      setResult(`${Math.floor(timeInSeconds / 60 / 60 / 24)} days ago`);
    } else {
      setResult(`${Math.floor(timeInSeconds / 60 / 60 / 24 / 7)} weeks ago`);
    }
  }, [timeInSeconds]);

  return <div className="text-sm font-semibold">{result}</div>;
};
