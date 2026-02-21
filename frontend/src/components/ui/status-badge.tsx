import { Badge } from './badge';
import { cn } from '@/lib/utils';

export type FleetStatus = 'Available' | 'On Trip' | 'In Shop' | 'Retired' | 'Completed';

interface StatusBadgeProps {
    status: FleetStatus;
    className?: string;
}

const statusStyles: Record<FleetStatus, string> = {
    'Available': 'bg-emerald-500 hover:bg-emerald-600',
    'On Trip': 'bg-amber-500 hover:bg-amber-600',
    'In Shop': 'bg-red-500 hover:bg-red-600',
    'Retired': 'bg-slate-500 hover:bg-slate-600',
    'Completed': 'bg-violet-500 hover:bg-violet-600',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
    return (
        <Badge className={cn("text-white border-none font-medium px-2.5 py-0.5 shadow-sm", statusStyles[status], className)}>
            {status}
        </Badge>
    );
}
