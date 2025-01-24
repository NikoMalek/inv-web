// Componente que se encarga de leer el código de barras de un producto
// y enviarlo al componente padre para que lo procese.
// Se utiliza la librería zxing para leer el código de barras.

// TODO: Implementar la lógica de detener temporalmente la lectura del código de barras
//       cuando se detecta un código y se envía al componente padre.

import React, { useEffect, useRef } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

// Propiedades del componente
interface BarcodeScannerProps {
  onDetected: (codigo: string) => void;
}

// Componente funcional que se encarga de leer el código de barras
const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onDetected }) => {
  const videoRef = useRef<HTMLVideoElement>(null); // Referencia al elemento video para mostrar la cámara en la pantalla

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    // Se obtiene el primer dispositivo de video disponible y se comienza a leer el código de barras
    // Si se detecta un código, se envía al componente padre para que lo procese en formato de texto
    codeReader
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        const firstDevice = videoInputDevices[0].deviceId;
        codeReader.decodeFromVideoDevice(   // Se comienza a leer el código de barras
          firstDevice,                      // Se toma el primer dispositivo de video disponible
          videoRef.current,                 // Y se muestra en el elemento video
          (result, error) => {
            if (result) {                   // Si se detecta un código de barras
              console.log(`Código detectado: ${result.getText()}`);
              onDetected(result.getText()); // Se envía al componente padre
            }

            if (error && !(error instanceof NotFoundException)) {
              console.error(error);
            }
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      codeReader.reset(); // Se reinicia el lector de códigos de barras en cuanto se desmonta el componente
    };
  }, [onDetected]);

  // Se retorna un elemento video para mostrar la cámara en la pantalla
  return <video ref={videoRef} style={{ width: "45%" }} />;
};

export default BarcodeScanner;
