import type { TimelineLegendType } from '../../../lib/data';
import Slider from 'rc-slider';
import { DateTime } from 'luxon';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

import 'rc-slider/assets/index.css';

const TimelineLegend: React.FC<TimelineLegendType> = ({ items, timeline }) => {
  const minDate = DateTime.fromISO(timeline.minDate);
  const maxDate = DateTime.fromISO(timeline.maxDate);

  const millisecondsInAYear = 3.154e10;

  return (
    <div>
      <Range
        tipFormatter={(value) => {
          const date = DateTime.fromMillis(value);
          return date.toFormat(timeline.dateFormat.toLowerCase());
        }}
        defaultValue={[minDate.toMillis(), maxDate.toMillis()]}
        step={timeline.step * millisecondsInAYear}
        min={minDate.toMillis()}
        max={maxDate.toMillis()}
      />
      {/* {JSON.stringify(timeline)} */}
      {/* <div className="flex flex-row">
        {items.map(({ color, name }, i) => (
          <div key={i} className="w-full">
            <div className="h-2" style={{ backgroundColor: color }} />
            <div className="text-center">{name}</div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default TimelineLegend;
