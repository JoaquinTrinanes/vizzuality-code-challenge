import type { HTMLAttributes } from 'react';
import React, { useEffect, useState } from 'react';
import Tooltip from '../tooltip';
import classNames from 'classnames';

// icons
import showIcon from './icons/show.svg';
import hideIcon from './icons/hide.svg';

import infoIcon from './icons/info.svg';

import arrowDown from './icons/arrow-down.svg';

export interface ToolbarButtonsProps {
  onChangeInfo: (visible: boolean) => void;
  onChangeVisibility: (visible: boolean) => void;
  onChangeCollapse: (visible: boolean) => void;
}

interface ToolbarElementProps extends HTMLAttributes<HTMLDivElement> {
  iconHref: string;
  tooltipContent: string;
  onAction: () => void;
}

const ToolbarElement: React.FC<ToolbarElementProps> = ({
  iconHref,
  tooltipContent,
  onAction,
  className,
  ...props
}) => {
  return (
    <Tooltip content={tooltipContent}>
      <div
        className={classNames('w-3', className)}
        onClick={onAction}
        {...props}
      >
        <img src={iconHref} />
      </div>
    </Tooltip>
  );
};

const ToggleInfo: React.FC<Pick<ToolbarButtonsProps, 'onChangeInfo'>> = ({
  onChangeInfo,
}) => {
  return (
    <ToolbarElement
      onAction={() => {
        onChangeInfo(true);
      }}
      tooltipContent="Layer info"
      iconHref={infoIcon}
    />
  );
};

const ToggleCollapse: React.FC<
  Pick<ToolbarButtonsProps, 'onChangeCollapse'>
> = ({ onChangeCollapse }) => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    onChangeCollapse(!collapsed);
  }, [collapsed]);

  return (
    <ToolbarElement
      className={classNames(
        { 'rotate-180': collapsed },
        'transition-transform'
      )}
      onAction={() => {
        setCollapsed((collapsed) => !collapsed);
      }}
      tooltipContent={collapsed ? 'Expand' : 'Collapse'}
      iconHref={arrowDown}
    />
  );
};

const ToggleShow: React.FC<Pick<ToolbarButtonsProps, 'onChangeVisibility'>> = ({
  onChangeVisibility,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    onChangeVisibility(visible);
  }, [visible]);

  return (
    <ToolbarElement
      iconHref={visible ? showIcon : hideIcon}
      tooltipContent={`${visible ? 'Hide' : 'Show'} layer`}
      onAction={() => {
        setVisible((visible) => !visible);
      }}
    />
  );
};

const ToolbarButons: React.FC<ToolbarButtonsProps> = ({
  onChangeCollapse,
  onChangeInfo,
  onChangeVisibility,
}) => {
  return (
    <div className="flex flex-row gap-x-2">
      <ToggleShow onChangeVisibility={onChangeVisibility} />
      <ToggleInfo onChangeInfo={onChangeInfo} />
      <ToggleCollapse onChangeCollapse={onChangeCollapse} />
    </div>
  );
};

export default ToolbarButons;
