'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, LayoutGrid } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { Button } from './button'
import { Card, CardContent } from './card'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  DashboardCircleRemoveIcon,
  DashboardSquareRemoveIcon,
  Logout01Icon,
  StudentCardIcon,
  TeacherIcon,
  UserShield01Icon,
} from '@hugeicons-pro/core-stroke-rounded'
import { useAuth } from '../auth/auth-provider'

interface School {
  id: number
  name: string
  type: 'default' | 'special' | 'admin'
}

export default function UserMenu() {
  const { logout } = useAuth()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selected, setSelected] = useState<string>('')

  const schools: School[] = [
    { id: 1, name: 'EEEFM Prof João Bento Da Costa', type: 'default' },
    { id: 2, name: 'EEEFM Prof João Bento Da Costa', type: 'default' },
    { id: 3, name: 'EEEFM Prof João Bento Da Costa', type: 'special' },
    { id: 4, name: 'EEEFM Prof João Bento Da Costa', type: 'default' },
  ]

  const handleGridClick = () => {
    setIsExpanded(!isExpanded)
    setIsDropdownOpen(false)
  }

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className="w-full max-w-sm group-data-[collapsible=icon]:hidden">
      <Card className="border-gray-100 bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-primary">
                <HugeiconsIcon
                  icon={UserShield01Icon}
                  size={20}
                  strokeWidth={0.5}
                />
              </div>
              <div>
                <p className="font-sm text-gray-800">Luis</p>
                <p className="text-xs text-gray-500">Diretor</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-primary [&_svg]:size-5"
              onClick={handleGridClick}
            >
              <HugeiconsIcon
                icon={DashboardCircleRemoveIcon}
                size={20}
                strokeWidth={0.5}
              />
            </Button>
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="mt-4 overflow-hidden"
              >
                <button
                  onClick={handleDropdownClick}
                  className="w-full overflow-hidden rounded-2xl border bg-gray-100 transition-colors hover:bg-gray-100"
                >
                  <div className="flex h-[36px] items-center justify-between px-4">
                    <span className="text-start text-xs font-medium text-gray-600">
                      {selected ? selected : 'Escolas'}
                    </span>
                    <motion.div
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown
                        strokeWidth={3}
                        className="h-4 w-4 text-gray-500"
                      />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="max-h-[124px] overflow-auto bg-white"
                      >
                        <div className="pb-3">
                          {schools.map((school) => (
                            <div
                              key={school.id}
                              onClick={() => setSelected(school.name)}
                              className="flex items-center gap-3 rounded-none px-4 py-1 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            >
                              <HugeiconsIcon
                                icon={TeacherIcon}
                                size={20}
                                color="#4D4D4D"
                                strokeWidth={0.1}
                              />
                              <span className="text-start text-[10px]">
                                {school.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
