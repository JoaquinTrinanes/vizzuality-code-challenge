import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React from 'react';

const Spinner: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div>
      <div
        {...props}
        className={classNames(
          className,
          'w-10 h-10 border-2 border-l-0 animate-spin rounded-full'
        )}
      />
    </div>
  );
};

export default Spinner;
