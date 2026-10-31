"use client"

import { Button } from "@/components/ui/button";
import { Check, Loader2, Star, ThumbsUp } from "lucide-react";
import { Dialog, DialogTrigger, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";

interface RatingsButtonProps {
    state: boolean,
    onConfirm: () => void;
    className?: string;
    disabled: boolean;
}

export default function RatingsButton({ state, className, onConfirm, disabled }: RatingsButtonProps) {

  const [ratingCount, setRatingCount] = useState<number>(0);

  const stars = Array.from({ length: 5}, (_, index) => {

    return <Star size={18} className="min-w-5 h-auto" key={index}/>;
  })
    return (
      <DialogTrigger>
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

            <div className="flex flex-row w-full h-fit my-3">{stars}</div>
            <DialogFooter>
              <Button
                isDisabled={disabled}
                onClick={onConfirm}
                className="border border-yellow-400 rounded-md hover:bg-yellow-400/25 cursor-pointer active:bg-yellow-400 active:text-black"
              >
                {state ? (
                  <Check size={18} className="min-w-3 h-auto text-yellow-400" />
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