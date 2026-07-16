import React from 'react';

const Button = ({label,buttonType,isPrimary,isOnPrimary,onClick,disabled,size = 'md', ...props}) => {

  let cssClass = 'transition ease-in-out w-full '

  if (disabled) {
    cssClass += 'opacity-50 cursor-not-allowed '
  } else {
    cssClass += 'hover:cursor-pointer '
  }

  switch (size) {
    case "sm":
      cssClass += 'rounded-sm p-2 text-sm font-medium '
      break;
    case "md":
      cssClass += 'rounded-md p-3 text-md font-semibold '
      break;
    case "lg":
      cssClass += 'rounded-lg px-6 py-3 text-md font-medium '
      break;
  }

  switch (buttonType) {
    case "action":
        if (isPrimary) {
          cssClass += 'bg-green-500 text-slate-100 hover:bg-green-400'
        } else {
          cssClass += 'bg-red-500 border border-slate-100 text-slate-100 transition hover:bg-red-400 '
        }
      break;
    default:
      if (isOnPrimary) {
        if (isPrimary) {
          cssClass += 'bg-slate-100 text-primary transition hover:bg-slate-100/80'
        } else {
          cssClass += 'border border-slate-100 text-slate-100 transition hover:bg-slate-100/10'
        }
      } else {
        if (isPrimary){
          cssClass += 'bg-primary text-slate-100 hover:bg-primary-hover'
        } else {
          cssClass += "border border-primary text-black hover:bg-primary-hover hover:text-slate-100"
        }
      }
  }

  return (
    <button {...props} onClick={onClick} className={cssClass} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;