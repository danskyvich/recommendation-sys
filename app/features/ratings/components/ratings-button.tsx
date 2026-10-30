import { Button } from "@/components/ui/button";
import { Check, ThumbsUp } from "lucide-react";

interface RatingsButtonProps {
    state: boolean,
    onConfirm: () => void;
    className?: string
}

export default function RatingsButton({ state, className, onConfirm }: RatingsButtonProps) {
    return (
      <Button
        type="button"
        aria-pressed={state}
        onClick={onConfirm}
        className={`${className} ${state ? "bg-yellow-400" : "bg-transparent"} border border-yellow-400 cursor-pointer hover:bg-yellow-400/25 hover:text-white active:bg-yellow-400 active:text-black`}
      >
        {state ? (
          <Check size={18} className="text-black" />
        ) : (
          <ThumbsUp size={18} className="text-yellow-400" />
        )}
        <span className={state ? "text-black" : "text-yellow-400"}>
          {state ? "Rated" : "Rate this movie"}
        </span>
      </Button>
    );
}