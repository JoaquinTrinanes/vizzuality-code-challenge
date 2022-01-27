import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

import 'rc-slider/assets/index.css';

const foregroundColor = '#cab2d6';
const backgroundColor = '#c8c8c8';

interface RangeSliderProps {
  range: [number, number];
  step: number;
  value: [number, number];
  formatValue: (value: number) => React.ReactNode;
  onChange: (value: [number, number]) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  formatValue,
  step,
  onChange,
  range: [min, max],
  value: [minCurrentValue, maxCurrentValue],
}) => {
  return (
    <Range
      tipFormatter={formatValue}
      step={step}
      min={min}
      max={max}
      value={[minCurrentValue, maxCurrentValue]}
      onChange={([min, max]) => onChange([min, max])}
      railStyle={{ backgroundColor: backgroundColor }}
      handleStyle={[
        { backgroundColor: foregroundColor, borderColor: foregroundColor },
      ]}
      trackStyle={[{ backgroundColor: foregroundColor }]}
    />
  );
};

export default RangeSlider;
