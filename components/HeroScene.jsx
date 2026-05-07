'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'

function seededValue(seed) {
  const value = Math.sin(seed * 999) * 10000
  return value - Math.floor(value)
}

function ParticleField() {
  const pointsRef = useRef(null)
  const positions = useMemo(() => {
    const values = new Float32Array(520 * 3)
    for (let index = 0; index < values.length; index += 3) {
      values[index] = (seededValue(index + 1) - 0.5) * 9
      values[index + 1] = (seededValue(index + 2) - 0.5) * 5
      values[index + 2] = (seededValue(index + 3) - 0.5) * 5
    }
    return values
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.045
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.08
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#7ef7e0" size={0.026} sizeAttenuation transparent opacity={0.75} />
    </points>
  )
}

function CoreMesh() {
  const meshRef = useRef(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.32
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.22
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.78, 0.18, 160, 14]} />
      <meshStandardMaterial
        color="#7ef7e0"
        emissive="#102f2d"
        metalness={0.45}
        roughness={0.28}
      />
    </mesh>
  )
}

export function HeroScene() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 55 }} dpr={[1, 1.7]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 2, 4]} intensity={1.35} />
        <pointLight position={[-2, -1, 2]} color="#ff5a7a" intensity={2.1} />
        <ParticleField />
        <CoreMesh />
      </Canvas>
    </div>
  )
}
