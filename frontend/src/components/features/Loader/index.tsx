import { Loader2 } from 'lucide-react';
import { cn } from '../../../lib/utils';

const Loader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'flex items-center text-primary',
        className
      )}
    >
      <Loader2 className="h-16 w-16 animate-spin" />
    </div>
  );
};

export default Loader;
