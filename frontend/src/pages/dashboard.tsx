import Card from "../components/Card";
import Layout from "../components/Layout";
import { Title } from "../components/Title";

export default function DashboardPage() {
  return (
    <Layout
      title="dashboard"
      description="Visualização de métricas e dados sobre o clube"
    >
      <div className="mb-7">
        <Title text="Dashboard" />
      </div>

      <section className="grid grid-cols-3 gap-6">
        <Card title="Unidades" paragraph="4" />
        <Card title="Desbravadores" paragraph="20" />
        <Card title="Líderes" paragraph="5" />
      </section>
    </Layout>
  );
}
