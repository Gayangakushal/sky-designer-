import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

interface AwardAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AwardAnnouncementModal = ({ isOpen, onClose }: AwardAnnouncementModalProps) => (
  <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
    <DialogContent className="w-fit max-w-[calc(100vw-1.5rem)] gap-0 overflow-hidden rounded-2xl border border-white/20 bg-[#00143d] p-0 shadow-[0_30px_100px_rgba(0,0,0,0.65)] sm:max-w-[calc(100vw-2rem)] [&>button]:right-3 [&>button]:top-3 [&>button]:grid [&>button]:h-11 [&>button]:w-11 [&>button]:place-items-center [&>button]:rounded-full [&>button]:border [&>button]:border-white/30 [&>button]:bg-black/65 [&>button]:text-white [&>button]:opacity-100 [&>button]:shadow-lg [&>button]:backdrop-blur-md [&>button]:hover:bg-black/85 [&>button>svg]:h-5 [&>button>svg]:w-5">
      <DialogTitle className="sr-only">Sky Designers award recognition</DialogTitle>
      <DialogDescription className="sr-only">
        Sky Designers received recognition as the Most Outstanding Digital Growth and Performance
        Marketing Partner at the Lanka Chairman&apos;s Business Excellence Awards 2026.
      </DialogDescription>
      <img
        src="/images/award-recognition-2026.png"
        alt="Sky Designers recognition at the Lanka Chairman's Business Excellence Awards 2026"
        className="block h-auto max-h-[calc(100dvh-1.5rem)] w-auto max-w-[calc(100vw-1.5rem)] object-contain sm:max-h-[calc(100dvh-2rem)] sm:max-w-[calc(100vw-2rem)]"
      />
    </DialogContent>
  </Dialog>
);

export default AwardAnnouncementModal;
