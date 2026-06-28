import React from 'react';
import * as LucideIcons from 'lucide-react';
import { HelpCircle, LucideProps } from 'lucide-react';

export interface AppIconProps extends Omit<LucideProps, 'name'> {
    name: string;
}

const Icon: React.FC<AppIconProps> = ({
    name,
    size = 24,
    color = "currentColor",
    className = "",
    strokeWidth = 2,
    ...props
}) => {
    // Access the icon dynamically
    const IconComponent = (LucideIcons as any)[name] as React.ComponentType<LucideProps> | undefined;

    if (!IconComponent) {
        return (
            <HelpCircle 
                size={size} 
                color="gray" 
                strokeWidth={strokeWidth} 
                className={className} 
                {...props} 
            />
        );
    }

    return (
        <IconComponent
            size={size}
            color={color}
            strokeWidth={strokeWidth}
            className={className}
            {...props}
        />
    );
};

export default Icon;