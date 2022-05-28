import {BaseButton, GoogleButton, InvertedButton} from './button.styles';

export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => ({
  [BUTTON_TYPE_CLASSES.base]: BaseButton,
  [BUTTON_TYPE_CLASSES.google]: GoogleButton,
  [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
}[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomBtn = getButton(buttonType);
  return (
    <CustomBtn {...otherProps}>
      {children}
    </CustomBtn>
  )
}

export default Button;