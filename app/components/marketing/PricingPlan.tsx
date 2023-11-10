function PricingPlan({
  title,
  price,
  perks,
  icon,
}: {
  title: string;
  price: number | string;
  perks: string[];
  icon: React.JSX.Element;
}) {
  return (
    <article>
      <header>
        <div className="icon">{icon}</div>
        <h2>{title}</h2>
        <p>{price}</p>
      </header>
      <div className="plan-content">
        <ol>
          {perks.map((perk) => (
            <li key={perk}>{perk}</li>
          ))}
        </ol>
        <div className="actions">
          <a href="/not-implemented">Learn More</a>
        </div>
      </div>
    </article>
  );
}

export default PricingPlan;
