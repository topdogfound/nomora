'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { OrbitControls } from '@react-three/drei'

function Rain({ count = 10000 }) {
  const rainRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = Math.random() * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return pos
  }, [count])

  useFrame(() => {
    const arr = rainRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= 0.4 + Math.random() * 0.1 // fall speed
      arr[i * 3 + 0] += 0.01 // slight wind drift

      if (arr[i * 3 + 1] < 0) {
        arr[i * 3 + 1] = 20
        arr[i * 3 + 0] = (Math.random() - 0.5) * 30
      }
    }
    rainRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={rainRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#60a5fa" size={0.05} transparent opacity={0.5} />
    </points>
  )
}

function Snow({ count = 2000 }) {
  const snowRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = Math.random() * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return pos
  }, [count])

  useFrame(() => {
    const arr = snowRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= 0.1 + Math.random() * 0.05
      arr[i * 3 + 0] += Math.sin(i + Date.now() * 0.001) * 0.002 // gentle side drift

      if (arr[i * 3 + 1] < 0) {
        arr[i * 3 + 1] = 20
        arr[i * 3 + 0] = (Math.random() - 0.5) * 30
      }
    }
    snowRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={snowRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.15} transparent opacity={0.8} />
    </points>
  )
}

export default function ThreeScene() {
  return (
    <Canvas className="absolute inset-0 z-0">
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />
      <Rain />
      <Snow />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}
