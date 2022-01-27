import ReactTooltip from 'rc-tooltip';

import 'rc-tooltip/assets/bootstrap_white.css';

interface TooltipProps {
  content: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  return (
    <>
      <ReactTooltip overlay={content} trigger="hover" placement="top">
        <div>{children}</div>
      </ReactTooltip>
    </>
  );
};

export default Tooltip;
