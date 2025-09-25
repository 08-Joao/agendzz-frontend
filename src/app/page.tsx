'use client'
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button"
import ThemeSwitcher from "@/components/theme-switcher";
import Image from "next/image";
import Container from "@/components/ui/container";

export default function Home() {
  return (
    <Layout>
      <Container className="py-10">
        <h1 className="text-3xl font-bold">Início</h1>
        <p className="mt-4 text-gray-600">
          Testando elementos do frontend.
        </p>
      </Container>
      <div className="grid grid-rows-[20px_fr_20px] items-center justify-start">
        <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center">
          <Button>
            Agendamentos
          </Button>
        </main>
      </div>
    </Layout>
  );
}
