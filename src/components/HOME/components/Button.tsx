// Button.tsx
import Link from "next/link";
import styled from "styled-components";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
}

export function Button({ href, children }: ButtonProps) {
  return (
    <StyledWrapper>
      <Link href={href} className="button">
        {children}
      </Link>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    cursor: pointer;
    padding: 0.7em 1.2em;
    border-radius: var(--radius);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;

    background-color: var(--primaria);
    color: var(--branco);
    border: none;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);

    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .button:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  }

  .button:active {
    transform: scale(0.98);
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  }
`;
