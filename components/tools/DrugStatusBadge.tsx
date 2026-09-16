import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { MedicationStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

interface DrugStatusBadgeProps {
  status: MedicationStatus;
  size?: 'sm' | 'md' | 'lg';
  showDescription?: boolean;
  className?: string;
  locale?: Locale;
}

export default function DrugStatusBadge({
  status,
  size = 'md',
  showDescription = false,
  className,
  locale = 'en',
}: DrugStatusBadgeProps) {
  const dict = getDictionary(locale);

  const configs = {
    GREEN: {
      label: dict.badges.allowed,
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      dotClass: 'bg-emerald-500',
      Icon: CheckCircle2,
      shortDesc: dict.specSheet.greenChannelPass,
    },
    YELLOW: {
      label: dict.badges.controlled,
      badgeClass: 'bg-amber-50 text-amber-900 border-amber-300',
      dotClass: 'bg-amber-500',
      Icon: AlertTriangle,
      shortDesc: dict.specSheet.redChannelMust,
    },
    RED: {
      label: dict.badges.banned,
      badgeClass: 'bg-rose-50 text-rose-900 border-rose-300',
      dotClass: 'bg-rose-600 animate-pulse',
      Icon: ShieldAlert,
      shortDesc: dict.badges.redLine,
    },
  };

  const current = configs[status];
  const Icon = current.Icon;

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold',
  };

  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-4.5 w-4.5',
  };

  return (
    <div className={cn('inline-flex flex-col shrink-0', className)}>
      <span
        className={cn(
          'inline-flex items-center rounded-full border font-medium tracking-tight shadow-sm shrink-0 whitespace-nowrap',
          current.badgeClass,
          sizeStyles[size]
        )}
      >
        <span className={cn('h-2 w-2 rounded-full shrink-0', current.dotClass)} />
        <Icon className={cn('shrink-0', iconSizes[size])} />
        <span className="shrink-0 whitespace-nowrap">{current.label}</span>
      </span>
      {showDescription && (
        <span className="mt-1 text-[11px] text-slate-500 font-normal truncate">
          {current.shortDesc}
        </span>
      )}
    </div>
  );
}
