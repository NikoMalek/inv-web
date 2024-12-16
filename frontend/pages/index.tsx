'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart2, Package, Truck } from "lucide-react"

interface HomeProps {
  isAuthenticated: boolean
}

export default function Home({ isAuthenticated }: HomeProps) {
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  const features = [
    { title: "Gestión de Inventario", description: "Controla tu stock en tiempo real", icon: Package },
    { title: "Análisis de Datos", description: "Obtén insights valiosos de tu negocio", icon: BarChart2 },
    { title: "Gestión de Pedidos", description: "Optimiza tu proceso de pedidos", icon: Truck },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sistema de Gestión de Inventarios</h1>
        <Button
          onClick={() => router.push(isAuthenticated ? '/dashboard' : '/auth/login')}
        >
          {isAuthenticated ? 'Mi cuenta' : 'Iniciar sesión'}
        </Button>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center">Bienvenido a tu Panel de Control</CardTitle>
            <CardDescription className="text-xl text-center">
              Administra tu inventario, productos y órdenes de manera eficiente.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <feature.icon className="w-10 h-10 mb-2 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => router.push('/auth/register')} className="mt-4">
              Comenzar ahora <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Sistema de Gestión de Inventarios. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}