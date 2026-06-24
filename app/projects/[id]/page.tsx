import { projects } from '@/lib/projects'
import ProjectDetail from './ProjectDetail'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id)
  if (!project) notFound()
  return <ProjectDetail project={project} />
}
