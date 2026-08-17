'use client'

import { useState, useEffect, useRef } from 'react'
import { getProjectsAction, saveProjectsAction } from '../../actions/admin'
import { uploadImageAction } from '../../actions/upload'
import { Project } from '../../../types'
import { Loader2, Plus, Save, Trash2, Edit, UploadCloud } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Project>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    const data = await getProjectsAction()
    setProjects(data)
    setLoading(false)
  }

  const handleSaveAll = async (newProjects: Project[]) => {
    setSaving(true)
    const result = await saveProjectsAction(newProjects)
    if (result.success) {
      setProjects(newProjects)
      toast.success('Projects saved successfully!')
    } else {
      toast.error('Failed to save projects.')
    }
    setSaving(false)
    setEditingId(null)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    const data = new FormData()
    data.append('file', file)

    const result = await uploadImageAction(data)
    if (result.success && result.url) {
      setFormData(prev => ({ ...prev, image: result.url }))
      toast.success('Image uploaded successfully')
    } else {
      toast.error(result.error || 'Failed to upload image')
    }
    setUploadingImage(false)
  }

  const startEdit = (project: Project) => {
    setEditingId(project.id)
    setFormData({ ...project })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData({})
  }

  const submitEdit = () => {
    if (!formData.id || !formData.title) return toast.error('ID and Title are required')
    
    const isNew = !projects.find(p => p.id === formData.id) && editingId === 'NEW'
    
    // Convert comma-separated strings to arrays if they are strings
    const processArray = (val: any) => typeof val === 'string' ? val.split(',').map(s => s.trim()).filter(Boolean) : val || []

    const updatedProject = {
      ...formData,
      stack: processArray(formData.stack),
      metrics: processArray(formData.metrics),
    } as Project

    let newProjects
    if (isNew) {
      newProjects = [updatedProject, ...projects]
    } else {
      newProjects = projects.map(p => p.id === editingId ? updatedProject : p)
    }

    handleSaveAll(newProjects)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      handleSaveAll(projects.filter(p => p.id !== id))
    }
  }

  const startNew = () => {
    setEditingId('NEW')
    setFormData({
      id: `proj-${Date.now()}`,
      title: '',
      shortDescription: '',
      description: '',
      stack: [],
      metrics: [],
      image: '/placeholder.jpg',
      featured: true
    })
  }

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>

  return (
    <div className="max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Projects</h1>
          <p className="text-slate-500 mt-1">Manage your portfolio case studies and projects.</p>
        </div>
        <button 
          onClick={startNew}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-md shadow-indigo-600/20"
        >
          <Plus size={18} /> Add Project
        </button>
      </div>

      {editingId && (
        <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-xl shadow-indigo-500/10 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">{editingId === 'NEW' ? 'Create New Project' : 'Edit Project'}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">ID (Unique)</label>
              <input 
                value={formData.id || ''} 
                onChange={e => setFormData({...formData, id: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
              <input 
                value={formData.title || ''} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Short Description</label>
              <input 
                value={formData.shortDescription || ''} 
                onChange={e => setFormData({...formData, shortDescription: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Description</label>
              <textarea 
                rows={3}
                value={formData.description || ''} 
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tech Stack (comma separated)</label>
              <input 
                value={Array.isArray(formData.stack) ? formData.stack.join(', ') : formData.stack || ''} 
                onChange={e => setFormData({...formData, stack: e.target.value as any})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500" 
              />
            </div>
            
            {/* Image Upload Section */}
            <div className="row-span-2 border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center relative bg-slate-50 overflow-hidden group">
              {formData.image && formData.image !== '/placeholder.jpg' ? (
                <div className="absolute inset-0 w-full h-full">
                  <Image src={formData.image} alt="Preview" fill className="object-cover opacity-60 group-hover:opacity-30 transition-opacity" />
                </div>
              ) : null}
              
              <div className="relative z-10 flex flex-col items-center pointer-events-none">
                {uploadingImage ? (
                  <Loader2 size={32} className="animate-spin text-indigo-600 mb-2" />
                ) : (
                  <UploadCloud size={32} className="text-indigo-600 mb-2" />
                )}
                <span className="text-sm font-bold text-slate-700">
                  {uploadingImage ? 'Uploading...' : 'Click to select image'}
                </span>
                <span className="text-xs text-slate-500 mt-1">Recommended: 16:9 ratio</span>
              </div>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Live URL (optional)</label>
              <input 
                value={formData.liveUrl || ''} 
                onChange={e => setFormData({...formData, liveUrl: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">GitHub URL (optional)</label>
              <input 
                value={formData.githubUrl || ''} 
                onChange={e => setFormData({...formData, githubUrl: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500" 
              />
            </div>
            <div className="flex items-center gap-2 md:col-span-2 mt-2">
              <input 
                type="checkbox" 
                id="featured"
                checked={!!formData.featured}
                onChange={e => setFormData({...formData, featured: e.target.checked})}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300"
              />
              <label htmlFor="featured" className="font-bold text-slate-700">Featured Project (Shows on homepage)</label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button onClick={cancelEdit} className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">Cancel</button>
            <button 
              onClick={submitEdit} 
              disabled={saving || uploadingImage}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-bold transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              Save Project
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {projects.map(project => (
          <div key={project.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-bold text-lg text-slate-900">{project.title}</h3>
                {project.featured && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-md">Featured</span>}
              </div>
              <p className="text-slate-500 text-sm">{project.shortDescription}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => startEdit(project)}
                className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
              >
                <Edit size={18} />
              </button>
              <button 
                onClick={() => handleDelete(project.id)}
                className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <div className="text-center p-10 text-slate-500 bg-white rounded-2xl border border-slate-200">No projects found. Add one!</div>}
      </div>
    </div>
  )
}
