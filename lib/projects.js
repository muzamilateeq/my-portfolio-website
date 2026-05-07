import { createSupabaseServerClient } from '@/lib/supabase'

const fallbackProjects = [
  {
    id: 'blood-donation',
    title: 'Blood Donation Website',
    description:
      'A donor-request platform UI for finding blood donors across Pakistan with a fast form-first experience.',
    stack: ['React', 'Healthcare UI', 'Responsive Design'],
    image: '/projects/blood-donation-screenshot.png',
    live_url: 'https://blood-donation-kappa-ten.vercel.app/',
  },
  {
    id: 'restaurant-web',
    title: 'Restaurant Web Application',
    description:
      'A professional food delivery and restaurant UI built with modern React components.',
    stack: ['React', 'Food UI', 'Responsive Design'],
    image: '/projects/restaurant-web-screenshot.png',
    live_url: 'https://resturentweb-gules.vercel.app/',
  },
  {
    id: 'govconnect',
    title: 'GovConnect Portal',
    description:
      'A public services portal UI for government services, jobs, schemes, and application tracking.',
    stack: ['React', 'Public Services', 'Portal UI'],
    image: '/projects/govconnect-green-preview.png',
    live_url: 'https://gov-connect-web01.vercel.app/',
  },
]

export async function getProjects() {
  const supabase = createSupabaseServerClient()

  if (!supabase) {
    return fallbackProjects
  }

  const { data, error } = await supabase
    .from('projects')
    .select('id,title,description,stack,image,live_url,repo_url,featured,sort_order')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Supabase project fetch failed:', error.message)
    return fallbackProjects
  }

  return data?.length ? data : fallbackProjects
}
