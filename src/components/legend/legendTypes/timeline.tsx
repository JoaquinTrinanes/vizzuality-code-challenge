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
    <div>
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
      <div className="flex flex-row justify-between">
        <div className="-translate-x-5">{formatDate(maxDate)}</div>
        <div className="translate-x-5">{formatDate(minDate)}</div>
      </div>
    </div>
  );
};

export default TimelineLegend;
