import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Minus, Search, ShoppingCart, CreditCard } from "lucide-react"

interface Producto {
  id: number
  nombre: string
  precio: number
  cantidad: number
}

export default function PaginaVentas() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [busqueda, setBusqueda] = useState("")
  const [metodoPago, setMetodoPago] = useState("efectivo")
  const [montoEfectivo, setMontoEfectivo] = useState(0)
  const [montoTarjeta, setMontoTarjeta] = useState(0)

  const total = productos.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0)
  const vuelto = Math.max(0, montoEfectivo - total)

  const agregarProducto = (producto: Producto) => {
    const productoExistente = productos.find((p) => p.id === producto.id)
    if (productoExistente) {
      setProductos(productos.map((p) => (p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p)))
    } else {
      setProductos([...productos, { ...producto, cantidad: 1 }])
    }
  }

  const eliminarProducto = (productoId: number) => {
    setProductos(productos.filter((p) => p.id !== productoId))
  }

  const productosDisponibles: Producto[] = [
    { id: 1, nombre: "Producto 1", precio: 10.99, cantidad: 0 },
    { id: 2, nombre: "Producto 2", precio: 15.99, cantidad: 0 },
    { id: 3, nombre: "Producto 3", precio: 5.99, cantidad: 0 },
    // Añade más productos aquí
  ]

  const productosFiltrados = productosDisponibles.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  )

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex flex-col p-6">
        <div className="mb-6 flex justify-between items-center">
          <Input
            type="text"
            placeholder="Escanear o ingresar producto"
            className="text-lg p-6 rounded-lg shadow-md border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 flex-grow mr-4"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                const producto = productosDisponibles.find((p) => p.nombre === e.currentTarget.value)
                if (producto) agregarProducto(producto)
                e.currentTarget.value = ""
              }
            }}
          />
          <div className="flex space-x-2">
            <Button
              onClick={() => setMetodoPago("efectivo")}
              variant={metodoPago === "efectivo" ? "default" : "outline"}
              className="flex items-center"
            >
              <CreditCard className="mr-2 h-4 w-4" /> Efectivo
            </Button>
            <Button
              onClick={() => setMetodoPago("tarjeta")}
              variant={metodoPago === "tarjeta" ? "default" : "outline"}
              className="flex items-center"
            >
              <CreditCard className="mr-2 h-4 w-4" /> Tarjeta
            </Button>
            <Button
              onClick={() => setMetodoPago("combinado")}
              variant={metodoPago === "combinado" ? "default" : "outline"}
              className="flex items-center"
            >
              <CreditCard className="mr-2 h-4 w-4" /> Combinado
            </Button>
          </div>
        </div>
        <Card className="flex-1 overflow-hidden shadow-lg">
          <CardHeader className="bg-blue-500 text-white">
            <CardTitle className="text-2xl flex items-center">
              <ShoppingCart className="mr-2" /> Productos en la venta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-400px)]">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead>Producto</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Subtotal</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productos.map((producto) => (
                    <TableRow key={producto.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <TableCell>{producto.nombre}</TableCell>
                      <TableCell>{producto.cantidad}</TableCell>
                      <TableCell>${producto.precio.toFixed(2)}</TableCell>
                      <TableCell>${(producto.precio * producto.cantidad).toFixed(2)}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="destructive" onClick={() => eliminarProducto(producto.id)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex justify-between items-center bg-gray-100 p-4">
            <div className="text-2xl font-bold">Total: ${total.toFixed(2)}</div>
          </CardFooter>
        </Card>
        <div className="mt-6 space-y-4">
          {metodoPago === "efectivo" && (
            <Input
              type="number"
              placeholder="Monto en efectivo"
              className="text-lg p-4 rounded-lg shadow-md border-2 border-gray-200 focus:border-green-500 transition-all duration-300"
              onChange={(e) => setMontoEfectivo(Number.parseFloat(e.target.value) || 0)}
            />
          )}
          {metodoPago === "combinado" && (
            <>
              <Input
                type="number"
                placeholder="Monto en efectivo"
                className="text-lg p-4 rounded-lg shadow-md border-2 border-gray-200 focus:border-green-500 transition-all duration-300"
                onChange={(e) => setMontoEfectivo(Number.parseFloat(e.target.value) || 0)}
              />
              <Input
                type="number"
                placeholder="Monto en tarjeta"
                className="text-lg p-4 rounded-lg shadow-md border-2 border-gray-200 focus:border-blue-500 transition-all duration-300"
                onChange={(e) => setMontoTarjeta(Number.parseFloat(e.target.value) || 0)}
              />
            </>
          )}
          {metodoPago === "efectivo" && (
            <div className="text-2xl font-bold bg-yellow-100 p-4 rounded-lg shadow-md">
              Vuelto: ${vuelto.toFixed(2)}
            </div>
          )}
          <Button className="w-full text-xl py-6 bg-green-500 hover:bg-green-600 transition-all duration-300 rounded-lg shadow-md">
            Finalizar Venta
          </Button>
        </div>
      </div>
      <Card className="w-1/3 m-6 overflow-hidden shadow-lg">
        <CardHeader className="bg-orange-500 text-white">
          <CardTitle className="text-2xl flex items-center">
            <Search className="mr-2" /> Buscar Productos
          </CardTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar producto"
              className="pl-10 text-lg p-4 rounded-lg shadow-md border-2 border-gray-200 focus:border-orange-500 transition-all duration-300"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-250px)]">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Producto</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productosFiltrados.map((producto) => (
                  <TableRow key={producto.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <TableCell>{producto.nombre}</TableCell>
                    <TableCell>${producto.precio.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => agregarProducto(producto)}
                        className="bg-blue-500 hover:bg-blue-600 transition-all duration-300"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

