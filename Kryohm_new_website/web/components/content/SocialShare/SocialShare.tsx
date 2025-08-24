'use client'

import { Button } from '@/components/ui/Button'
import { analytics } from '@/lib/analytics'

interface SocialShareProps {
  title: string
  url?: string
}

export function SocialShare({ title, url }: SocialShareProps) {
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareText = `Check out this IoT case study: ${title}`

  const shareLinks = [
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      icon: '💼'
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
      icon: '🐦'
    },
    {
      name: 'Email',
      url: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`I thought you might find this case study interesting: ${currentUrl}`)}`,
      icon: '📧'
    }
  ]

  const handleShare = (platform: string) => {
    analytics.ctaClick(`share_${platform.toLowerCase()}`, 'case_study_detail')
  }

  const handlePrint = () => {
    window.print()
    analytics.ctaClick('print_case_study', 'case_study_detail')
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="text-sm font-medium text-[--color-neutral-800]">Share this case study:</span>
      {shareLinks.map((link) => (
        <Button
          key={link.name}
          variant="ghost"
          size="sm"
          onClick={() => {
            handleShare(link.name)
            window.open(link.url, '_blank', 'noopener,noreferrer')
          }}
          className="flex items-center space-x-2"
        >
          <span>{link.icon}</span>
          <span>{link.name}</span>
        </Button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePrint}
        className="flex items-center space-x-2"
      >
        <span>🖨️</span>
        <span>Print</span>
      </Button>
    </div>
  )
}
