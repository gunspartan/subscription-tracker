import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from '../ui/dialog';
import { Service } from '@/lib/types';
import { Badge } from '../ui/badge';
import { HomeIcon } from '@radix-ui/react-icons';
import { Separator } from '../ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const FamilyDialog = ({ service }: { service: Service }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Dialog>
            <DialogTrigger asChild className='cursor-pointer'>
              <Badge variant='secondary' className={service.family.length ? '' : 'hidden'}>
                <HomeIcon className='mr-1 h-4 w-4' /> Family
              </Badge>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle className='flex gap-2 items-center'>
                  <HomeIcon className='h-4 w-4' />
                  Family Members
                </DialogTitle>
                <DialogDescription>
                  {service.family.length} {service.family.length === 1 ? 'member' : 'members'}
                </DialogDescription>
              </DialogHeader>
              <div className='flex flex-col gap-4 p-4'>
                {service.family.map((member, index) => (
                  <div key={index} className='flex flex-row gap-4'>
                    <div className='flex flex-col grow'>
                      <p className='font-bold'>{member}</p>
                      <p className='text-muted-foreground'>Member</p>
                      <Separator className='' />
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </TooltipTrigger>
        <TooltipContent>{service.family.length} member(s)</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FamilyDialog;
