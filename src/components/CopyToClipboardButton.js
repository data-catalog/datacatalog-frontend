import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';

export default function CopyToClipboardButton({ textToCopy, children, ...props }) {
  const target = useRef();

  const handleClick = () => {
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
    }
  };

  return (
    <>
      <Button {...props} ref={target} onClick={handleClick} data-tip data-for="copy-tip">
        {children}
      </Button>
      <ReactTooltip
        id="copy-tip"
        place="bottom"
        effect="solid"
        event="focusin"
        eventOff="mouseleave"
        delayShow={200}
        delayHide={200}
      >
        Copied to clipboard!
      </ReactTooltip>
    </>
  );
}

CopyToClipboardButton.defaultProps = {
  size: 'xs',
  variant: 'outline-dark',
  className: 'ml-2 rounded-pill',
};
