import React from 'react';
import { LockClosedIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const DeactivatedBadge = ({ deactivatedAt }: { deactivatedAt: Date | null }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant='outline' className={deactivatedAt ? '' : 'hidden'}>
            <LockClosedIcon className='mr-1 h-4 w-4' /> Deactivated
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          {deactivatedAt ? `Deactivated on ${format(deactivatedAt, 'PPP')}` : ''}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DeactivatedBadge;
