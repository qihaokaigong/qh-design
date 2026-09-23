import type { InputProps } from "../input";

export interface PasswordInputProps extends Omit<InputProps, "type"> {
  /** Whether the password is visible on first render when uncontrolled. */
  defaultVisible?: boolean;
  /** Accessible name for the action that hides the password. Defaults to 隐藏密码. */
  hidePasswordLabel?: string;
  /** Called after the visibility action changes state. */
  onVisibilityChange?: (visible: boolean) => void;
  /** Accessible name for the action that reveals the password. Defaults to 显示密码. */
  showPasswordLabel?: string;
  /** Current visibility when controlled. */
  visible?: boolean;
}
