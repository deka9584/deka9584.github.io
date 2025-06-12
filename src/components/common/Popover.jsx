import { useEffect, useRef, useState } from 'react';
import { usePopper } from 'react-popper';

function Popover ({ children, triggerContent, triggerClassName = "", placement = "top", preventOverflow = true }) {
    const buttonRef = useRef();
    const popoverRef = useRef();
    const [arrowElement, setArrowElement] = useState();
    const [show, setShow] = useState(false);

    const { styles, attributes, update } = usePopper(buttonRef.current, popoverRef.current, {
        placement,
        modifiers: [
            {
                name: 'arrow',
                options: { element: arrowElement },
            },
            {
                name: 'preventOverflow',
                enabled: preventOverflow,
            },
            {
                name: 'flip',
                options: {
                    fallbackPlacements: ['bottom', 'top'],
                },
            },
        ],
    });

    useEffect(() => {
        if (show && update) {
            update();
        }
    }, [show, update]);

  return (
    <div>
        {show && (
            <div ref={popoverRef} style={styles.popper} {...attributes.popper} className='z-10'>
                <div className='px-lg py-base shadow bg-dark border border-white rounded-sm'>
                    {children}
                </div>
                <div ref={setArrowElement} className='pointer-events-none' style={styles.arrow}></div>
            </div>
        )}
        <button ref={buttonRef} type="button" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className={triggerClassName}>
            {triggerContent}
        </button>
    </div>
  );
};

export default Popover;