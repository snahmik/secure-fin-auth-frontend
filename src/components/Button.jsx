import React from 'react';

const Button = ({label,buttonType,isOnPrimary,onClick,size = 'md', ...props}) => {

  let cssClass = 'hover:cursor-pointer transition ease-in-out w-full '

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

  if (isOnPrimary) {
    if (buttonType === 'primary') {
      cssClass += 'bg-slate-100 text-primary transition hover:bg-slate-100/80'
    } else {
      cssClass += 'border border-slate-100 text-slate-100 transition hover:bg-slate-100/10'
    }
  } else {
    if (buttonType === 'primary'){
      cssClass += 'bg-primary text-slate-100 hover:bg-primary-hover'
    } else {
      cssClass += "border border-primary text-black hover:bg-primary-hover hover:text-slate-100"
    }
  }

  return (
    <button {...props} onClick={onClick} className={cssClass}>
      {label}
    </button>
  );
};

export default Button;