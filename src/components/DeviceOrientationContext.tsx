'use client'
import { checkIsMobile } from '@/utils/device'
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type DeviceOrientationContextType = {
  orientationPermissionGranted: boolean
  requestPermission: () => void
}

const DeviceOrientationContext = createContext<DeviceOrientationContextType | undefined>(undefined)

type ProviderProps = {
  children: ReactNode
}

export const DeviceOrientationProvider: React.FC<ProviderProps> = ({ children }) => {
  const [orientationPermissionGranted, setOrientationPermissionGranted] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const checkPermission = async () => {
      const isMobile = checkIsMobile()
      console.log({ isMobile })
      if (!isMobile) {
        setOrientationPermissionGranted(false)
        setShow(false)
        return
      }

      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof (DeviceOrientationEvent as any).requestPermission === 'function'
      ) {
        try {
          // THIS DOESN'T TRIGGER THE iOS PROMPT BEFORE USER INTERACTION. WE JUST CHECK IF THE PERMISSION IS ALREADY GRANTED
          // IF NOT WE SHOW THE BUTTON TO TRIGGER THE PROMPT
          const response = await (DeviceOrientationEvent as any).requestPermission()

          if (response === 'granted') {
            setOrientationPermissionGranted(true)
            setShow(false)
          } else {
            setShow(true)
          }
        } catch (e) {
          console.error('Device orientation permission error', e)
          setShow(true)
        }
      } else {
        // Non-iOS, we only check on iOS for now
        setOrientationPermissionGranted(false)
        setShow(false)
      }
    }

    checkPermission()
  }, [])

  const requestPermission = async () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission()
        alert(response)
        if (response === 'granted') {
          setOrientationPermissionGranted(true)
        }
      } catch (e) {
        console.error('Permission request failed', e)
      } finally {
        setShow(false)
      }
    } else {
      setOrientationPermissionGranted(true)
      setShow(false)
    }
  }

  return (
    <DeviceOrientationContext.Provider value={{ orientationPermissionGranted, requestPermission }}>
      {children}
      {show && (
        <div className="fixed top-0 left-0 z-50 flex w-full items-center justify-center bg-red-950 p-1">
          <button
            className="rounded-lg bg-red-200 px-2 py-1 text-sm font-bold text-black shadow transition-colors duration-200 hover:bg-red-50"
            onClick={requestPermission}>
            Enable Device Motion
          </button>
        </div>
      )}
    </DeviceOrientationContext.Provider>
  )
}

// Hook to use in components
export const useDeviceOrientation = (): DeviceOrientationContextType => {
  const context = useContext(DeviceOrientationContext)
  if (!context) {
    throw new Error('useDeviceOrientation must be used within a DeviceOrientationProvider')
  }
  return context
}
