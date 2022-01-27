import { useCallback, useMemo, useState } from 'react';
import type { TimelineLegendType } from '../../../lib/data';
import RangeSlider from '../../rangeSlider';
import { DateTime } from 'luxon';

const TimelineLegend: React.FC<TimelineLegendType> = ({ timeline }) => {
  const minDate = useMemo(
    () => DateTime.fromISO(timeline.minDate),
    [timeline.minDate]
  );
  const maxDate = useMemo(
    () => DateTime.fromISO(timeline.maxDate),
    [timeline.maxDate]
  );

  const formatDate = useCallback(
    (date: DateTime) => date.toFormat(timeline.dateFormat.toLowerCase()),
    [timeline.dateFormat]
  );

  const [currentMinDate, setCurrentMinDate] = useState<DateTime>(minDate);
  const [currentMaxDate, setCurrentMaxDate] = useState<DateTime>(maxDate);

  const millisecondsPerYear = 3.154e10;

  return (
    <div className="relative">
      <div className="absolute -bottom-4 -left-2">{formatDate(minDate)}</div>
      <RangeSlider
        formatValue={(value) => formatDate(DateTime.fromMillis(value))}
        step={timeline.step * millisecondsPerYear}
        range={[minDate.toMillis(), maxDate.toMillis()]}
        value={[currentMinDate.toMillis(), currentMaxDate.toMillis()]}
        onChange={([min, max]) => {
          setCurrentMinDate(DateTime.fromMillis(min));
          setCurrentMaxDate(DateTime.fromMillis(max));
        }}
      />
      <div className="absolute -bottom-4 -right-2">{formatDate(maxDate)}</div>
    </div>
  );
};

export default TimelineLegend;
