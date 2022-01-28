import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import ReactModal from 'react-modal';
import type { LegendType } from '../../lib/data';
import { SortableListenersContext } from '../sortable';
import Toolbar from '../toolbar';
import BasicLegend from './legendTypes/basic';
import ChoroplethLegend from './legendTypes/choropleth';
import GradientLegend from './legendTypes/gradient';
import TimelineLegend from './legendTypes/timeline';
import DOMPurify from 'dompurify';

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

  const LegendComponent = legendByTypes[legend.type];

  if (!LegendComponent) return null;

  const dragContext = useContext(SortableListenersContext);
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="text-gray-700 relative">
      <div
        className={classNames(
          'absolute w-full h-full top-0 left-0 opacity-50 bg-gray-50',
          {
            hidden: !dragContext?.isDragging,
          }
        )}
      />
      <Toolbar
        title={legend.name}
        actions={{
          onChangeCollapse: setVisible,
          onChangeInfo: () => {
            setShowDescription(true);
          },
          onChangeVisibility: () => {
            // we don't have a real map :)
          },
        }}
      />
      <ReactModal
        isOpen={showDescription}
        onRequestClose={() => {
          setShowDescription(false);
        }}
      >
        <div
          className="cursor-pointer text-righ w-min ml-auto text-xl sticky top-0 right-0"
          onClick={() => {
            setShowDescription(false);
          }}
        >
          &times;
        </div>
        <div
          className="prose mx-auto"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(legend.description, {
              USE_PROFILES: { html: true },
            }),
          }}
        />
      </ReactModal>
      <div
        className={classNames('text-xs mt-3 ml-5  transition-all', {
          '-translate-y-5 opacity-0 absolute w-full duration-2000 pointer-events-none':
            !visible,
        })}
      >
        <LegendComponent {...legend} />
      </div>
    </div>
  );
};

export default Legend;
