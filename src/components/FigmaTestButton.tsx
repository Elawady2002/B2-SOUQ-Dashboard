
import React from 'react';
// We import the SVG as a URL to use in an img tag, or generally just to reference the file the user asked for.
// To make our Parser happy (which looks for Capitalized Components for icons), we will create a wrapper or just use a mock component name.
// But the user wants the *actual* file. 
// "import Activity from ..."
import activityIconPath from '../assets/icons/activity.svg';

export const FigmaTestButton = () => {
    // We mock a component for the Parser's sake called "Activity" so it detects it as an Icon.
    // In a real app, this might be: const Activity = ({className}) => <img src={activityIconPath} className={className} />
    // But our parser only reads the JSX *structure*. It doesn't execute JS. 
    // So writing <Activity /> in the JSX is enough for the Parser. 
    // To make it run in Browser, we define the component locally.

    const Activity = ({ className }: { className?: string }) => (
        <img src={activityIconPath} className={className} alt="Activity" />
    );

    return (
        // Blue Frame (bg-blue-500)
        <div className="flex flex-row items-center justify-center p-4 gap-4 bg-blue-500 rounded-lg">

            {/* Icon (White) 
          - w-6 h-6 -> 24x24
          - text-white -> Our new parser logic will see this and apply White Fill to the generic icon frame.
      */}
            <Activity className="w-6 h-6 text-white" />

            {/* White Text 
          - text-white on the parent div usually propagates in CSS.
          - In our parser, we explicitly added logic to 'propagate' white text color to direct text children
            OR check local class. Let's add text-white here to be sure.
      */}
            <span className="text-white text-lg font-bold">
                User Activity
            </span>
        </div>
    );
};
