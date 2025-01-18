import type { ButtonProps } from '@nextui-org/button';
import { Button } from '@nextui-org/button';
import { cn } from '@nextui-org/react';
import { HiArrowNarrowLeft, HiArrowNarrowRight, HiX } from 'react-icons/hi';

export enum ButtonRightIcon {
  ArrowRight = 'ArrowRight',
}

export enum ButtonLeftIcon {
  ArrowLeft = 'ArrowLeft',
  Cancel = 'Cancel',
}
const buttonRightIcons: Record<ButtonRightIcon, JSX.Element> = {
  [ButtonRightIcon.ArrowRight]: <HiArrowNarrowRight />,
};

const buttonLeftIcons: Record<ButtonLeftIcon, JSX.Element> = {
  [ButtonLeftIcon.ArrowLeft]: <HiArrowNarrowLeft />,
  [ButtonLeftIcon.Cancel]: <HiX />,
};

interface MyButtonProps extends ButtonProps {
  children: React.ReactNode;
  className?: string;
  iconRight?: ButtonRightIcon;
  iconLeft?: ButtonLeftIcon;
}

const MyButton = ({
  children,
  iconRight,
  iconLeft,
  className,
  isLoading,
  ...props
}: MyButtonProps) => {
  const buttonIconLeft = iconLeft && !isLoading && buttonLeftIcons[iconLeft];
  const buttonIconRight =
    iconRight && !isLoading && buttonRightIcons[iconRight];

  return (
    <Button
      isLoading={isLoading}
      {...props}
      className={cn(
        props.variant === 'solid' &&
          'bg-gradient-to-r from-blue-500 to-purple-500 p-0.5',
        className,
      )}
    >
      <span className="transition-all duration-300 group-hover:-translate-x-1">
        {' '}
        {buttonIconLeft}
      </span>{' '}
      {children}{' '}
      <span className="transition-all duration-300 group-hover:translate-x-1">
        {buttonIconRight}
      </span>
    </Button>
  );
};
export default MyButton;
