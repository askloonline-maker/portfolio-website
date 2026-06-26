export default function SpacePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Space: {params.id}</h1>
      {/* Space page content */}
    </div>
  );
}
