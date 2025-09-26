type Props = {
  title: string;
  paragraph: string;
  style?: string;
};

export default function Card(props: Props) {
  return (
    <section className={props.style ?? "w-60 h-24 bg-emerald-100 rounded-lg shadow-md" }>
      <div className="
    text-emerald-600 
      font-bold 
      mx-5 
      my-3 
      flex 
      flex-col 
      gap-2 
      items-start">
        <h1>{props.title}</h1>
        <p>{props.paragraph}</p>
      </div>
    </section>
  );
}
