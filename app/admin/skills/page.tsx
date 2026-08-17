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

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Skills</h1>
          <p className="text-slate-500 mt-1">Manage your technical skill categories.</p>
        </div>
        <button 
          onClick={startNew}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-md shadow-indigo-600/20"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {editingTitle && (
        <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-xl shadow-indigo-500/10 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">{editingTitle === 'NEW' ? 'Create New Category' : 'Edit Category'}</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category Title</label>
              <input 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Skills (comma separated)</label>
              <textarea 
                rows={4}
                value={formData.skills} 
                onChange={e => setFormData({...formData, skills: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500" 
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
              Save Category
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {categories.map(cat => (
          <div key={cat.title} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-md border border-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              <button onClick={() => startEdit(cat)} className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
                <Edit size={18} />
              </button>
              <button onClick={() => handleDelete(cat.title)} className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
