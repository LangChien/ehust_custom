'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

interface SorterProps {
  classSorter: {
    sortBy: string
    setSortBy: (value: string) => void
    sortOrder: 'asc' | 'desc'
    setSortOrder: (value: 'asc' | 'desc') => void
  }
}

const sortOptions = [
  { value: 'classId', label: 'Mã lớp' },
  { value: 'classType', label: 'Loại lớp' },
  { value: 'studentNumRange', label: 'Sĩ số' },
  { value: 'studentNum', label: 'Đã đăng ký' },
  { value: 'teachers', label: 'Giảng viên' },
]

export function ClassSorter({ classSorter }: SorterProps) {
  const { sortBy, setSortBy, sortOrder, setSortOrder } = classSorter

  const currentSortLabel = sortOptions.find((option) => option.value === sortBy)?.label || 'Sắp xếp'

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className='flex items-center gap-1'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='sm' className='h-8 text-xs bg-transparent'>
            <ArrowUpDown className='h-3 w-3 mr-1' />
            {currentSortLabel}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' className='w-40'>
          <DropdownMenuLabel className='text-xs'>Sắp xếp theo</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={`text-xs ${sortBy === option.value ? 'bg-accent' : ''}`}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant='outline'
        size='sm'
        onClick={toggleSortOrder}
        className='h-8 w-8 p-0 bg-transparent'
        title={sortOrder === 'asc' ? 'Tăng dần' : 'Giảm dần'}
      >
        {sortOrder === 'asc' ? <ArrowUp className='h-3 w-3' /> : <ArrowDown className='h-3 w-3' />}
      </Button>
    </div>
  )
}
