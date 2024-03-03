type Props = {
  className?: string;
};

function BlobPink({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className={className}
    >
      <defs>
        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="rgba(242, 90, 153, 1)"></stop>
          <stop offset="100%" stopColor="rgba(147.298, 147.298, 255, 1)"></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#sw-gradient)"
        stroke="url(#sw-gradient)"
        strokeWidth="0"
        d="M19.3-25c6.4 3 12.5 7.8 9.3 12.3C25.4-8.2 12.7-4.1 9.4 2.1 6 8.2 11.9 16.4 11.9 22.9s-6 11.2-9.6 8.1c-3.7-3.1-5.1-14.1-13-18.1-7.9-3.9-22.2-.7-24.5-2.7-2.2-1.9 7.6-8.9 11.3-17.3 3.6-8.4 1.1-18.1 4-22.2 3-4 11.4-2.4 18.9-1.1C6.5-29 13-27.9 19.3-25z"
        transform="translate(50 50)"
        style={{
          WebkitTransition: "all 0.3s ease 0s",
          transition: "all 0.3s ease 0s",
        }}
      ></path>
    </svg>
  );
}

export default BlobPink;
