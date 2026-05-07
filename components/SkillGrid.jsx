const skills = [
  'React',
  'Next.js',
  'React Native',
  'TypeScript',
  'Tailwind CSS',
  'Supabase',
  'Redux Toolkit',
  'Framer Motion',
]

export function SkillGrid() {
  return (
    <section className="section-block" id="skills">
      <div className="section-heading">
        <p className="eyebrow">Technical Stack</p>
        <h2>Tools selected for speed, scale, and clean interfaces.</h2>
      </div>
      <div className="skill-grid">
        {skills.map((skill) => (
          <span className="skill-pill" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}
