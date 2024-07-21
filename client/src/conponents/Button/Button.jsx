import React from 'react'
import './Button.css'
const Button = ({className, text, textColor, bgColor, width, height, onClick}) => {
    const buttonStyles = {
        color: textColor || 'black', // Default color is black if not provided
        backgroundColor: bgColor || 'gray', // Default background color is gray if not provided
        // Add more style properties as needed
        width: width || 'auto',
        height: height || 'auto'

      };

  return (
    <button className={`${className}`} style={buttonStyles} onClick={onClick}>
        <div>
            {text}
        </div>
    </button>
  )
}

export default Button