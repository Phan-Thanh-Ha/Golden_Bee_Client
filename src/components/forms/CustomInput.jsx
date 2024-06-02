import React from 'react';
import { Input } from '@ui-kitten/components';

const CustomInput = ({ style, bgColor = '#FFFFFF', textColor = '#000000', ...props }) => {
    return (
        <Input
            style={{ backgroundColor: bgColor, color: textColor, ...style }}
            placeholderTextColor="#A0A0A0"
            {...props}
        />
    );
};

export default CustomInput;
