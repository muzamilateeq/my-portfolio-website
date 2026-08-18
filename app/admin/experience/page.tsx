'use client'

import { useState, useEffect } from 'react'
import { getExperienceAction, saveExperienceAction } from '../../actions/admin'
import { Experience } from '../../../types'
import { Loader2, Plus, Save, Trash2, Edit } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminExperiencePage() {
  const [experience, setExperience] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Experience>>({})

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const data = await getExperienceAction()
    setExperience(data)
    setLoading(false)
  }

  const handleSaveAll = async (newExp: Experience[]) => {
    setSaving(true)
    const result = await saveExperienceAction(newExp)
    if (result.success) {
      setExperience(newExp)
      toast.success('Experience saved successfully!')
    } else {
      toast.error('Failed to save experience.')
    }
    setSaving(false)
    setEditingId(null)
  }

  const startEdit = (exp: Experience) => {
    setEditingId(exp.id)
    setFormData({ ...exp })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData({})
  }

  const submitEdit = () => {
    if (!formData.id || !formData.role) return toast.error('ID and Role are required')
    
    const isNew = !experience.find(e => e.id === formData.id) && editingId === 'NEW'
    
    const processArray = (val: any) => typeof val === 'string' ? val.split('\n').map(s => s.trim()).filter(Boolean) : val || []

    const updatedExp: Experience = {
      id: formData.id || `exp-${Date.now()}`,
      role: formData.role || '',
      company: formData.company || '',
      period: formData.period || '',
      description: formData.description || '',
      achievements: processArray(formData.achievements)
    }

    let newExp
    if (isNew) {
      newExp = [updatedExp, ...experience]
    } else {
      newExp = experience.map(e => e.id === editingId ? updatedExp : e)
    }

    handleSaveAll(newExp)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this experience entry?')) {
      handleSaveAll(experience.filter(e => e.id !== id))
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
      achievements: []
    })
  }

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-violet-400" size={32} /></div>

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">Experience Management</h1>
          <p className="text-slate-400 mt-1 font-medium">Manage your career journey and achievements.</p>
        </div>
        <button 
          onClick={startNew}
          className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-5 py-3 rounded-2xl font-extrabold transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:-translate-y-0.5"
        >
          <Plus size={18} /> Add Entry
        </button>
      </div>

      {editingId && (
        <div className="glass-panel p-8 rounded-[2.5rem] border border-white/15 shadow-2xl mb-8 bg-[#030712]/95">
          <h2 className="text-xl font-black text-white mb-6">{editingId === 'NEW' ? 'Create New Experience Entry' : 'Edit Entry'}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Role Title</label>
              <input 
                value={formData.role || ''} 
                onChange={e => setFormData({...formData, role: e.target.value})}
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500 font-medium" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Company</label>
              <input 
                value={formData.company || ''} 
                onChange={e => setFormData({...formData, company: e.target.value})}
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500 font-medium" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Period (e.g. 2023 - Present)</label>
              <input 
                value={formData.period || ''} 
                onChange={e => setFormData({...formData, period: e.target.value})}
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500 font-medium" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Description</label>
              <textarea 
                rows={3}
                value={formData.description || ''} 
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500 font-medium" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Key Achievements (one per line)</label>
              <textarea 
                rows={4}
                value={Array.isArray(formData.achievements) ? formData.achievements.join('\n') : formData.achievements || ''} 
                onChange={e => setFormData({...formData, achievements: e.target.value as any})}
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500 font-medium" 
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button onClick={cancelEdit} className="px-5 py-2.5 font-bold text-slate-400 hover:text-white rounded-xl transition-colors">Cancel</button>
            <button 
              onClick={submitEdit} 
              disabled={saving}
              className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-6 py-2.5 rounded-xl font-extrabold transition-all"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              Save Entry
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {experience.map(exp => (
          <div key={exp.id} className="glass-panel p-5 rounded-2xl border border-white/10 shadow-xl flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-extrabold text-lg text-white">{exp.role}</h3>
                <span className="text-violet-400 text-xs font-bold">@ {exp.company}</span>
                <span className="px-2.5 py-0.5 bg-violet-500/10 text-violet-300 border border-violet-500/20 text-xs font-bold rounded-full">{exp.period}</span>
              </div>
              <p className="text-slate-400 text-sm font-medium">{exp.description}</p>
            </div>
            <div className="flex gap-2 ml-4">
              <button onClick={() => startEdit(exp)} className="p-2 text-violet-400 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10">
                <Edit size={18} />
              </button>
              <button onClick={() => handleDelete(exp.id)} className="p-2 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 rounded-xl transition-colors border border-rose-500/20">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
