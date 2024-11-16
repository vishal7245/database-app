'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface RIFItem {
  id: number
  Accession: string
  earlySecretoryPhase?: number | null
  midSecretoryPhase?: number | null
  lateSecretoryPhase?: number | null
  samples?: string | null
  platform?: string | null
  experimentType?: string | null
  fileFormat?: string | null
  codingNonCoding?: string | null
  naturalStimulated?: string | null
  condition?: string | null
  title?: string | null
  published?: string | null
}

const TABLE_HEADERS = [
  'Accession',
  'Early Secretory Phase',
  'Mid Secretory Phase',
  'Late Secretory Phase',
  'Samples',
  'Platform',
  'Experiment Type',
  'File Format',
  'Coding/Non-Coding',
  'Natural/Stimulated',
  'Condition',
  'Title',
  'Published'
] as const

function RowDialog({ item }: { item: RIFItem }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <TableRow 
          className="cursor-pointer border-b border-pink-200 hover:bg-pink-50 transition-colors"
          onClick={() => setIsOpen(true)}
          role="button"
          tabIndex={0}
          aria-label={`View details for ${item.Accession}`}
        >
          {Object.entries(item).map(([key, value]) => (
            key !== 'id' && (
              <TableCell key={key} className="p-2">
                <div 
                  className="truncate max-w-[150px]" 
                  title={value?.toString() ?? 'Not Available'}
                >
                  {value ?? 'N/A'}
                </div>
              </TableCell>
            )
          ))}
        </TableRow>
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Details for {item.Accession}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[60vh]">
          {Object.entries(item).map(([key, value]) => (
            key !== 'id' && (
              <div key={key} className="grid grid-cols-2 gap-4 py-2 border-b border-pink-200 last:border-b-0">
                <div className="font-medium text-pink-700">{key}</div>
                <div>{value ?? 'Not Available'}</div>
              </div>
            )
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  return (
    <nav className="inline-flex" role="navigation" aria-label="Pagination">
      <ul className="flex list-none items-center gap-2">
        {currentPage > 1 && (
          <li>
            <Button variant="outline" size="sm" asChild>
              <Link href={`?page=${currentPage - 1}`}>Previous</Link>
            </Button>
          </li>
        )}
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index}>
            <Button
              variant={currentPage === index + 1 ? "default" : "outline"}
              size="sm"
              asChild
            >
              <Link href={`?page=${index + 1}`}>{index + 1}</Link>
            </Button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <Button variant="outline" size="sm" asChild>
              <Link href={`?page=${currentPage + 1}`}>Next</Link>
            </Button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export function RIFTable({ 
  data, 
  currentPage, 
  totalPages 
}: { 
  data: RIFItem[]
  currentPage: number
  totalPages: number
}) {
  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-pink-200">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-pink-100">
              {TABLE_HEADERS.map((header) => (
                <TableHead key={header} className="p-2 text-left font-medium text-pink-700">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: RIFItem) => (
              <RowDialog key={item.id} item={item} />
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center mt-6">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </>
  )
}
