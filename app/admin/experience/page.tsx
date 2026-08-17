'use client'

import { useState, useEffect } from 'react'
import { getExperienceAction, saveExperienceAction } from '../../actions/admin'
import { Experience } from '../../../types'
import { Loader2, Plus, Save, Trash2, Edit } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Experience>>({})

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const data = await getExperienceAction()
    setExperiences(data)
    setLoading(false)
  }

  const handleSaveAll = async (newExperiences: Experience[]) => {
    setSaving(true)
    const result = await saveExperienceAction(newExperiences)
    if (result.success) {
      setExperiences(newExperiences)
      toast.success('Experience saved successfully!')
    } else {
      toast.error('Failed to save experience.')
    }
    setSaving(false)
    setEditingId(null)
  }

  const startEdit = (exp: Experience) => {
    setEditingId(exp.id)
    setFormData({ ...exp, achievements: exp.achievements as any })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData({})
  }

  const submitEdit = () => {
    if (!formData.id || !formData.role) return toast.error('ID and Role are required')
    
    const isNew = !experiences.find(e => e.id === formData.id) && editingId === 'NEW'
    
    const processArray = (val: any) => {
      if (Array.isArray(val)) return val;
      if (typeof val === 'string') return val.split('\n').map(s => s.trim()).filter(Boolean);
      return [];
    }

    const updatedExperience = {
      ...formData,
      achievements: processArray(formData.achievements),
    } as Experience

    let newExperiences
    if (isNew) {
      newExperiences = [updatedExperience, ...experiences]
    } else {
      newExperiences = experiences.map(e => e.id === editingId ? updatedExperience : e)
    }

    handleSaveAll(newExperiences)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      handleSaveAll(experiences.filter(e => e.id !== id))
    }
  }

  const startNew = () => {
    setEditingId('NEW')
    setFormData({
      id: `exp-${Date.now()}`,
      role: '',
      company: '',
      period: '',
      description: '',
      achievements: [] as any
    })
  }

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Experience</h1>
          <p className="text-slate-500 mt-1">Manage your work history and roles.</p>
        </div>
        <button 
          onClick={startNew}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-md shadow-indigo-600/20"
        >
          <Plus size={18} /> Add Experience
        </button>
      </div>

      {editingId && (
        <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-xl shadow-indigo-500/10 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">{editingId === 'NEW' ? 'Add Experience' : 'Edit Experience'}</h2>
          
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
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Role Title</label>
              <input 
                value={formData.role || ''} 
                onChange={e => setFormData({...formData, role: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Company</label>
              <input 
                value={formData.company || ''} 
                onChange={e => setFormData({...formData, company: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Period (e.g. 2021 - Present)</label>
              <input 
                value={formData.period || ''} 
                onChange={e => setFormData({...formData, period: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
              <textarea 
                rows={2}
                value={formData.description || ''} 
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Achievements (One per line)</label>
              <textarea 
                rows={5}
                value={Array.isArray(formData.achievements) ? formData.achievements.join('\n') : formData.achievements || ''} 
                onChange={e => setFormData({...formData, achievements: e.target.value as any})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 leading-relaxed" 
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button onClick={cancelEdit} className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">Cancel</button>
            <button 
              onClick={submitEdit} 
              disabled={saving}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-bold transition-all"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              Save Experience
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {experiences.map(exp => (
          <div key={exp.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
            <div>
              <h3 className="font-bold text-lg text-slate-900">{exp.role}</h3>
              <div className="text-slate-500 text-sm font-semibold mb-3">
                {exp.company} • {exp.period}
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-600 text-sm">
                {exp.achievements.slice(0, 2).map((ach, i) => (
                  <li key={i} className="line-clamp-1">{ach}</li>
                ))}
                {exp.achievements.length > 2 && <li className="text-slate-400 italic">+{exp.achievements.length - 2} more...</li>}
              </ul>
            </div>
            <div className="flex gap-2 ml-4">
              <button onClick={() => startEdit(exp)} className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
                <Edit size={18} />
              </button>
              <button onClick={() => handleDelete(exp.id)} className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
