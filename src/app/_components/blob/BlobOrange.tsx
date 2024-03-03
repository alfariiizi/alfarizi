type Props = {
  className?: string;
};

function BlobOrange({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      className={className}
    >
      <defs>
        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="rgba(231, 157, 38, 1)"></stop>
          <stop offset="100%" stopColor="rgba(231, 157, 38, 1)"></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#sw-gradient)"
        stroke="url(#sw-gradient)"
        strokeWidth="0"
        d="M8.8-11.4c5.3-.8 14-3.8 19.2-2.3 5.2 1.6 7 7.6 6.1 13.2-.8 5.6-4.2 10.7-8.4 14-4.3 3.3-9.3 4.7-13.7 9.1C7.6 26.9 3.8 34.1.2 33.9c-3.7-.3-7.1-8.1-10.7-12.9-3.6-4.8-7.2-6.7-11.8-9.8-4.6-3-10.1-7.1-9.3-10.7.8-3.7 7.9-6.9 11.8-11.1 3.8-4.3 4.4-9.6 7.2-10.3 2.8-.6 7.7 3.5 11 6.2 3.4 2.8 5.2 4.1 10.4 3.3z"
        transform="translate(50 50)"
        style={{
          WebkitTransition: "all 0.3s ease 0s",
          transition: "all 0.3s ease 0s",
        }}
      ></path>
    </svg>
  );
}

export default BlobOrange;
