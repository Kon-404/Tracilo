'use client'

import { useEffect } from 'react'
// import { analytics } from '@/lib/analytics'
import type { ProjectCaseStudy } from '@/lib/types'

interface CaseStudyAnalyticsProps {
  project: ProjectCaseStudy
}

export function CaseStudyAnalytics({ project }: CaseStudyAnalyticsProps) {
  useEffect(() => {
    // analytics.trackFormEvent('case_study_viewed', 'case_study_detail', { 
    //   project_id: project.id,
    //   project_slug: project.slug,
    //   industry: project.industry,
    //   product_type: project.productType
    // })
  }, [project.id, project.slug, project.industry, project.productType])

  return null
}
