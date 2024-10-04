'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MoonIcon, SunIcon } from "lucide-react"

interface RegisterProps {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

export default function Register({ isDarkMode, toggleDarkMode }: RegisterProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const nombre = formData.get('firstName') as string
    const apellido = formData.get('lastName') as string
    const rut = formData.get('rut') as string
    const telefono = formData.get('phone') as string
    const nombre_empresa = formData.get('company') as string
    const direccion = formData.get('address') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
      setError('Por favor, complete todos los campos obligatorios.')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, rut, telefono, nombre_empresa, direccion, email, password }),
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      router.push('/auth/login')
    } catch (error) {
      const errorMessage = (error as Error).message === 'Failed to fetch'
        ? 'Error de conexión con el servidor'
        : (error as Error).message
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Regístrate</CardTitle>
          <CardDescription>
            Crea una cuenta con tu correo electrónico y contraseña
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label htmlFor="firstName">Nombre</Label>
                <Input id="firstName" name="firstName" required />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="lastName">Apellido</Label>
                <Input id="lastName" name="lastName" required />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="rut">RUT</Label>
                <Input id="rut" name="rut" required />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" name="phone" type="tel" required />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="company">Nombre de la empresa</Label>
                <Input id="company" name="company" required />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" name="address" required />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button disabled={isLoading} type="submit">
                {isLoading ? 'Registrando...' : 'Registrarse'}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/auth/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Inicia sesión
            </Link>
          </p>
        </CardFooter>
      </Card>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4"
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <SunIcon className="h-[1.2rem] w-[1.2rem]" /> : <MoonIcon className="h-[1.2rem] w-[1.2rem]" />}
        <span className="sr-only">Cambiar tema</span>
      </Button>
    </div>
  )
}