'use client'

import { useState, useEffect, useRef } from 'react'
import { getProfileAction, saveProfileAction, ProfileData } from '../../actions/admin'
import { uploadImageAction } from '../../actions/upload'
import { compressImage } from '@/lib/compressImage'
import { Loader2, Save, UploadCloud, UserCheck, Sparkles, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Muzammal Ateeq',
    title: 'Full-Stack Engineer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop',
    status: 'Available for Hire & Contract'
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    const data = await getProfileAction()
    setProfile(data)
    setLoading(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFile = e.target.files?.[0]
    if (!rawFile) return

    setUploadingImage(true)
    try {
      const file = await compressImage(rawFile)
      const data = new FormData()
      data.append('file', file)

      const result = await uploadImageAction(data)
      if (result.success && result.url) {
        setProfile(prev => ({ ...prev, avatar: result.url }))
        toast.success('Avatar image uploaded successfully!')
      } else {
        toast.error(result.error || 'Failed to upload avatar image.')
      }
    } catch (err) {
      toast.error('Failed to process image.')
    }
    setUploadingImage(false)
  }

  const handleSave = async () => {
    setSaving(true)
    const result = await saveProfileAction(profile)
    if (result.success) {
      toast.success('Profile settings saved successfully!')
    } else {
      toast.error(result.error || 'Failed to save profile.')
    }
    setSaving(false)
  }

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-violet-400" size={32} /></div>

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">Profile & Avatar Settings</h1>
        <p className="text-slate-400 mt-1 font-medium">Update your profile avatar, name, and live availability badge.</p>
      </div>

      <div className="glass-panel p-8 rounded-[2.5rem] border border-white/15 shadow-2xl bg-[#030712]/95 space-y-8">
        
        {/* Avatar Upload Preview Box */}
        <div className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-white/10">
          <div className="relative group">
            <div className="w-36 h-36 rounded-3xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 p-1 shadow-[0_0_35px_rgba(139,92,246,0.4)]">
              <div className="w-full h-full bg-[#030712] rounded-[22px] overflow-hidden relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop"
                  }}
                />
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border-2 border-[#030712]"></span>
            </span>
          </div>

          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <h3 className="text-xl font-black text-white">Profile Avatar Picture</h3>
              <p className="text-xs font-semibold text-slate-400 mt-1">Upload a high-resolution photograph (PNG, JPG, WebP) to use as your website avatar.</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-6 py-3 rounded-2xl font-extrabold text-sm transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:-translate-y-0.5 disabled:opacity-50"
              >
                {uploadingImage ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
                {uploadingImage ? 'Uploading...' : 'Upload New Avatar Photo'}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Avatar Image URL (or uploaded path)</label>
            <input
              type="text"
              value={profile.avatar}
              onChange={e => setProfile({ ...profile, avatar: e.target.value })}
              className="w-full bg-slate-950/80 border border-white/10 rounded-2xl px-4 py-4 text-white outline-none focus:border-violet-500 font-medium text-sm"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={e => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-slate-950/80 border border-white/10 rounded-2xl px-4 py-4 text-white outline-none focus:border-violet-500 font-medium text-sm"
              placeholder="Muzammal Ateeq"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Job Title / Tagline</label>
            <input
              type="text"
              value={profile.title}
              onChange={e => setProfile({ ...profile, title: e.target.value })}
              className="w-full bg-slate-950/80 border border-white/10 rounded-2xl px-4 py-4 text-white outline-none focus:border-violet-500 font-medium text-sm"
              placeholder="Full-Stack Engineer"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Status Badge Text</label>
            <input
              type="text"
              value={profile.status}
              onChange={e => setProfile({ ...profile, status: e.target.value })}
              className="w-full bg-slate-950/80 border border-white/10 rounded-2xl px-4 py-4 text-white outline-none focus:border-violet-500 font-medium text-sm"
              placeholder="Available for Hire & Contract"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-6 border-t border-white/10">
          <button
            onClick={handleSave}
            disabled={saving || uploadingImage}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-8 py-4 rounded-2xl font-extrabold transition-all shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 disabled:opacity-50 text-sm"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Save Profile Settings
          </button>
        </div>

      </div>
    </div>
  )
}
