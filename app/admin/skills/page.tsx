'use client'

import { useState, useEffect } from 'react'
import { getSkillsAction, saveSkillsAction } from '../../actions/admin'
import { SkillCategory } from '../../../types'
import { Loader2, Plus, Save, Trash2, Edit } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminSkillsPage() {
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingTitle, setEditingTitle] = useState<string | null>(null)
  const [formData, setFormData] = useState<{ title: string, skills: string }>({ title: '', skills: '' })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const data = await getSkillsAction()
    setCategories(data)
    setLoading(false)
  }

  const handleSaveAll = async (newCategories: SkillCategory[]) => {
    setSaving(true)
    const result = await saveSkillsAction(newCategories)
    if (result.success) {
      setCategories(newCategories)
      toast.success('Skills saved successfully!')
    } else {
      toast.error('Failed to save skills.')
    }
    setSaving(false)
    setEditingTitle(null)
  }

  const startEdit = (cat: SkillCategory) => {
    setEditingTitle(cat.title)
    setFormData({ title: cat.title, skills: cat.skills.join(', ') })
  }

  const cancelEdit = () => {
    setEditingTitle(null)
    setFormData({ title: '', skills: '' })
  }

  const submitEdit = () => {
    if (!formData.title) return toast.error('Title is required')
    
    const isNew = !categories.find(c => c.title === formData.title) && editingTitle === 'NEW'
    
    const updatedCategory: SkillCategory = {
      title: formData.title,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
    }

    let newCategories
    if (isNew) {
      newCategories = [...categories, updatedCategory]
    } else {
      newCategories = categories.map(c => c.title === editingTitle ? updatedCategory : c)
    }

    handleSaveAll(newCategories)
  }

  const handleDelete = (title: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      handleSaveAll(categories.filter(c => c.title !== title))
    }
  }

  const startNew = () => {
    setEditingTitle('NEW')
    setFormData({ title: '', skills: '' })
  }

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-violet-400" size={32} /></div>

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">Skills Management</h1>
          <p className="text-slate-400 mt-1 font-medium">Manage your technical skill categories.</p>
        </div>
        <button 
          onClick={startNew}
          className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-5 py-3 rounded-2xl font-extrabold transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:-translate-y-0.5"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {editingTitle && (
        <div className="glass-panel p-8 rounded-[2.5rem] border border-white/15 shadow-2xl mb-8 bg-[#030712]/95">
          <h2 className="text-xl font-black text-white mb-6">{editingTitle === 'NEW' ? 'Create New Category' : 'Edit Category'}</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Category Title</label>
              <input 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500 font-medium" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Skills (comma separated)</label>
              <textarea 
                rows={4}
                value={formData.skills} 
                onChange={e => setFormData({...formData, skills: e.target.value})}
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
              Save Category
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {categories.map(cat => (
          <div key={cat.title} className="glass-panel p-5 rounded-2xl border border-white/10 shadow-xl flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-lg text-white mb-2">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-violet-500/10 text-violet-300 text-xs font-bold rounded-lg border border-violet-500/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              <button onClick={() => startEdit(cat)} className="p-2 text-violet-400 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10">
                <Edit size={18} />
              </button>
              <button onClick={() => handleDelete(cat.title)} className="p-2 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 rounded-xl transition-colors border border-rose-500/20">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
