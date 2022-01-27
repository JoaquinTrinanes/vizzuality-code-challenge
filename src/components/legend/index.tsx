import classNames from 'classnames';
import React, { useState } from 'react';
import type { LegendType } from '../../lib/data';
import Toolbar from '../toolbar';
import BasicLegend from './legendTypes/basic';
import ChoroplethLegend from './legendTypes/choropleth';
import GradientLegend from './legendTypes/gradient';

interface LegendProps {
  legend: LegendType;
}

const legendByTypes: Record<
  LegendType['type'],
  React.FC<Pick<LegendType, 'items'>>
> = {
  basic: BasicLegend,
  choropleth: ChoroplethLegend,
  gradient: GradientLegend,
};

const Legend: React.FC<LegendProps> = ({ legend }) => {
  const [visible, setVisible] = useState(true);

  const LegendComponent = legendByTypes[legend.type];

  if (!LegendComponent) return null;

  return (
    <div className="text-gray-700">
      <Toolbar
        title={legend.name}
        actions={{
          onChangeCollapse: setVisible,
          onChangeInfo: () => {},
          onChangeVisibility: () => {},
        }}
      />
      <div
        //   className={classNames('transition-all duration-1000', {
        //     'opacity-0 -bottom-full absolute': !visible,
        //   })}
        className={classNames('text-xs mt-3 ml-5', { hidden: !visible })}
      >
        <LegendComponent items={legend.items} />
      </div>
    </div>
  );
};

export default Legend;
