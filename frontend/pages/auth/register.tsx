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
import RUT from 'rut-chile'

interface RegisterProps {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

export default function Register({ isDarkMode, toggleDarkMode }: RegisterProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rut, setRut] = useState('')
  const [rutError, setRutError] = useState('')

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase()
    value = value.replace(/[^0-9K]/g, '')
    
    if (value.includes('K') && value.indexOf('K') !== value.length - 1) {
      value = value.replace(/K/g, '')
    }

    const formattedRut = RUT.format(value, false, true)
    setRut(formattedRut)
  }

  const handleRutBlur = () => {
    if (rut) {
      const isValid = RUT.validate(rut)
      setRutError(isValid ? '' : 'Formato de RUT inválido')
      if (isValid) {
        console.log('RUT:', RUT.format(rut))
        setRut(RUT.format(rut, false, true))
      }
    }
  }

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
                <Input 
                  id="firstName" 
                  name="firstName"
                  placeholder="Juan"
                  required 
                  />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="lastName">Apellido</Label>
                <Input 
                  id="lastName" 
                  name="lastName" 
                  placeholder="Pérez"
                  required />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="rut">RUT (Sin puntos ni guión)</Label>
                <Input
                  id="rut"
                  name="rut"
                  type="text"
                  placeholder="123456789"
                  value={rut}
                  onChange={handleRutChange}
                  onBlur={handleRutBlur}
                  required
                />
                {rutError && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{rutError}</p>
                )}
              </div>
                <div className="grid gap-1">
                <Label htmlFor="phone">Teléfono</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  placeholder="+56912345678"
                  pattern="[+0-9]*"
                  required 
                  onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.replace(/[^0-9+]/g, '').slice(0, 15); // Limita a 15 caracteres (ajusta según necesidad)
                  }}
                  inputMode='tel'
                  />
                </div>
              <div className="grid gap-1">
                <Label htmlFor="company">Nombre de la empresa</Label>
                <Input 
                  id="company" 
                  name="company" 
                  placeholder="Mi Empresa"
                  required 
                  />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="address">Dirección</Label>
                <Input 
                  id="address" 
                  name="address" 
                  placeholder="Calle 123"
                  required 
                  />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="correo@gmail.com"
                  required 
                  />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="password">Contraseña</Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  placeholder="********"
                  required />
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