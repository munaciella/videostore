"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const TrailerModal = ({ trailerUrl }: { trailerUrl: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex items-center space-x-2">
          <PlayCircle className="w-5 h-5" />
          <span>Watch Trailer</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-full">
        <DialogTitle>Movie Trailer</DialogTitle>
        <DialogDescription>
          Watch the official trailer for this movie.
        </DialogDescription>
        <div className="relative w-full h-0 pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={trailerUrl.replace("watch?v=", "embed/")}
            title="Movie Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrailerModal;