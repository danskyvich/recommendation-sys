import { Button } from "@/components/ui/button";
import { Check, Loader2, Tv } from "lucide-react";

interface WatchlistButton {
    state: boolean,
    onClick: () => void,
    disabled: boolean,
}

export default function WatchlistButton ({ state, onClick, disabled}: WatchlistButton) {
    return (
      <Button
        className={`${state ? "bg-yellow-400" : "bg-transparent"} border border-yellow-400 items-center justify-center hover:bg-yellow-400/25 cursor-pointer`}
        type="button"
        onClick={onClick}
        isDisabled={disabled}
      >
        {state ? (
          <Check size={18} className="min-w-3 h-auto text-black" />
        ) : (
          <Tv size={18} className="min-w-3 h-auto text-yellow-400" />
        )}
        {disabled && (
          <Loader2
            size={16}
            className={`${state ? "text-black" : "text-yellow-400"} min-w-4 h-auto animate-spin`}
          />
        )}
        <p className={`${state ? "text-black" : "text-yellow-400"}`}>
          { disabled ? "Saving..." : state ? "In watchlist" : "Add to watchlist" }
        </p>
      </Button>
    );
}