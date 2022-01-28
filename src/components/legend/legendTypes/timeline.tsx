import { useCallback, useEffect, useMemo, useState } from 'react';
import type { TimelineLegendType } from '../../../lib/data';
import RangeSlider from '../../rangeSlider';
import { DateTime } from 'luxon';

const TimelineLegend: React.FC<TimelineLegendType> = ({
  timeline,
  onChangeDate,
}) => {
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

  const [currentMinDate, setCurrentMinDate] = useState<number>(() =>
    minDate.toMillis()
  );
  const [currentMaxDate, setCurrentMaxDate] = useState<number>(
    maxDate.toMillis()
  );

  useEffect(() => {
    onChangeDate?.([
      DateTime.fromMillis(currentMinDate).toJSDate(),
      DateTime.fromMillis(currentMaxDate).toJSDate(),
    ]);
  }, [currentMinDate, currentMaxDate]);

  const millisecondsPerYear = 3.154e10;

  return (
    <div className="relative">
      <div className="absolute -bottom-4 -left-2">{formatDate(minDate)}</div>
      <RangeSlider
        formatValue={(value) => formatDate(DateTime.fromMillis(value))}
        step={timeline.step * millisecondsPerYear}
        range={[minDate.toMillis(), maxDate.toMillis()]}
        value={[currentMinDate, currentMaxDate]}
        onChange={([min, max]) => {
          setCurrentMinDate(min);
          setCurrentMaxDate(max);
        }}
      />
      <div className="absolute -bottom-4 -right-2">{formatDate(maxDate)}</div>
    </div>
  );
};

export default TimelineLegend;
