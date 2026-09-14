import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "maroon" | "outline" | "whatsapp" | "gold";

type BaseProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = BaseProps & {
  href: string;
  onClick?: never;
};

type ButtonAsButton = BaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const variantClass: Record<ButtonVariant, string> = {
  maroon: "btn-maroon",
  outline: "btn-outline",
  whatsapp: "btn-whatsapp",
  gold: "btn-gold",
};

export function Button(props: ButtonProps) {
  const { variant = "maroon", className, children } = props;
  const classes = cn(
    "btn",
    variantClass[variant],
    className
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { onClick, type = "button" } = props as ButtonAsButton;
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
