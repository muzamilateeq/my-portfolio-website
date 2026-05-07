const stackGroups = [
  {
    title: 'Frontend Systems',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Mobile Products',
    items: ['React Native', 'Redux Toolkit', 'Motion UX'],
  },
  {
    title: 'Backend Flow',
    items: ['Supabase', 'Auth', 'Realtime Data', 'Contact Pipelines'],
  },
]

export function BentoGrid() {
  return (
    <section className="section-block" id="about">
      <div className="section-heading">
        <p className="eyebrow">About and Stack</p>
        <h2>A compact builder profile shaped for web, mobile, and product logic.</h2>
      </div>
      <div className="bento-grid">
        <article className="bento-card bento-large">
          <span className="card-index">Profile</span>
          <h3>Full-stack thinking with interface-level precision.</h3>
          <p>
            Muzammal Ateeq builds applications where the UI feels sharp, the data
            model stays understandable, and the final product is ready to ship.
          </p>
        </article>
        {stackGroups.map((group) => (
          <article className="bento-card" key={group.title}>
            <span className="card-index">{group.title}</span>
            <div className="tag-list">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
