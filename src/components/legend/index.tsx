import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';
import React, { useState } from 'react';
import type { LegendType } from '../../lib/data';
import Toolbar from '../toolbar';
import BasicLegend from './legendTypes/basic';
import ChoroplethLegend from './legendTypes/choropleth';
import GradientLegend from './legendTypes/gradient';
import TimelineLegend from './legendTypes/timeline';

interface LegendProps {
  legend: LegendType;
}

const legendByTypes: Record<string, React.FC<LegendType>> = {
  basic: BasicLegend,
  choropleth: ChoroplethLegend,
  gradient: GradientLegend,
  timeline: TimelineLegend as React.FC<LegendType>,
};

const Legend: React.FC<LegendProps> = ({ legend }) => {
  const [visible, setVisible] = useState(true);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: legend.id });

  const style = { transform: CSS.Translate.toString(transform), transition };

  const LegendComponent = legendByTypes[legend.type];

  if (!LegendComponent) return null;

  return (
    <div
      className="text-gray-700"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <Toolbar
        title={legend.name}
        actions={{
          onChangeCollapse: setVisible,
          onChangeInfo: () => {},
          onChangeVisibility: () => {},
        }}
        dragListeners={listeners}
      />
      <div
        //   className={classNames('transition-all duration-1000', {
        //     'opacity-0 -bottom-full absolute': !visible,
        //   })}
        className={classNames('text-xs mt-3 ml-5', { hidden: !visible })}
      >
        <LegendComponent {...legend} />
      </div>
    </div>
  );
};

export default Legend;
