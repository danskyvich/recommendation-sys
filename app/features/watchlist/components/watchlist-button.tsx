import { Button } from "@/components/ui/button";
import { Check, Tv } from "lucide-react";

interface WatchlistButton {
    movie_id: number,
    state: boolean,
    onClick: () => void,
    disabled: boolean,
}

export default function WatchlistButton ({ movie_id, state, onClick, disabled}: WatchlistButton) {
    return (
      <Button
        className={`${state && "bg-yellow-400"} border border-yellow-400 items-center justify-center hover:bg-yellow-400/25 cursor-pointer`}
        type="submit"
        onClick={() => onClick}
        isDisabled={disabled}
      >
        {state ? (
          <Check size={18} className="min-w-3 h-auto text-black" />
        ) : (
          <Tv size={18} className="min-w-3 h-auto text-yellow-400" />
        )}
        <p className={`${state ? "text-black" : "text-yellow-400"}`}>
          Add to watchlist
        </p>
      </Button>
    );
}