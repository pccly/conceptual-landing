export default function Logo({ className = "", size = 100 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left C arc - from bottom-left, around left side, to top-left */}
      <path
        d="M 42 85 A 35 35 0 0 1 15 50 A 35 35 0 0 1 42 15 L 42 30 A 20 20 0 0 0 30 50 A 20 20 0 0 0 42 70 Z"
        fill="currentColor"
      />

      {/* Right C arc - from top-right, around right side, to bottom-right */}
      <path
        d="M 58 15 A 35 35 0 0 1 85 50 A 35 35 0 0 1 58 85 L 58 70 A 20 20 0 0 0 70 50 A 20 20 0 0 0 58 30 Z"
        fill="currentColor"
      />
    </svg>
  );
}
