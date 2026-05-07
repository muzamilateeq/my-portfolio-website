export function ProjectGrid({ projects }) {
  return (
    <section className="section-block" id="projects">
      <div className="section-heading">
        <p className="eyebrow">Supabase Projects</p>
        <h2>Project details are fetched from Supabase when configured.</h2>
      </div>
      <div className="service-grid">
        {projects.map((project, index) => (
          <article className="service-card" key={project.id || project.title}>
            <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tag-list">
              {(project.stack || []).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
