import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/login",
      permanent: false, // false = redirecionamento temporário
    },
  };
};

export default function Home() {
  return null; // nunca será renderizado
}
