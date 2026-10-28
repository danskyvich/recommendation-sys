import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { ChevronLeft, Loader2 } from "lucide-react";
import { ActionResult } from "next/dist/shared/lib/app-router-types";
import { useState, useTransition } from "react";

interface DialogProps {
    title: string,
    content: string,
    onConfirm: () => Promise<ActionResult> | ActionResult;
    yesButtonText: string;
    noButtonText: string;
    pendingText: string;
}

export default function DialogComponent({ title, content, onConfirm, yesButtonText, noButtonText, pendingText }: DialogProps) {
    const [isPending, startTransition ] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(null);
        startTransition( async() => {

            try {
                const result = await onConfirm();

                if (result && result.success === false) {
                    setError(result.error ?? "Something went wrong")
                }
            } catch (err) {
                throw err;
            }
        })
    }
    return (
      <Dialog className="border border-white/25 bg-slate-950 rounded-2xl shadow-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-sm font-sans">
            {content}
          </DialogDescription>
          <DialogFooter>
            <form onSubmit={handleSubmit} className="flex gap-3 mt-3 items-center justify-between">
              <DialogClose
                aria-label="back-button"
                type="button"
                className="border border-white px-5 cursor-pointer hover:text-white active:bg-white active:text-black"
              >
                <ChevronLeft size={18} className="min-w-4 h-auto" />
                <p>{noButtonText}</p>
              </DialogClose>
              <Button
                aria-label="confirm-action"
                type="submit"
                className="border border-red text-red-500 hover:bg-red-500/25 active:bg-red-500 active:text-white active:border-red-500 cursor-pointer px-5"
                isDisabled={isPending}
              >
                {
                    isPending ? 
                    <div className="flex">
                        <Loader2 size={16} className="animate-spin"/>
                        <p>{pendingText}</p>    
                        </div> 
                    : 
                    yesButtonText
                }
              </Button>
            </form>
          </DialogFooter>
        </DialogHeader>
      </Dialog>
    );
}