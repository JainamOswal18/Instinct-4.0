import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11 20A7 7 0 0 1 4 13H2a9 9 0 0 0 18 0h-2a7 7 0 0 1-7 7Z" className="fill-primary" stroke="none" />
      <path d="M12 2v8" className="stroke-accent" />
      <path d="m8.5 8.5 7 7" className="stroke-accent" />
      <path d="M12 14l-4 4" className="stroke-accent" />
    </svg>
  );
}
