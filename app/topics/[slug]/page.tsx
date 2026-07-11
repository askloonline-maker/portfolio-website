export default function TopicPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>{params.slug}</h1>
      {/* Topic page content */}
    </div>
  );
}
