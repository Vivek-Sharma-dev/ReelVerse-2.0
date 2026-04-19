import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

interface ErrorProps {
  message?: string;
  retry?: () => void;
}

const Error = ({
  message = "Something went wrong while fetching data",
  retry,
}: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center bg-card-bg rounded-2xl border border-zinc-800 shadow-2xl m-4">
      <div className="bg-red-500/10 p-4 rounded-full mb-4">
        <FiAlertCircle className="text-red-500 text-4xl" />
      </div>

      <h2 className="text-txt-main text-xl font-bold mb-2">
        Technical Glitch!
      </h2>
      <p className="text-txt-muted text-sm max-w-xs mb-6">{message}</p>

      {retry && (
        <button
          onClick={retry}
          className="flex items-center gap-2 bg-vibe-cyan hover:bg-primary-hover text-zinc-900 px-6 py-2 rounded-full font-bold transition-all active:scale-95 glow"
        >
          <FiRefreshCw className="text-lg" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;
