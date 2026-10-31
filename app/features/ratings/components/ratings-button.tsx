"use client"

import { Button } from "@/components/ui/button";
import { Check, Loader2, Star, ThumbsUp, Trash } from "lucide-react";
import { Dialog, DialogTrigger, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";

interface RatingsButtonProps {
    state: boolean,
    open: boolean,
    onConfirm: (rating: number) => Promise<{ success: boolean }>;
    onRemove: () => Promise<{success: boolean}>;
    className?: string;
    disabled: boolean;
}

export default function RatingsButton({ state, className, onConfirm, disabled, onRemove }: RatingsButtonProps) {

  const [ratingCount, setRatingCount] = useState<number>(0);
  const [hoverCount, setHoverCount] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const MAX_STARS = 10;
  const displayValue = hoverCount || ratingCount;

  // star rating
  const stars = Array.from({ length: MAX_STARS}, (_, index) => {

    const starValue = index + 1; // distinguishes each star 
    const isFilled = starValue <= displayValue; // fills each star preceding the clicked/hover star
    return (
      <button
        type="button"
        key={starValue}
        aria-label={`${starValue} out of 10`}
        onMouseEnter={() => setHoverCount(starValue)}
        onClick={() => setRatingCount(starValue)}
        className="cursor-pointer"
      >
        <Star
          size={30}
          className={`${isFilled ? "fill-yellow-400" : "fill-transparent"} min-w-5 h-auto cursor-pointer text-yellow-400 hover:fill-yellow-400/75`}
        />
      </button>
    );
  })

  // handle rating input 
  const handleConfirm = async () => {
    const { success } = await onConfirm(ratingCount);
    if (success) setOpen(false);
  }

  const handleRemove = async () => {
    const { success } = await onRemove();
    if (success) setOpen(false);
  }
    return (
      <DialogTrigger isOpen={open} onOpenChange={setOpen}>
        <Button
          type="button"
          aria-pressed={state}
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

        {/* Dialog */}
        <Dialog
          isDismissable={false}
          showCloseButton={true}
          className="flex flex-col w-full h-fit z-50 rounded-lg border border-white/15 bg-slate-950"
        >
          <div className="flex flex-col w-full h-full">
            <DialogHeader className="flex flex-col tracking-tight">
              <DialogTitle>
                <p className="text-sm font-semibold font-sans md:text-lg">
                  Rate this movie?
                </p>
              </DialogTitle>
              <p className="font-sans text-white/75 font-light">
                Rate this movie from 0 to 10
              </p>
            </DialogHeader>

            <div className="flex flex-row w-full h-fit my-3 gap-5 items-center">
              <div
                className="flex w-full gap-1"
                onMouseLeave={() => setHoverCount(0)}
              >
                {stars}
              </div>
              <p className={"text-sm md:text-lg"}>
                <span
                  className={`${displayValue === 0 ? "text-white" : "text-yellow-400 font-semibold"}`}
                >
                  {displayValue}
                </span>
                /10
              </p>
            </div>

            {/* Add and delete ratings */}
            <DialogFooter className="flex w-full h-fit justify-between">
              <Button
                type="button"
                isDisabled={disabled}
                aria-label="Delete your rating"
                onClick={handleRemove}
                className={`flex text-yellow-400 border border-yellow-400 rounded-md hover:bg-yellow-400/25 cursor-pointer active:bg-yellow-400 active:text-black`}
              >
                <Trash size={18} className="text-yellow-400" />
                {disabled && (
                  <Loader2
                    size={16}
                    className={`${state ? "text-yellow-400" : "text-white"} min-w-4 h-auto animate-spin`}
                  />
                )}
                <p>Delete rating</p>
              </Button>
              <Button
                isDisabled={disabled || ratingCount === 0}
                onClick={handleConfirm}
                type="button"
                aria-label="Add rating button"
                className={`${state ? "bg-yellow-400 text-black" : "bg-transparent text-yellow-400"} flex border border-yellow-400 rounded-md hover:bg-yellow-400/25 cursor-pointer active:bg-yellow-400 active:text-black`}
              >
                {state ? (
                  <Check size={18} className="min-w-3 h-auto text-black" />
                ) : (
                  <ThumbsUp
                    size={18}
                    className="min-w-3 h-auto text-yellow-400"
                  />
                )}
                {disabled && (
                  <Loader2
                    size={16}
                    className={`${state ? "text-yellow-400" : "text-white"} min-w-4 h-auto animate-spin`}
                  />
                )}
                <p className={`${state ? "text-black" : "text-yellow-400"}`}>
                  {disabled ? "Saving..." : state ? "Rated" : "Rate this movie"}
                </p>
              </Button>
            </DialogFooter>
          </div>
        </Dialog>
      </DialogTrigger>
    );
}